import {
  EXTRA_JOIN_ORDER,
  EXTRA_JOIN_ORDER_REST_KEY,
  EXTRA_ORDER,
  EXTRA_ORDER_WITH_HUB_SHORT,
} from 'modules/Form/constants'
import { HUB_TYPE, JoinOrder, SETTING_LOCATE } from 'modules/Form/types'
import * as join from './join'
import { getLastHubTimesConsume } from './locate'

const lastHubTimesConsume = getLastHubTimesConsume({
  list: EXTRA_JOIN_ORDER,
  restKey: EXTRA_JOIN_ORDER_REST_KEY,
})

export const getExtraOrderQtt = ({
  order,
  hubType,
  isJoin = false,
  loc,
  isHubShort,
}: {
  order: number
  hubType: HUB_TYPE
  isJoin?: boolean
  loc: SETTING_LOCATE
  isHubShort: boolean
}) => {
  let point = 0
  const rewards = isJoin
    ? EXTRA_JOIN_ORDER[lastHubTimesConsume][loc][hubType]
    : isHubShort
      ? EXTRA_ORDER_WITH_HUB_SHORT[loc][hubType]
      : EXTRA_ORDER[loc][hubType]
  for (let i = 0; i < rewards.length; i++) {
    const reward = rewards[i][0]
    if (reward !== 0) {
      point = reward
      break
    }
  }
  const extraOrder = point > 0 && order >= point ? order - point + 1 : 0
  const extraOrderFrom = extraOrder === 0 ? 0 : point
  const extraOrderTo = extraOrder === 0 ? 0 : point + extraOrder - 1
  return {
    extraOrder,
    extraOrderFrom,
    extraOrderTo,
  }
}

export const getPreviewOrder = ({
  order,
  joins,
}: {
  order: number
  joins: JoinOrder[]
}) => {
  // tổng số đơn ghép (tính cả đơn con)
  const totalJoinsOrder = join.getTotalOrderOfJoins(joins)
  // tổng số đơn ghép (không bao gồm đơn con)
  const joinsOrder = join.getOrderOfJoins(joins)
  // tổng đơn lẻ
  const singleOrder = order - totalJoinsOrder
  return {
    order,
    singleOrder,
    totalJoinsOrder,
    joinsOrder,
  }
}
