import React, { useMemo } from 'react'
import clsx from 'clsx'

import { EXTRA_SUNDAY_ORDER } from 'modules/Form/constants'
import { SETTING_LOCATE } from 'modules/Form/types'
import { getFormat } from 'utils/price'

const headerClassName = 'text-white font-bold uppercase bg-[#35AB99]'

interface LocateBtnItem {
  id: string
  text: string
  value: SETTING_LOCATE
}
const locateText = 'locate-1.1'
const locatesArr: LocateBtnItem[] = [
  { id: `${locateText}-1`, text: 'TPHCM', value: SETTING_LOCATE.TPHCM },
  { id: `${locateText}-2`, text: 'Hà Nội', value: SETTING_LOCATE.HANOI },
  { id: `${locateText}-3`, text: 'Khác', value: SETTING_LOCATE.OTHER },
]

const Item = ({
  children,
  className = '',
  fade = false,
  style,
}: {
  children: React.ReactNode
  className?: string
  fade?: boolean
  style?: React.CSSProperties
}) => {
  return (
    <div
      className={clsx(
        'p-2 rounded-lg',
        'text-center',
        'flex items-center justify-center',
        'border',
        {
          [className]: !!className,
          'opacity-50': fade,
        },
      )}
      style={style}
    >
      {children}
    </div>
  )
}

const LocateInfoView = ({ curLocate }: { curLocate: SETTING_LOCATE }) => {
  const f = useMemo(() => getFormat(), [])
  const locs = useMemo(
    () => locatesArr.filter((loc) => loc.value !== SETTING_LOCATE.OTHER),
    [locatesArr],
  )
  const locateCount = locs.length
  const extraSundayOrder = EXTRA_SUNDAY_ORDER[curLocate]

  return (
    <div
      className="grid gap-1 md:gap-2"
      style={{
        gridTemplateColumns: `repeat(${locateCount + 1}, minmax(0, 1fr))`,
      }}
    >
      {/* Header */}
      <Item className={`${headerClassName} row-start-1 row-end-3`}>
        Tổng số đơn hoàn thành
      </Item>
      <Item
        className={headerClassName}
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 2 + locateCount,
        }}
      >
        Nhận thêm
      </Item>

      {/* Locate Header */}
      {locs.map((locate) => (
        <Item
          key={locate.id}
          className="text-white font-bold bg-[#E64739]"
          fade={locate.value !== curLocate}
        >
          {locate.text}
        </Item>
      ))}

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
            <Item
              className="text-[#E64739] font-semibold"
              fade={curLocate !== SETTING_LOCATE.TPHCM}
            >
              {curLocate === SETTING_LOCATE.TPHCM ? f(price) : '-'}
            </Item>
            <Item
              className="text-[#E64739] font-semibold"
              fade={curLocate !== SETTING_LOCATE.HANOI}
            >
              {curLocate === SETTING_LOCATE.HANOI ? f(price) : '-'}
            </Item>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default LocateInfoView
export { LocateInfoView, locatesArr }
