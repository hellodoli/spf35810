import React, { memo } from 'react'

import { JoinOrder } from 'modules/Form/types'
import { getFormat } from 'utils/price'

import Operator from '../Operator'

const f = getFormat()

const getJoinLabel = (joinType: JoinOrder['type']) => {
  switch (joinType) {
    case 2:
      return `Thu nhập đơn ghép đôi `
    default:
      return `Thu nhập đơn ghép ${joinType} `
  }
}

const JoinOrderItem = ({
  join,
  isShowDetailOrder = false,
}: {
  join: JoinOrder
  isShowDetailOrder?: boolean
}) => {
  const renderPrice = () => {
    if (!isShowDetailOrder) {
      return <strong className="ml-1">{f(join.price * join.order)}</strong>
    }
    return <Operator order={join.order} price={join.price} />
  }
  return (
    <li>
      <span className="inline-flex items-center min-w-[300px] max-w-[300px]">
        <span className="mr-1">{getJoinLabel(join.type)}</span>
        <span>(</span>
        <strong>{f(join.price)}</strong>
        <span>{`/đơn):`}</span>
      </span>
      {renderPrice()}
    </li>
  )
}

export default memo(JoinOrderItem)
