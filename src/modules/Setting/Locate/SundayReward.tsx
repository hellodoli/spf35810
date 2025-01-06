import React, { useMemo } from 'react'

import { EXTRA_SUNDAY_ORDER } from 'modules/Form/constants'
import { SETTING_LOCATE } from 'modules/Form/types'
import { getFormat } from 'utils/price'
import type { LocateBtnItem } from './Item'
import { Item, locatesArr } from './Item'

interface Props {
  curLocate: SETTING_LOCATE
}

const headerClassName = 'text-white font-bold uppercase bg-[#35AB99]'

const SundayReward = ({ curLocate }: Props) => {
  const f = useMemo(() => getFormat(), [])
  const extraSundayOrder = EXTRA_SUNDAY_ORDER[curLocate]
  const loc = locatesArr.find((loc) => loc.value === curLocate) as LocateBtnItem

  return (
    <div
      className="grid gap-1 md:gap-2"
      style={{
        gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
      }}
    >
      {/* Header */}
      <Item className={`${headerClassName} row-start-1 row-end-3`}>
        Tổng số đơn hoàn thành
      </Item>
      <Item className={headerClassName}>Nhận thêm</Item>

      {/* Locate Header */}
      <Item className="text-white font-bold bg-[#E64739]">{loc.text}</Item>

      {/* Price */}
      {extraSundayOrder.map((extra) => {
        const [from, to, price] = extra
        const id = `${from}-${to}-${price}}`
        return (
          <React.Fragment key={id}>
            {/* Title */}
            <Item className="text-[#000000] font-semibold">
              {to ? `Từ ${from} - ${to} (đơn)` : `Từ ${from} đơn trở lên`}
            </Item>
            {/* Value */}
            <Item className="text-[#E64739] font-semibold">{f(price)}</Item>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default SundayReward
