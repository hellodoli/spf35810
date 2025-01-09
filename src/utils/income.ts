import {
  EXTRA_SUNDAY_ORDER,
  IS_HUB_WELL_DONE_DEFAULT,
} from 'modules/Form/constants'
import {
  FilterHubTypeSetting,
  Hub,
  HUB_TYPE,
  HubOrderCompensateNumber,
  JoinOrder,
  SETTING_LOCATE,
} from 'modules/Form/types'
import {
  getIsHubWellDone,
  getIsSoftCompensate,
  isApplyForExtraSunday,
  isEnhanceHub,
} from 'utils/hub'
import { getPreviewOrder } from 'utils/preview'
import { getPriceExtraOrder, getPriceJoinOrder } from 'utils/price'

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
    const count = !isEnhanceHub(hub.hubType) && isHubWellDone ? hub.order : 0
    return accumulator + count
  }, 0)

  return getExtraSundayPrice(sumOrder, loc)
}

export const getOrder_Hubs = (hubs: Hub[]) => {
  return hubs.reduce((accumulator, hub) => accumulator + hub.order, 0)
}

export const getPriceCompensate_Hub = ({
  orderCompensate,
  orderPrice,
}: {
  orderCompensate: number
  orderPrice: number
}) => {
  return orderCompensate * orderPrice
}
export const getPrice_Hub = ({
  order,
  joins,
  hubType,
  orderPrice,
  isHubWellDone = IS_HUB_WELL_DONE_DEFAULT,
  isShowExtraJoinOrderPrice = true,
  isShowExtraOrderPrice = true,
  loc,
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
  isHubWellDone?: boolean
  isShowExtraJoinOrderPrice?: boolean
  isShowExtraOrderPrice?: boolean
  loc: SETTING_LOCATE
}) => {
  const { singleOrder, totalJoinsOrder } = getPreviewOrder({ order, joins })

  const totalPriceJoinOrder = getPriceJoinOrder({ joins })

  const singleOrderPrice = singleOrder * orderPrice

  // thu nhập đơn ghép vượt mốc
  const extraOrder = getPriceExtraOrder({
    hubType,
    order,
    isJoin: false,
    loc,
  })

  // thu nhập đơn con (của đơn ghép) vượt mốc
  const extraJoinOrder = getPriceExtraOrder({
    hubType,
    order: totalJoinsOrder,
    isJoin: true,
    loc,
  })

  let price = singleOrderPrice + totalPriceJoinOrder

  if (isHubWellDone) {
    if (isShowExtraOrderPrice) price += extraOrder.totalPrice
    if (isShowExtraJoinOrderPrice) price += extraJoinOrder.totalPrice
  }

  return {
    price,
    extraOrderPrice: extraOrder.totalPrice,
    extraJoinOrderPrice: extraJoinOrder.totalPrice,
  }
}
export const getCompensate_Hub = ({
  calPrice = true,
  hubType,
  isHubWellDone,
  order,
  orderCompensate,
  orderPrice,
  joins,
  loc,
}: {
  calPrice?: boolean
  hubType: HUB_TYPE
  joins: JoinOrder[]
  order: number
  orderCompensate: number
  orderPrice: number
  isHubWellDone: boolean
  loc: SETTING_LOCATE
}) => {
  const isSoftCompensate = getIsSoftCompensate({
    hubType,
    isHubWellDone,
    order,
  })
  const compensatePrice = getPriceCompensate_Hub({
    orderCompensate,
    orderPrice,
  })
  let isCompensate = false
  let price = 0
  let extraOrderPrice = 0
  let extraJoinOrderPrice = 0

  if (calPrice && isSoftCompensate) {
    if (order < orderCompensate) {
      isCompensate = true
      price = compensatePrice
    } else {
      const hub = getPrice_Hub({
        hubType,
        joins,
        order,
        orderPrice,
        loc,
        isHubWellDone,
        isShowExtraJoinOrderPrice: true,
        isShowExtraOrderPrice: true,
      })
      if (hub.price < compensatePrice) {
        isCompensate = true
        price = compensatePrice
      } else if (hub.price - hub.extraOrderPrice < compensatePrice) {
        isCompensate = true
        extraJoinOrderPrice = hub.extraJoinOrderPrice
        price = compensatePrice - extraJoinOrderPrice
        extraOrderPrice = hub.extraOrderPrice
      } else {
        isCompensate = false
      }
    }
  }

  return {
    isSoftCompensate,
    isCompensate,
    calPrice,
    order,
    // prices
    price,
    extraOrderPrice,
    extraJoinOrderPrice,
    totalPrice: price + extraOrderPrice + extraJoinOrderPrice,
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
}: {
  hubs: Hub[]
  orderPrice: number
  orderCompensateNumber: HubOrderCompensateNumber
  loc: SETTING_LOCATE
  isShowExtraJoinOrderPrice?: boolean
  isShowExtraOrderPrice?: boolean
}) => {
  const sdList: {
    [key: string]: Hub[]
  } = {}
  let total = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const {
      order,
      joins,
      hubType,
      isHubWellDone = IS_HUB_WELL_DONE_DEFAULT,
      isAutoCompensate,
      hubTime,
    } = hub
    const orderCompensate = orderCompensateNumber[hubType]
    const generalParams = {
      hubType,
      joins,
      order,
      orderPrice,
      loc,
    }

    const price = isAutoCompensate
      ? getCompensate_Hub({
          ...generalParams,
          orderCompensate,
          isHubWellDone,
        }).totalPrice
      : getPrice_Hub({
          ...generalParams,
          isHubWellDone,
          isShowExtraJoinOrderPrice,
          isShowExtraOrderPrice,
        }).price

    total += price

    // extra sunday (split logic LATER)
    const isSunday = isApplyForExtraSunday(hubTime)
    if (isSunday) {
      if (!sdList[hubTime]) sdList[hubTime] = [hub]
      else sdList[hubTime].push(hub)
    }
  }

  // extra sunday (split logic LATER)
  const hubsSunday = Object.values(sdList)
  for (let j = 0; j < hubsSunday.length; j++) {
    const extraSundayPrice = getExtraSundayPrice_Hubs(hubsSunday[j], loc)
    total += extraSundayPrice
  }

  return total
}

export const getDiffJoinsPrice_Hub = ({
  order,
  joins,
  hubType,
  orderPrice,
  isHubWellDone = IS_HUB_WELL_DONE_DEFAULT,
  loc,
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
  isHubWellDone?: boolean
  loc: SETTING_LOCATE
}) => {
  const { totalJoinsOrder } = getPreviewOrder({ order, joins })

  const full = orderPrice * totalJoinsOrder
  let crop = getPriceJoinOrder({ joins })
  if (isHubWellDone) {
    // thu nhập đơn con (của đơn ghép) vượt mốc
    const extraJoinOrder = getPriceExtraOrder({
      hubType,
      order: totalJoinsOrder,
      isJoin: true,
      loc,
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
}: {
  hubs: Hub[]
  orderPrice: number
  loc: SETTING_LOCATE
}) => {
  let measure = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType, isHubWellDone, isAutoCompensate } = hub
    const diff = isAutoCompensate
      ? 0
      : getDiffJoinsPrice_Hub({
          order,
          joins,
          hubType,
          orderPrice,
          isHubWellDone,
          loc,
        })
    measure += diff
  }
  return measure
}
