import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as Shield } from 'assets/icons/shield-halved.svg'
import {
  hubTypeSelector,
  isHubWellDoneSelector,
  isShowExtraJoinOrderPriceSelector,
  joinsSelector,
  orderCompensateSelector,
  orderPriceDefaultSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { canCompensate } from 'utils/hub'
import { getPrice_Hub, getPriceCompensate_Hub } from 'utils/income'
import { getFormat } from 'utils/price'

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
  const orderCompensate = useSelector((state) =>
    orderCompensateSelector(state, hubType),
  )

  const isAutoCompensate = canCompensate({
    hubType,
    isHubWellDone,
    order,
    orderCompensate,
  })

  const totalPrice = getPrice_Hub({
    hubType,
    joins,
    order,
    orderPrice,
    isHubWellDone,
    isShowExtraJoinOrderPrice,
  })

  const renderAutoCompensate = () => {
    if (!isAutoCompensate) return null

    const price = getPriceCompensate_Hub({
      orderPrice,
      orderCompensate,
    })

    return (
      <div className="flex items-center">
        <Shield
          width={18}
          height={18}
          fill="var(--nc-primary)"
          className="inline-flex my-auto mr-1"
        />
        <span className="mr-1">Thu nhập đảm bảo:</span>
        <strong className="text-color-primary">{f(price)}</strong>
      </div>
    )
  }

  return (
    <div className="p-2 border-line -mt-[1px] text-xl">
      {renderAutoCompensate()}
      <div className="flex items-center">
        {isAutoCompensate && (
          <Shield
            width={18}
            height={18}
            fill="var(--nc-primary)"
            className="inline-flex my-auto mr-1 select-none pointer-events-none opacity-0 invisible"
          />
        )}
        <span
          className={clsx('mr-1', {
            'text-lg': isAutoCompensate,
          })}
        >
          Tổng thu nhập:
        </span>
        <strong className="text-color-success">{f(totalPrice)}</strong>
      </div>
    </div>
  )
}

export default memo(Total)
