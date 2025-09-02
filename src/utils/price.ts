import {
  EXTRA_JOIN_ORDER,
  EXTRA_JOIN_ORDER_REST_KEY,
  EXTRA_ORDER,
  EXTRA_ORDER_WITH_HUB_SHORT,
} from 'modules/Form/constants'
import {
  HUB_TYPE,
  JoinOrder,
  OrderExtraRewardArr,
  SETTING_LOCATE,
} from 'modules/Form/types'
import { getLastHubTimesConsume } from './locate'

const lastHubTimesConsume = getLastHubTimesConsume({
  list: EXTRA_JOIN_ORDER,
  restKey: EXTRA_JOIN_ORDER_REST_KEY,
})

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

export function getFormat() {
  return formatter.format
}

export const getPriceJoinOrder = ({ joins }: { joins: JoinOrder[] }) => {
  let totalPrice = 0
  joins.forEach((join) => {
    totalPrice += join.price * join.order
  })
  return totalPrice
}

export function getPriceExtraOrder({
  hubType,
  order,
  isJoin = false,
  loc,
  isHubShort,
}: {
  hubType: HUB_TYPE
  order: number
  isJoin?: boolean
  loc: SETTING_LOCATE
  isHubShort: boolean
}) {
  const rewards = isJoin
    ? EXTRA_JOIN_ORDER[lastHubTimesConsume][loc][hubType]
    : isHubShort
      ? EXTRA_ORDER_WITH_HUB_SHORT[loc][hubType]
      : EXTRA_ORDER[loc][hubType]
  const extraOrderPriceArr: {
    id: string
    start: number
    end: number | null
    orderCount: number
    price: number
  }[] = []
  let totalPrice = 0
  let totalOrderCount = 0

  const plus = ({
    price,
    start,
    end,
  }: {
    price: OrderExtraRewardArr[2]
    start: OrderExtraRewardArr[0]
    end: OrderExtraRewardArr[1]
  }) => {
    const max = !end ? 0 : end - start + 1
    let orderCount = order - start + 1
    if (max && orderCount > max) orderCount = max
    totalPrice += orderCount * price
    totalOrderCount += orderCount
    extraOrderPriceArr.push({
      id: `${start}-${end || ''}-${price}`,
      start,
      end,
      orderCount,
      price,
    })
  }

  for (let i = 0; i < rewards.length; i++) {
    const reward = rewards[i]
    const [start, end, price] = reward
    if (start && order >= start) {
      plus({
        start,
        end,
        price,
      })
    }
  }

  return {
    totalPrice,
    totalOrderCount,
    extraOrderPriceArr,
  }
}
