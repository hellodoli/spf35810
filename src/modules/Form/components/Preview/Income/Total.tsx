import React, { useMemo, memo } from 'react'
import { useSelector } from 'react-redux'
import {
  orderSelector,
  orderPriceDefaultSelector,
  joinsSelector,
  hubTypeSelector,
  isShowExtraJoinOrderPriceSelector,
  isHubWellDoneSelector,
} from 'modules/Form/selectors'
import { getFormat } from 'utils/price'
import { getPrice_Hub } from 'utils/income'

const Total = () => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const order = useSelector(orderSelector)
  const joins = useSelector(joinsSelector)
  const hubType = useSelector(hubTypeSelector)
  const isHubWellDone = useSelector(isHubWellDoneSelector)
  const isShowExtraJoinOrderPrice = useSelector(
    isShowExtraJoinOrderPriceSelector,
  )

  const totalPrice = getPrice_Hub({
    hubType,
    joins,
    order,
    orderPrice,
    isHubWellDone,
    isShowExtraJoinOrderPrice,
  })

  return (
    <div className="p-2 border-line -mt-[1px] text-xl">
      <span>Tổng thu nhập:</span>
      <strong className="ml-1 text-color-success">{f(totalPrice)}</strong>
    </div>
  )
}

export default memo(Total)
