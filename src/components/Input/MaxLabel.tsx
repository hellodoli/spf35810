import React, { memo } from 'react'

interface Props {
  max: number
}

const MaxLabel = ({ max }: Props) => {
  return (
    <div className="mt-1 text-xs prose-spf prose-slate dark:prose-dark">
      (Số lượng tối đa: {max} đơn)
    </div>
  )
}

export default memo(MaxLabel)
