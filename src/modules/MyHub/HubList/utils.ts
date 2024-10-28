import { Hub } from 'modules/Form/types'
import { getPreviewOrder } from 'utils/preview'
import { getPriceJoinOrder, getPriceExtraOrder } from 'utils/price'

export const getOrderOfHubs = (hubs: Hub[]) => {
  return hubs.reduce((accumulator, hub) => accumulator + hub.order, 0)
}

export const getPriceOfHubs = (hubs: Hub[], orderPrice: number) => {
  let total = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType } = hub
    const { singleOrder, totalJoinsOrder } = getPreviewOrder({ order, joins })
    const totalPriceJoinOrder = getPriceJoinOrder({ joins })
    const singleOrderPrice = singleOrder * orderPrice
    const extraOrder = getPriceExtraOrder({
      hubType,
      order,
      isJoin: false,
    })
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
    total += price
  }
  return total
}
