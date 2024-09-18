import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  orderPriceDefaultSelector,
  hubTypeSelector,
} from 'modules/Form/selectors'

import { Hub, HUB_TYPE } from 'modules/Form/types'
import { getPreviewOrder } from 'utils/preview'
import { getFormat, getPriceJoinOrder, getPriceExtraOrder } from 'utils/price'

interface Props {
  hubs: Hub[]
}

const getOrderOfHubs = (hubs: Hub[]) => {
  return hubs.reduce((accumulator, hub) => accumulator + hub.order, 0)
}

const getPriceOfHubs = (hubs: Hub[], orderPrice: number, hubType: HUB_TYPE) => {
  let total = 0
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const { order, joins } = hub
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

const Price = ({ hubs }: Props) => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const hubType = useSelector(hubTypeSelector)

  return (
    <ul className="p-2 border-line">
      <li className="mb-1 last:mb-0">
        <span>Tổng số đơn hàng:</span>
        <strong className="ml-1">{getOrderOfHubs(hubs)}</strong>
      </li>
      <li className="mb-1 last:mb-0">
        <span>Tổng thu nhập ngày:</span>
        <strong className="ml-1">
          {f(getPriceOfHubs(hubs, orderPrice, hubType))}
        </strong>
      </li>
    </ul>
  )
}

export default memo(Price)
