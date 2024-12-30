import React, { memo } from 'react'

interface Props {
  max: number
}

const MaxLabel = ({ max }: Props) => {
  return (
    <div
      className="mt-1 text-xs"
      style={{ color: 'color: rgba(85, 85, 85, 0.8)' }}
    >
      (Số lượng tối đa: {max} đơn)
    </div>
  )
}

export default memo(MaxLabel)
