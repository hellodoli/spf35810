import { EXTRA_SUNDAY_ORDER } from 'modules/Form/constants'
import {
  FilterHubTypeSetting,
  Hub,
  HUB_TYPE,
  HubOrderCompensateNumber,
  JoinOrder,
  SETTING_LOCATE,
} from 'modules/Form/types'
import {
  getHubExtraIncome,
  getIncludeAutoCompensate,
  getIncludeSundayReward,
  getIsHubShort,
  getIsHubWellDone,
  getIsSoftCompensate,
  isApplyForExtraSunday,
  isEnhanceHub,
} from 'utils/hub'
import { getPreviewOrder } from 'utils/preview'
import { getPriceExtraOrder, getPriceJoinOrder } from 'utils/price'

interface DetailItem {
  hubShift: string
  price: number
  label: string
}

export const getColorPrice = (price: number) => {
  if (price === 0) return ''
  if (price < 0) return 'var(--nc-error)'
  return 'var(--nc-success)'
}

export const getFilter_Hubs = ({
  hubs,
  filters,
}: {
  hubs: Hub[]
  filters: FilterHubTypeSetting
}) => {
  const {
    HUB_1: filter_1,
    HUB_3: filter_3,
    HUB_5: filter_5,
    HUB_8: filter_8,
    HUB_10: filter_10,
  } = filters
  return hubs.filter((hub) => {
    if (
      (!filter_1 && hub.hubType === HUB_TYPE.HUB_1) ||
      (!filter_3 && hub.hubType === HUB_TYPE.HUB_3) ||
      (!filter_5 && hub.hubType === HUB_TYPE.HUB_5) ||
      (!filter_8 && hub.hubType === HUB_TYPE.HUB_8) ||
      (!filter_10 && hub.hubType === HUB_TYPE.HUB_10)
    )
      return false
    return true
  })
}

export const getExtraSundayPrice = (order: number, loc: SETTING_LOCATE) => {
  let yRw = 0
  const rws = EXTRA_SUNDAY_ORDER[loc]

  for (let i = 0; i < rws.length; i++) {
    const reward = rws[i]
    const [from, to, price] = reward
    if (
      (to === null && order >= from) ||
      (order >= from && to && order <= to)
    ) {
      yRw = price
      break
    }
  }

  return yRw
}
export const getExtraSundayPrice_Hubs = (
  hubsByDate: Hub[],
  loc: SETTING_LOCATE,
) => {
  const sumOrder = hubsByDate.reduce((accumulator, hub) => {
    const isHubWellDone = getIsHubWellDone(hub.isHubWellDone)
    const includeSundayReward = getIncludeSundayReward(
      hub.hubAdvancedOpt?.includeSundayReward,
    )
    const count =
      !isEnhanceHub(hub.hubType) && isHubWellDone && includeSundayReward
        ? hub.order
        : 0
    return accumulator + count
  }, 0)

  return getExtraSundayPrice(sumOrder, loc)
}

export const getOrder_Hubs = (hubs: Hub[]) => {
  return hubs.reduce((accumulator, hub) => accumulator + hub.order, 0)
}

