import React from 'react'
import clsx from 'clsx'

import { SETTING_LOCATE } from 'modules/Form/types'
interface LocateBtnItem {
  id: string
  text: string
  value: SETTING_LOCATE
}

interface Props {
  children: React.ReactNode
  className?: string
  fade?: boolean
  style?: React.CSSProperties
}

const locateText = 'locate-1.2'
const locatesArr: LocateBtnItem[] = [
  { id: `${locateText}-1`, text: 'TPHCM', value: SETTING_LOCATE.TPHCM },
  { id: `${locateText}-2`, text: 'Hà Nội', value: SETTING_LOCATE.HANOI },
  { id: `${locateText}-3`, text: 'Hải Phòng', value: SETTING_LOCATE.HAIPHONG },
  { id: `${locateText}-4`, text: 'Khác', value: SETTING_LOCATE.OTHER },
]

const Item = ({ children, className = '', fade = false, style }: Props) => {
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

export default Item
export { Item, locatesArr }
export type { LocateBtnItem }
