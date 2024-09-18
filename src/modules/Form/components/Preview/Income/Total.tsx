import React, { useMemo, memo } from 'react'
import { useSelector } from 'react-redux'
import {
  orderSelector,
  orderPriceDefaultSelector,
  joinsSelector,
  hubTypeSelector,
  isShowExtraJoinOrderPriceSelector,
} from 'modules/Form/selectors'
import { getPriceJoinOrder, getFormat, getPriceExtraOrder } from 'utils/price'
import { getPreviewOrder } from 'utils/preview'

const Total = () => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const order = useSelector(orderSelector)
  const joins = useSelector(joinsSelector)
  const hubType = useSelector(hubTypeSelector)
  const isShowExtraJoinOrderPrice = useSelector(
    isShowExtraJoinOrderPriceSelector,
  )
  const { singleOrder, totalJoinsOrder } = useMemo(
    () => getPreviewOrder({ order, joins }),
    [order, joins],
  )
  const totalPriceJoinOrder = useMemo(
    () => getPriceJoinOrder({ joins }),
    [joins],
  )
  const singleOrderPrice = singleOrder * orderPrice

  // extra price
  const extraOrder = useMemo(
    () =>
      getPriceExtraOrder({
        hubType,
        order,
        isJoin: false,
      }),
    [hubType, order],
  )
  const extraJoinOrder = useMemo(
    () =>
      getPriceExtraOrder({
        hubType,
        order: totalJoinsOrder,
        isJoin: true,
      }),
    [hubType, order, totalJoinsOrder],
  )

  return (
    <div className="p-2 border-line -mt-[1px] text-xl">
      <span>Tổng thu nhập:</span>
      <strong className="ml-1">
        {f(
          singleOrderPrice +
            totalPriceJoinOrder +
            extraOrder.totalPrice +
            (isShowExtraJoinOrderPrice ? extraJoinOrder.totalPrice : 0),
        )}
      </strong>
    </div>
  )
}

export default memo(Total)
