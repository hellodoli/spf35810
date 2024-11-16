import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { orderPriceDefaultSelector } from 'modules/Form/selectors'

import { Hub } from 'modules/Form/types'
import { getFormat } from 'utils/price'

import { getOrderOfHubs, getPrice_Hubs } from 'utils/income'

import JoinsPay from './JoinsPay'

interface Props {
  hubs: Hub[]
}

const Price = ({ hubs }: Props) => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const priceOfHubs = getPrice_Hubs(hubs, orderPrice)

  return (
    <ul className="p-2 border-line">
      <li className="mb-1 last:mb-0">
        <span>Tổng số đơn hàng:</span>
        <strong className="ml-1">{getOrderOfHubs(hubs)}</strong>
      </li>
      <li className="mb-1 last:mb-0">
        <span>Tổng thu nhập ngày:</span>
        <strong className="ml-1 text-color-success">{f(priceOfHubs)}</strong>
      </li>
      <JoinsPay hubs={hubs} />
    </ul>
  )
}

export default memo(Price)
