import React, { useMemo } from 'react'

import { EXTRA_ORDER } from 'modules/Form/constants'
import { OrderExtraRewardArr, SETTING_LOCATE } from 'modules/Form/types'
import { getFormat } from 'utils/price'
import type { LocateBtnItem } from './Item'
import { Item, locatesArr } from './Item'

interface Props {
  curLocate: SETTING_LOCATE
}

const headerClassName = 'text-white font-bold uppercase bg-[#35AB99]'
const subHeadClassName = 'text-white font-bold bg-[#E64739]'

const ExtraOrder = ({ curLocate }: Props) => {
  const f = useMemo(() => getFormat(), [])
  const loc = locatesArr.find((loc) => loc.value === curLocate) as LocateBtnItem
  const extraOrder = EXTRA_ORDER[curLocate]

  const hubTypes = useMemo(() => Object.keys(extraOrder), [extraOrder])
  const orderArr = useMemo(() => Object.values(extraOrder), [extraOrder])

  const getOrderLabel = (
    from: OrderExtraRewardArr[0],
    to: OrderExtraRewardArr[1],
  ) => {
    if (!from && !to) return '-'
    return to ? `Từ ${from} - ${to} (đơn)` : `Từ ${from} đơn trở lên`
  }

  return (
    <div
      className="grid gap-1 md:gap-2"
      style={{
        gridTemplateColumns: `repeat(5, minmax(0, 1fr))`,
      }}
    >
      {/* Header */}
      <Item
        className={`${subHeadClassName} row-start-1 row-end-3 col-start-1 col-end-2`}
      >
        Loại Hub
      </Item>
      <Item
        className={`${headerClassName} row-start-1 row-end-3 col-start-2 col-end-4`}
      >
        Tổng số đơn hoàn thành
      </Item>
      <Item className={`${headerClassName} col-start-4 col-end-6`}>
        Nhận thêm (trên mỗi đơn)
      </Item>

      {/* Locate Header */}
      <Item className={`${subHeadClassName} col-start-4 col-end-6`}>
        {loc.text}
      </Item>

      {/* Price */}
      {orderArr.map((order, index) => {
        const hubType = parseInt(hubTypes[index].split('_')[1])
        const parentKey = `${loc.value}-${hubType}`
        return (
          <React.Fragment key={parentKey}>
            {/* Title */}
            <Item
              className="font-semibold col-start-1 col-end-2"
              style={{ gridRow: `span ${order.length}` }}
            >
              {hubType}
            </Item>

            {!order.length && (
              <>
                <Item
                  className="font-semibold col-start-2 col-end-4"
                  fade={true}
                >
                  Không áp dụng
                </Item>
                {/* Value */}
                <Item
                  className="text-[#E64739] font-semibold col-start-4 col-end-6"
                  fade={true}
                >
                  {`${f(0)}`}
                </Item>
              </>
            )}

            {order.map((extra) => {
              const [from, to, price] = extra
              const id = `${from}-${to}-${price}}`
              const label = getOrderLabel(from, to)
              return (
                <React.Fragment key={`${parentKey}-${id}`}>
                  {/* Title */}
                  <Item
                    className="font-semibold col-start-2 col-end-4"
                    fade={label === '-'}
                  >
                    {label}
                  </Item>
                  {/* Value */}
                  <Item
                    className="text-[#E64739] font-semibold col-start-4 col-end-6"
                    fade={label === '-'}
                  >
                    {`${f(price)}`}
                  </Item>
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default ExtraOrder
