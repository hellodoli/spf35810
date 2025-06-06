import { v4 as uuidv4 } from 'uuid'

import type { JoinOrder } from 'modules/Form/types'

export const getJoinLabel = (
  joinType: JoinOrder['type'],
  isPrice = false,
  label = '',
) => {
  const word = isPrice ? 'Giá' : 'Số'
  const text = label || word
  switch (joinType) {
    case 2:
      return `${text} đơn ghép ghép 2:`
    default:
      return `${text} đơn ghép ${joinType}:`
  }
}

// tổng số đơn ghép (tính cả đơn con)
export const getTotalOrderOfJoins = (joins: JoinOrder[]) => {
  return joins.reduce((accumulator, join) => {
    const order = join.order * join.type
    return accumulator + order
  }, 0)
}
// tổng số đơn ghép (không bao gồm đơn con)
export const getOrderOfJoins = (joins: JoinOrder[]) => {
  return joins.reduce((accumulator, join) => accumulator + join.order, 0)
}

export const getCombineSameJoin = (joins: JoinOrder[]) => {
  const uniqType: JoinOrder['type'][] = []
  let combineJoins: JoinOrder[] = []

  joins.forEach((join) => {
    if (!uniqType.includes(join.type)) {
      uniqType.push(join.type)
      combineJoins.push(join)
    } else {
      combineJoins = combineJoins.map((j) => {
        if (j.type === join.type) {
          return {
            ...j,
            order: j.order + join.order,
          }
        }
        return j
      })
    }
  })

  return combineJoins
}

export const convertFromJoinsOb = (joins: JoinOrder[]) => {
  const joinsOb: { [key: string]: JoinOrder } = {}
  for (let i = 0; i < joins.length; i++) {
    const join = joins[i]
    joinsOb[join.key] = { ...join }
  }
  return joinsOb
}

interface MaxJoinOrder {
  order: number
  joins: JoinOrder[]
  joinId: string
  joinType: JoinOrder['type']
}
export const getMaxJoinOrder = ({
  order,
  joins,
  joinId,
  joinType,
}: MaxJoinOrder) => {
  const joinsFilter = joins.filter((join) => join.key !== joinId)
  const joinsOrder = getTotalOrderOfJoins(joinsFilter) // tổng số đơn ghép (tính cả đơn con)
  const remainOrder = order - joinsOrder
  const max = Math.floor(remainOrder / joinType)
  return max
}

interface JoinsOb {
  [key: string]: JoinOrder
}
export const getSameJoin = (joins: JoinsOb, join: JoinOrder) => {
  const joinsArr = Object.values(joins)
  const existJoin = joinsArr.find(
    (j) => j.price === join.price && j.type === join.type,
  )
  return {
    existJoin: existJoin || null,
    isSameJoin: !!existJoin,
  }
}

export const getNoEmptyJoins = (joins: JoinOrder[]) => {
  return joins.filter((join) => join.order > 0)
}

export const genarateQuickAddJoinsHubShort = ({
  orderPrice,
}: {
  orderPrice: number
}) => {
  const createJoinByType = (type: JoinOrder['type']) => {
    const join: JoinOrder = {
      key: uuidv4(),
      type,
      price: orderPrice * type,
      order: 1,
    }
    return join
  }
  return [
    createJoinByType(2),
    createJoinByType(3),
    createJoinByType(4),
    createJoinByType(5),
  ]
}
