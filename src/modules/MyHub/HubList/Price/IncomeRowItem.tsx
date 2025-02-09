import React, { memo, useMemo } from 'react'

import { getFormat } from 'utils/price'

const IncomeRowItem = ({
  price = 0,
  label = '',
  icon: Icon,
}: {
  price?: number
  label?: string
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
}) => {
  const f = useMemo(() => getFormat(), [])
  return (
    <li className="flex flex-wrap items-center">
      <Icon fill="var(--nc-primary)" width={12} height={12} className="mr-2" />
      <span className="mr-1">{`(${label}):`}</span>
      <strong className="text-color-success">{f(price)}</strong>
    </li>
  )
}

export default memo(IncomeRowItem)