export const getPriceDefaultWithHubShort = ({
  isHubShort,
  orderPrice,
  hubShortPrice,
}: {
  isHubShort: boolean
  hubShortPrice: number
  orderPrice: number
}) => {
  return isHubShort ? hubShortPrice : orderPrice
}
export const getPriceCompensate_Hub = ({
  orderCompensate,
  orderPrice,
  hubShortPrice,
  isHubShort,
}: {
  orderCompensate: number
  orderPrice: number
  isHubShort: boolean
  hubShortPrice: number
}) => {
  return (
    orderCompensate *
    getPriceDefaultWithHubShort({
      isHubShort,
      orderPrice,
      hubShortPrice,
    })
  )
}
export const getPrice_Hub = ({
  order,
  joins,
  hubType,
  orderPrice,
  extraIncomePrice,
  isHubWellDone,
  isShowExtraJoinOrderPrice = true,
  isShowExtraOrderPrice = true,
  loc,
  isHubShort,
  hubShortPrice,
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
  extraIncomePrice: number
  isHubWellDone: boolean
  isShowExtraJoinOrderPrice?: boolean
  isShowExtraOrderPrice?: boolean
  loc: SETTING_LOCATE
  isHubShort: boolean
  hubShortPrice: number
}) => {
  const { singleOrder, totalJoinsOrder } = getPreviewOrder({ order, joins })

  const totalPriceJoinOrder = getPriceJoinOrder({ joins })

  const defaultPrice = getPriceDefaultWithHubShort({
    hubShortPrice,
    orderPrice,
    isHubShort,
  })
  const singleOrderPrice = singleOrder * defaultPrice

  const shipPrice = singleOrderPrice + totalPriceJoinOrder
  let totalPrice = shipPrice
  let extraOrderPrice = 0
  let extraJoinOrderPrice = 0

  totalPrice += extraIncomePrice

  if (isHubWellDone) {
    // thu nhập đơn ghép vượt mốc
    if (isShowExtraOrderPrice) {
      const extraOrder = getPriceExtraOrder({
        hubType,
        order,
        isJoin: false,
        loc,
        isHubShort,
      })
      extraOrderPrice = extraOrder.totalPrice
      totalPrice += extraOrderPrice
    }

    // thu nhập đơn con (của đơn ghép) vượt mốc
    if (isShowExtraJoinOrderPrice) {
      const extraJoinOrder = getPriceExtraOrder({
        hubType,
        order: totalJoinsOrder,
        isJoin: true,
        loc,
        isHubShort,
      })
      extraJoinOrderPrice = extraJoinOrder.totalPrice
      totalPrice += extraJoinOrderPrice
    }
  }

  return {
    totalPrice,
    shipPrice,
    extraOrderPrice,
    extraJoinOrderPrice,
    extraIncomePrice,
  }
}
export const getCompensate_Hub = ({
  calPrice = true,
  hubType,
  isHubWellDone,
  includeAutoCompensate,
  order,
  orderCompensate,
  extraIncomePrice,
  orderPrice,
  joins,
  loc,
  isHubShort,
  hubShortPrice,
}: {
  calPrice?: boolean
  hubType: HUB_TYPE
  joins: JoinOrder[]
  order: number
  orderCompensate: number
  orderPrice: number
  extraIncomePrice: number
  isHubWellDone: boolean
  loc: SETTING_LOCATE
  includeAutoCompensate: boolean
  isHubShort: boolean
  hubShortPrice: number
}) => {
  const isSoftCompensate = getIsSoftCompensate({
    hubType,
    isHubWellDone,
    order,
    includeAutoCompensate,
  })
  const compensatePrice = getPriceCompensate_Hub({
    orderCompensate,
    orderPrice,
    hubShortPrice,
    isHubShort,
  })
  let isCompensate = false
  let shipPrice = 0
  let extraOrderPrice = 0
  let extraJoinOrderPrice = 0
  let totalPrice = 0

  if (calPrice && isSoftCompensate) {
    if (order < orderCompensate) {
      isCompensate = true
      shipPrice = compensatePrice
      extraOrderPrice = 0
      extraJoinOrderPrice = 0
    } else {
      const hub = getPrice_Hub({
        hubType,
        joins,
        order,
        orderPrice,
        extraIncomePrice,
        loc,
        isHubWellDone,
        isShowExtraJoinOrderPrice: true,
        isShowExtraOrderPrice: true,
        hubShortPrice,
        isHubShort,
      })
      const hubTotalPrice = hub.totalPrice - hub.extraIncomePrice
      if (hubTotalPrice < compensatePrice) {
        isCompensate = true
        shipPrice = compensatePrice
        extraOrderPrice = 0
        extraJoinOrderPrice = 0
      } /*else if (hubTotalPrice - hubExtraJoinOrderPrice < compensatePrice) {
        isCompensate = true
        shipPrice = compensatePrice
        extraJoinOrderPrice = hubExtraJoinOrderPrice
        extraOrderPrice = 0
      }*/ else {
        isCompensate = false
        shipPrice = hub.shipPrice
        extraJoinOrderPrice = hub.extraJoinOrderPrice
        extraOrderPrice = hub.extraOrderPrice
      }
    }
  }

  // sum total price
  totalPrice += extraIncomePrice
  const mainPrice = shipPrice + extraOrderPrice + extraJoinOrderPrice
  totalPrice += mainPrice

  return {
    isSoftCompensate,
    isCompensate,
    calPrice,
    order,
    extraIncomePrice,
    /**
     * price when `isSoftCompensate = true` && `isCompensate = true`
     * !Note:
     * if `isCompensate = false` all prop below should not to use
     * but if you want to use is still ok
     */
    shipPrice,
    extraOrderPrice,
    extraJoinOrderPrice,
    totalPrice,
  }
}
export const getPrice_Hubs = ({
  hubs,
  orderPrice,
  orderCompensateNumber,
  loc,
  // optional
  isShowExtraJoinOrderPrice = true,
  isShowExtraOrderPrice = true,
  isShowExtraSundayPrice = true,
  hubShortPrice,
}: {
  hubs: Hub[]
  orderPrice: number
  orderCompensateNumber: HubOrderCompensateNumber
  loc: SETTING_LOCATE
  isShowExtraJoinOrderPrice?: boolean
  isShowExtraOrderPrice?: boolean
  isShowExtraSundayPrice?: boolean
  hubShortPrice: number
}) => {
  const sdList: {
    [key: string]: Hub[]
  } = {}
  const shipArr: DetailItem[] = []
  const extraOrderArr: DetailItem[] = []
  const extraJoinOrderArr: DetailItem[] = []
  const extraIncomeArr: DetailItem[] = []
  let total = 0

  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType, isAutoCompensate, hubTime, hubShift } = hub
    const orderCompensate = orderCompensateNumber[hubType]
    const includeAutoCompensate = getIncludeAutoCompensate(
      hub.hubAdvancedOpt?.includeAutoCompensate,
    )
    const isHubWellDone = getIsHubWellDone(hub.isHubWellDone)
    const extraIncomePrice = getHubExtraIncome(hub.extraIncomeArr)
    const isHubShort = getIsHubShort(hub.isHubShort)

    const generalParams = {
      hubType,
      joins,
      order,
      orderPrice,
      loc,
      isHubWellDone,
      extraIncomePrice,
      isHubShort,
      hubShortPrice,
    }

    const { totalPrice, shipPrice, extraOrderPrice, extraJoinOrderPrice } =
      isAutoCompensate
        ? getCompensate_Hub({
            ...generalParams,
            includeAutoCompensate,
            orderCompensate,
          })
        : getPrice_Hub({
            ...generalParams,
            isShowExtraJoinOrderPrice,
            isShowExtraOrderPrice,
          })

    // tổng phí
    total += totalPrice

    const [start, end] = hubShift.split('_')
    const label = `${start} - ${end}`

    // phí thêm
    extraIncomeArr.push({
      hubShift,
      price: extraIncomePrice,
      label,
    })

    // phí giao hàng
    shipArr.push({ hubShift, price: shipPrice, label })

    // phí đơn vượt mốc
    if (extraOrderPrice) {
      extraOrderArr.push({
        hubShift,
        price: extraOrderPrice,
        label,
      })
    }

    // phí đơn ghép vượt mốc
    if (extraJoinOrderPrice) {
      extraJoinOrderArr.push({
        hubShift,
        price: extraJoinOrderPrice,
        label,
      })
    }

    // extra sunday (split logic LATER)
    const isSunday = isApplyForExtraSunday(hubTime)
    if (isSunday) {
      if (!sdList[hubTime]) sdList[hubTime] = [hub]
      else sdList[hubTime].push(hub)
    }
  }

  // extra sunday (split logic LATER)
  if (isShowExtraSundayPrice) {
    const hubsSunday = Object.values(sdList)
    for (let j = 0; j < hubsSunday.length; j++) {
      const extraSundayPrice = getExtraSundayPrice_Hubs(hubsSunday[j], loc)
      total += extraSundayPrice
    }
  }

  return {
    total,
    shipArr,
    extraOrderArr,
    extraJoinOrderArr,
    extraIncomeArr,
  }
}

