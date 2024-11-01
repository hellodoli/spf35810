import {
  Hub,
  FilterHubTypeSetting,
  HUB_TYPE,
  JoinOrder,
} from 'modules/Form/types'
import { getPreviewOrder } from 'utils/preview'
import { getPriceJoinOrder, getPriceExtraOrder } from 'utils/price'

const getSumPrice_Hub = ({
  order,
  joins,
  hubType,
  orderPrice,
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
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

  const price =
    singleOrderPrice +
    totalPriceJoinOrder +
    extraOrder.totalPrice +
    extraJoinOrder.totalPrice

  return price
}

export const getOrderOfHubs = (hubs: Hub[]) => {
  return hubs.reduce((accumulator, hub) => accumulator + hub.order, 0)
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

export const getPrice_Hubs = (hubs: Hub[], orderPrice: number) => {
  let total = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType } = hub
    const price = getSumPrice_Hub({
      order,
      joins,
      hubType,
      orderPrice,
    })
    total += price
  }
  return total
}

export const getDiffJoinsPrice_Hub = ({
  order,
  joins,
  hubType,
  orderPrice,
}: {
  order: number
  joins: JoinOrder[]
  hubType: HUB_TYPE
  orderPrice: number
}) => {
  const { totalJoinsOrder } = getPreviewOrder({ order, joins })

  // thu nhập đơn con (của đơn ghép) vượt mốc
  const extraJoinOrder = getPriceExtraOrder({
    hubType,
    order: totalJoinsOrder,
    isJoin: true,
  })

  const full = orderPrice * totalJoinsOrder
  const crop = getPriceJoinOrder({ joins }) + extraJoinOrder.totalPrice
  const diff = crop - full
  return diff
}
export const getDiffJoinsPrice_Hubs = (hubs: Hub[], orderPrice: number) => {
  let measure = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType } = hub
    const diff = getDiffJoinsPrice_Hub({
      order,
      joins,
      hubType,
      orderPrice,
    })
    measure += diff
  }
  return measure
}
