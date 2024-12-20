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
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
  isHubWellDone?: boolean
  isShowExtraJoinOrderPrice?: boolean
}) => {
  const { singleOrder, totalJoinsOrder } = getPreviewOrder({ order, joins })

  const totalPriceJoinOrder = getPriceJoinOrder({ joins })

  const singleOrderPrice = singleOrder * orderPrice

  // thu nhập đơn ghép vượt mốc
  const extraOrder = getPriceExtraOrder({
    hubType,
    order,
    isJoin: false,
  })

  // thu nhập đơn con (của đơn ghép) vượt mốc
  const extraJoinOrder = getPriceExtraOrder({
    hubType,
    order: totalJoinsOrder,
    isJoin: true,
  })

  let price = singleOrderPrice + totalPriceJoinOrder

  if (isHubWellDone) {
    price += extraOrder.totalPrice
    if (isShowExtraJoinOrderPrice) price += extraJoinOrder.totalPrice
  }

  return price
}
export const getPrice_Hubs = ({
  hubs,
  orderPrice,
  isShowExtraJoinOrderPrice = true,
  loc = SETTING_LOCATE.TPHCM,
  orderCompensateNumber,
}: {
  hubs: Hub[]
  orderPrice: number
  isShowExtraJoinOrderPrice?: boolean
  loc?: SETTING_LOCATE
  orderCompensateNumber: HubOrderCompensateNumber
}) => {
  const sdList: {
    [key: string]: Hub[]
  } = {}
  let total = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType, isHubWellDone, isAutoCompensate } = hub
    const price = isAutoCompensate
      ? getPriceCompensate_Hub({
          orderPrice,
          orderCompensate: orderCompensateNumber[hubType],
        })
      : getPrice_Hub({
          order,
          joins,
          hubType,
          orderPrice,
          isHubWellDone,
          isShowExtraJoinOrderPrice,
        })
    total += price

    // extra sunday (split logic LATER)
    const isSunday = isApplyForExtraSunday(hub.hubTime)
    if (isSunday) {
      if (!sdList[hub.hubTime]) sdList[hub.hubTime] = [hub]
      else sdList[hub.hubTime].push(hub)
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
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
  isHubWellDone?: boolean
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
    })
    crop += extraJoinOrder.totalPrice
  }
  const diff = crop - full
  return diff
}
export const getDiffJoinsPrice_Hubs = (hubs: Hub[], orderPrice: number) => {
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
        })
    measure += diff
  }
  return measure
}