export const getDiffJoinsPrice_Hub = ({
  order,
  joins,
  hubType,
  orderPrice,
  isHubWellDone,
  loc,
  hubShortPrice,
  isHubShort,
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
  isHubWellDone: boolean
  loc: SETTING_LOCATE
  isHubShort: boolean
  hubShortPrice: number
}) => {
  const { totalJoinsOrder } = getPreviewOrder({ order, joins })

  const full =
    getPriceDefaultWithHubShort({
      hubShortPrice,
      isHubShort,
      orderPrice,
    }) * totalJoinsOrder
  let crop = getPriceJoinOrder({ joins })
  if (isHubWellDone) {
    // thu nhập đơn con (của đơn ghép) vượt mốc
    const extraJoinOrder = getPriceExtraOrder({
      hubType,
      order: totalJoinsOrder,
      isJoin: true,
      loc,
      isHubShort,
    })
    crop += extraJoinOrder.totalPrice
  }
  const diff = crop - full
  return diff
}
export const getDiffJoinsPrice_Hubs = ({
  hubs,
  loc,
  orderPrice,
  hubShortPrice,
}: {
  hubs: Hub[]
  orderPrice: number
  loc: SETTING_LOCATE
  hubShortPrice: number
}) => {
  let measure = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType, isAutoCompensate } = hub
    const diff = isAutoCompensate
      ? 0
      : getDiffJoinsPrice_Hub({
          order,
          joins,
          hubType,
          orderPrice,
          isHubWellDone: getIsHubWellDone(hub.isHubWellDone),
          loc,
          isHubShort: getIsHubShort(hub.isHubShort),
          hubShortPrice,
        })
    measure += diff
  }
  return measure
}
