import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { ReactComponent as CartShoppingIcon } from 'assets/icons/cart-shopping.svg'
import { ReactComponent as EnviraIcon } from 'assets/icons/envira.svg'
import { ReactComponent as GearIcon } from 'assets/icons/gear.svg'
import {
  locateSettingSelector,
  orderCompensateNumberSelector,
  orderPriceDefaultSelector,
} from 'modules/Form/selectors'
import { Hub } from 'modules/Form/types'
import { isApplyForExtraSunday } from 'utils/hub'
import {
  getColorPrice,
  getExtraSundayPrice_Hubs,
  getOrder_Hubs,
  getPrice_Hubs,
} from 'utils/income'
import { getFormat } from 'utils/price'
import JoinsPay from './JoinsPay'

interface Props {
  hubs: Hub[]
  unixDate: number
  isOpenViewDetailIncome: boolean
}

const Price = ({ hubs, unixDate, isOpenViewDetailIncome }: Props) => {
  const f = useMemo(() => getFormat(), [])
  const loc = useSelector(locateSettingSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const orderCompensateNumber = useSelector(orderCompensateNumberSelector)

  const orderHubs = getOrder_Hubs(hubs)
  const extraSundayPrice = getExtraSundayPrice_Hubs(hubs, loc)

  const isSunday = isApplyForExtraSunday(unixDate)
  const {
    total: priceHubs,
    shipArr,
    extraOrderArr,
    extraJoinOrderArr,
  } = getPrice_Hubs({
    hubs,
    orderPrice,
    loc,
    orderCompensateNumber,
    isShowExtraSundayPrice: false,
  })

  return (
    <ul className="p-2 border-line">
      <li className="mb-1 last:mb-0">
        <span>Tổng số đơn hàng:</span>
        <strong className="ml-1">{orderHubs}</strong>
      </li>
      <li className="mb-1 last:mb-0">
        <span>Tổng thu nhập ngày:</span>
        <strong className="ml-1 text-color-success">{f(priceHubs)}</strong>
        {isOpenViewDetailIncome && (
          <ul className="pl-2 empty:hidden">
            {shipArr.map((ship) => {
              return (
                <li
                  key={`shipment-${ship.label}`}
                  className="flex flex-wrap items-center"
                >
                  <CartShoppingIcon
                    fill="var(--nc-primary)"
                    width={12}
                    height={12}
                    className="mr-2"
                  />
                  <span className="mr-1">{`(${ship.label}):`}</span>
                  <strong className="text-color-success">
                    {f(ship.price)}
                  </strong>
                </li>
              )
            })}
            {extraOrderArr.map((extraOrder) => {
              return (
                <li
                  key={`extraOrder-${extraOrder.label}`}
                  className="flex flex-wrap items-center"
                >
                  <GearIcon
                    fill="var(--nc-primary)"
                    width={12}
                    height={12}
                    className="mr-2"
                  />
                  <span className="mr-1">{`(${extraOrder.label}):`}</span>
                  <strong className="text-color-success">
                    {f(extraOrder.price)}
                  </strong>
                </li>
              )
            })}
            {extraJoinOrderArr.map((extraJoinOrder) => {
              return (
                <li
                  key={`extraJoinOrder-${extraJoinOrder.label}`}
                  className="flex flex-wrap items-center"
                >
                  <EnviraIcon
                    fill="var(--nc-primary)"
                    width={12}
                    height={12}
                    className="mr-2"
                  />
                  <span className="mr-1">{`(${extraJoinOrder.label}):`}</span>
                  <strong className="text-color-success">
                    {f(extraJoinOrder.price)}
                  </strong>
                </li>
              )
            })}
          </ul>
        )}
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
