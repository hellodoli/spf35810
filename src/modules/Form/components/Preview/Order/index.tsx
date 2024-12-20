import React, { memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  hubTypeSelector,
  joinsSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { getCombineSameJoin, getJoinLabel } from 'utils/join'
import { getPreviewOrder } from 'utils/preview'
import ExtraOrder from './ExtraOrder'

const OrderPreview = () => {
  const order = useSelector(orderSelector)
  const joins = useSelector(joinsSelector)
  const hubType = useSelector(hubTypeSelector)
  const [isDetailJoinOrder, setIsDetailJoinOrder] = useState(false)

  const { joinsOrder, singleOrder, totalJoinsOrder } = useMemo(
    () => getPreviewOrder({ joins, order }),
    [order, joins],
  )

  const renderJoinOrderList = () => {
    if (!joins.length || !joinsOrder || !isDetailJoinOrder) return null
    const combineJoins = getCombineSameJoin(joins)
    return (
      <ul className="pl-4 ml-2 list-disc">
        {combineJoins.map((join) => {
          return (
            <li key={join.key}>
              <span>{getJoinLabel(join.type)}</span>
              <strong className="ml-1">{join.order}</strong>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="order-preview text-base p-2">
      <div className="p-2 pl-0 border-line">
        <div className="text-2xl mb-1">📝📝📝📝📝</div>
      </div>

      <div className="p-2 border-line -mt-[1px]">
        <span>Tổng số đơn:</span>
        <strong className="ml-1">{order}</strong>
      </div>

      <ul className="p-2 border-line -mt-[1px]">
        <li>
          <span>Số đơn lẻ (đơn không phải đơn ghép):</span>
          <strong className="ml-1">{singleOrder}</strong>
        </li>
        <li className="whitespace-nowrap">
          <span>Số đơn ghép:</span>
          <strong className="ml-1">{joinsOrder}</strong>
          {joinsOrder > 0 && (
            <span
              className="ml-1 link cursor-pointer select-none"
              onClick={() => setIsDetailJoinOrder((open) => !open)}
            >
              {`(${isDetailJoinOrder ? 'Ẩn' : 'Chi tiết'})`}
            </span>
          )}
          {renderJoinOrderList()}
        </li>
      </ul>

      <ExtraOrder
        hubType={hubType}
        order={order}
        totalJoinsOrder={totalJoinsOrder}
      />
    </div>
  )
}

export default memo(OrderPreview)
