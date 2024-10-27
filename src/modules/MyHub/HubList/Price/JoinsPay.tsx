import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Hub } from 'modules/Form/types'
import { orderPriceDefaultSelector } from 'modules/Form/selectors'

import { getFormat, getPriceExtraOrder, getPriceJoinOrder } from 'utils/price'
import { getPreviewOrder } from 'utils/preview'

const getPrice = (hubs: Hub[], orderPrice: number) => {
  let measure = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins, hubType } = hub
    const { totalJoinsOrder } = getPreviewOrder({ order, joins })
    const extraJoinOrder = getPriceExtraOrder({
      hubType,
      order: totalJoinsOrder,
      isJoin: true,
    })
    const full = orderPrice * totalJoinsOrder
    const crop = getPriceJoinOrder({ joins }) + extraJoinOrder.totalPrice
    const diff = crop - full
    measure += diff
  }
  return measure
}

const JoinsPay = ({ hubs }: { hubs: Hub[] }) => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const diffPrice = getPrice(hubs, orderPrice)
  return (
    <li className="mb-1 last:mb-0">
      <span>Thu nhập tăng/giảm do đơn ghép:</span>
      <strong
        className="ml-1"
        style={{
          color: diffPrice >= 0 ? 'var(--nc-success)' : 'var(--nc-error)',
        }}
      >
        {f(diffPrice)}
      </strong>
    </li>
  )
}

export default memo(JoinsPay)
