import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  orderPriceDefaultSelector,
  locateSettingSelector,
} from 'modules/Form/selectors'

import { Hub } from 'modules/Form/types'
import { getFormat } from 'utils/price'
import { isApplyForExtraSunday } from 'utils/hub'
import {
  getOrder_Hubs,
  getPrice_Hubs,
  getExtraSundayPrice_Hubs,
  getColorPrice,
} from 'utils/income'

import JoinsPay from './JoinsPay'

interface Props {
  hubs: Hub[]
  unixDate: number
}

const Price = ({ hubs, unixDate }: Props) => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const locate = useSelector(locateSettingSelector)

  const orderHubs = getOrder_Hubs(hubs)
  const extraSundayPrice = getExtraSundayPrice_Hubs(hubs, locate)

  const isSunday = isApplyForExtraSunday(unixDate)
  const priceHubs = getPrice_Hubs(hubs, orderPrice, true, locate)

  return (
    <ul className="p-2 border-line">
      <li className="mb-1 last:mb-0">
        <span>Tổng số đơn hàng:</span>
        <strong className="ml-1">{orderHubs}</strong>
      </li>
      <li className="mb-1 last:mb-0">
        <span>Tổng thu nhập ngày:</span>
        <strong className="ml-1 text-color-success">{f(priceHubs)}</strong>
      </li>

      {/* Thu nhập tăng/giảm do đơn ghép */}
      <JoinsPay hubs={hubs} />

      {/* Thu nhập thưởng chủ nhật */}
      {isSunday && (
        <li className="mb-1 last:mb-0">
          <span>Thu nhập thưởng Chủ Nhật:</span>
          <strong
            className="ml-1"
            style={{ color: getColorPrice(extraSundayPrice) }}
          >
            {f(extraSundayPrice)}
          </strong>
        </li>
      )}
    </ul>
  )
}

export default memo(Price)
