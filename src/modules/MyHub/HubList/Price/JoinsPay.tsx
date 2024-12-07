import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Hub } from 'modules/Form/types'
import { orderPriceDefaultSelector } from 'modules/Form/selectors'

import { getFormat } from 'utils/price'
import { getDiffJoinsPrice_Hubs, getColorPrice } from 'utils/income'

const JoinsPay = ({ hubs }: { hubs: Hub[] }) => {
  const f = useMemo(() => getFormat(), [])
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const diffPrice = getDiffJoinsPrice_Hubs(hubs, orderPrice)

  return (
    <li className="mb-1 last:mb-0">
      <span>Thu nhập tăng/giảm do đơn ghép:</span>
      <strong
        className="ml-1"
        style={{
          color: getColorPrice(diffPrice),
        }}
      >
        {f(diffPrice)}
      </strong>
    </li>
  )
}

export default memo(JoinsPay)
