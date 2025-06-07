import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as Shield } from 'assets/icons/shield-halved.svg'
import {
  hubExtraIncomeSelector,
  hubShortPriceSelector,
  hubTypeSelector,
  includeAutoCompensateSelector,
  isHubShortSelector,
  isHubWellDoneSelector,
  isShowExtraJoinOrderPriceSelector,
  isShowExtraOrderPriceSelector,
  joinsSelector,
  locateSettingSelector,
  orderCompensateSelector,
  orderPriceDefaultSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { getCompensate_Hub, getPrice_Hub } from 'utils/income'
import { getFormat } from 'utils/price'

const Total = () => {
  const f = useMemo(() => getFormat(), [])
  const loc = useSelector(locateSettingSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const order = useSelector(orderSelector)
  const joins = useSelector(joinsSelector)
  const hubType = useSelector(hubTypeSelector)
  const isHubWellDone = useSelector(isHubWellDoneSelector)
  const includeAutoCompensate = useSelector(includeAutoCompensateSelector)
  const isShowExtraJoinOrderPrice = useSelector(
    isShowExtraJoinOrderPriceSelector,
  )
  const isShowExtraOrderPrice = useSelector(isShowExtraOrderPriceSelector)

  const orderCompensate = useSelector((state) =>
    orderCompensateSelector(state, hubType),
  )
  const extraIncomePrice = useSelector(hubExtraIncomeSelector)
  const isHubShort = useSelector(isHubShortSelector)
  const hubShortPrice = useSelector(hubShortPriceSelector)

  const compensateHub = getCompensate_Hub({
    hubType,
    joins,
    order,
    orderPrice,
    extraIncomePrice,
    orderCompensate,
    isHubWellDone,
    includeAutoCompensate,
    loc,
    hubShortPrice,
    isHubShort,
  })

  const { totalPrice } = getPrice_Hub({
    hubType,
    joins,
    order,
    orderPrice,
    extraIncomePrice,
    isHubWellDone,
    isShowExtraJoinOrderPrice,
    isShowExtraOrderPrice,
    loc,
    hubShortPrice,
    isHubShort,
  })

  const isCompensate = compensateHub.isCompensate

  const renderAutoCompensate = () => {
    if (!isCompensate) return null
    const {
      shipPrice,
      extraOrderPrice,
      extraJoinOrderPrice,
      totalPrice,
      extraIncomePrice,
    } = compensateHub
    return (
      <div className="flex items-center">
        <Shield
          width={18}
          height={18}
          fill="var(--nc-primary)"
          className="inline-flex mb-auto mt-2 mr-1"
        />
        <ul>
          <li>
            <span className="mr-1">Thu nhập đảm bảo:</span>
            <strong className="text-color-primary">{f(totalPrice)}</strong>
          </li>
          <ul className="pl-4 ml-2 list-disc text-base">
            <li>
              <span className="mr-1">Phí giao hàng:</span>
              <strong className="text-color-primary">{f(shipPrice)}</strong>
            </li>
            <li>
              <span className="mr-1">Thu nhập đơn vượt mốc:</span>
              <strong className="text-color-primary">
                {f(extraOrderPrice)}
              </strong>
            </li>
            <li>
              <span className="mr-1">Thu nhập đơn ghép vượt mốc:</span>
              <strong className="text-color-primary">
                {f(extraJoinOrderPrice)}
              </strong>
            </li>
            <li>
              <span className="mr-1">Thu nhập khác:</span>
              <strong className="text-color-primary">
                {f(extraIncomePrice)}
              </strong>
            </li>
          </ul>
        </ul>
      </div>
    )
  }

  return (
    <div className="p-2 border-line -mt-[1px] text-xl">
      {renderAutoCompensate()}
      <div className="flex items-center">
        <span
          className={clsx('mr-1', {
            'text-lg': isCompensate,
          })}
        >
          {isCompensate ? 'Tổng thu nhập thực tế:' : 'Tổng thu nhập:'}
        </span>
        <strong className={clsx('text-color-success')}>{f(totalPrice)}</strong>
      </div>
    </div>
  )
}

export default memo(Total)
