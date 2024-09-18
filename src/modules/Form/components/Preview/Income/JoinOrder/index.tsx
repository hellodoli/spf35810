import React, { useState, useMemo, memo } from 'react'

import { JoinOrder } from 'modules/Form/types/join'
import { getPriceJoinOrder } from 'utils/price'
import { getFormat } from 'utils/price'

import JoinOrderList from './JoinOrderList'

const f = getFormat()

const JoinOrderComp = ({ joins }: { joins: JoinOrder[] }) => {
  const [isDetail, setIsDetail] = useState(true)
  const priceJO = useMemo(() => getPriceJoinOrder({ joins }), [joins])

  const renderDetailJoinOrderPrice = () => {
    if (!isDetail || priceJO <= 0) return null
    return <JoinOrderList joins={joins} />
  }

  return (
    <li>
      <span>Thu nhập đơn ghép:</span>
      <strong className="ml-1">{f(priceJO)}</strong>
      {/* Chi Tiết Thu Nhập đơn ghép */}
      {priceJO > 0 && (
        <span
          className="ml-1 link cursor-pointer select-none"
          onClick={() => setIsDetail((open) => !open)}
        >
          {`(${isDetail ? 'Ẩn' : 'Chi tiết'})`}
        </span>
      )}
      {renderDetailJoinOrderPrice()}
    </li>
  )
}

export default memo(JoinOrderComp)
