import React, { memo } from 'react'

interface Props {
  max: number
  isShortText?: boolean
}

const MaxLabel = ({ max, isShortText = false }: Props) => {
  return (
    <div className="mt-1 text-xs prose-spf prose-slate dark:prose-dark">
      {isShortText ? `Tối đa: ${max} đơn` : `Số lượng tối đa: ${max} đơn`}
    </div>
  )
}

export default memo(MaxLabel)
