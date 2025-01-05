import { EXTRA_JOIN_ORDER, EXTRA_ORDER } from 'modules/Form/constants'
import { HUB_TYPE, JoinOrder, SETTING_LOCATE } from 'modules/Form/types'
import * as join from './join'

export const getExtraOrderQtt = ({
  order,
  hubType,
  isJoin = false,
  loc,
}: {
  order: number
  hubType: HUB_TYPE
  isJoin?: boolean
  loc: SETTING_LOCATE
}) => {
  let point = 0
  const rewards = isJoin ? EXTRA_JOIN_ORDER[hubType] : EXTRA_ORDER[loc][hubType]
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
