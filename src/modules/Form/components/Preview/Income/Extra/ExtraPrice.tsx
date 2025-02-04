import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ExpandBtn from 'components/Buttons/ExpandBtn'
import {
  hubTypeSelector,
  isShowDetailWithOrderSelector,
  locateSettingSelector,
} from 'modules/Form/selectors'
import { getFormat, getPriceExtraOrder } from 'utils/price'

import Operator from '../Operator'

const f = getFormat()

const ExtraPrice = ({
  isJoin = false,
  order,
  title = '',
}: {
  isJoin?: boolean
  order: number
  title?: string
}) => {
  const isShowDetailWithOrder = useSelector(isShowDetailWithOrderSelector)
  const hubType = useSelector(hubTypeSelector)
  const loc = useSelector(locateSettingSelector)

  const [isDetail, setIsDetail] = useState(false)

  const { extraOrderPriceArr, totalOrderCount, totalPrice } = useMemo(
    () =>
      getPriceExtraOrder({
        hubType,
        order,
        isJoin,
        loc,
      }),
    [hubType, order, loc, isJoin],
  )

  const toggleDetail = useCallback(() => {
    setIsDetail((open) => !open)
  }, [])

  const renderLabel = (start: number, end: number | null, price: number) => {
    const className = 'inline-flex items-center min-w-[300px] max-w-[300px]'
    if (!end)
      return (
        <span className={className}>
          <span>Mốc từ đơn</span>
          <strong className="mx-1">{start}</strong>
          <span>(</span>
          <strong>{f(price)}</strong>
          <span>/đơn):</span>
        </span>
      )
    return (
      <span className={className}>
        Mốc từ đơn <strong className="mx-1">{start}</strong> đến
        <strong className="mx-1">{end}</strong>
        <span>(</span>
        <strong>{f(price)}</strong>
        <span>/đơn):</span>
      </span>
    )
  }

  const renderDetail = () => {
    if (!isDetail || !totalOrderCount) return null
    return (
      <ul className="pl-4 ml-2 list-disc">
        {extraOrderPriceArr.map(({ id, start, end, orderCount, price }) => {
          return (
            <li key={id}>
              {renderLabel(start, end, price)}
              {isShowDetailWithOrder ? (
                <Operator order={orderCount} price={price} />
              ) : (
                <strong className="ml-1">{f(orderCount * price)}</strong>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <li>
      <span>{title}</span>
      <strong className="ml-1">{f(totalPrice)}</strong>
      {/* Chi Tiết Thu Nhập đơn vượt mốc */}
      {!!totalOrderCount && (
        <ExpandBtn isDetail={isDetail} toggleDetail={toggleDetail} />
      )}
      {renderDetail()}
    </li>
  )
}

export default memo(ExtraPrice)
