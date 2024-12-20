import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  isShowDetailWithOrderSelector,
  joinsSelector,
  orderPriceDefaultSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { getPreviewOrder } from 'utils/preview'
import { getFormat } from 'utils/price'
import Operator from './Operator'

const f = getFormat()

const Order = ({
  singleOrder = 0,
  singleOrderPrice: singleOrderPriceProp = 0,
}: {
  singleOrder?: number
  singleOrderPrice?: number
}) => {
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const isShowDetailWithOrder = useSelector(isShowDetailWithOrderSelector)
  const singleOrderPrice = singleOrderPriceProp || singleOrder * orderPrice
  return (
    <li>
      <span>Thu nhập đơn lẻ:</span>
      {isShowDetailWithOrder ? (
        <Operator order={singleOrder} price={orderPrice} />
      ) : (
        <strong className="ml-1">{f(singleOrderPrice)}</strong>
      )}
    </li>
  )
}
const OrderMemo = memo(Order)

const SingleOrder = () => {
  const order = useSelector(orderSelector)
  const joins = useSelector(joinsSelector)
  const { singleOrder } = useMemo(
    () => getPreviewOrder({ order, joins }),
    [order, joins],
  )
  return <OrderMemo singleOrder={singleOrder} />
}

export default SingleOrder
