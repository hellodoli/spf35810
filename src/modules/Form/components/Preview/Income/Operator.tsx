import React, { memo } from 'react'
import { getFormat } from 'utils/price'

const f = getFormat()

const Operator = ({
  order = 0,
  price = 0,
}: {
  order?: number
  price?: number
}) => {
  return (
    <span className="ml-1">
      <strong>{order}</strong>
      <span className="ml-1">x</span>
      <strong className="ml-1">{f(price)}</strong>
      <span className="ml-1">=</span>
      <strong className="ml-1">{f(price * order)}</strong>
    </span>
  )
}

export default memo(Operator)
