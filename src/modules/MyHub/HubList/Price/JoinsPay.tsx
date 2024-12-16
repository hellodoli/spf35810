import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Hub } from 'modules/Form/types'
import {
  orderPriceDefaultSelector,
  isExtraChildJoinOrderSelector,
} from 'modules/Form/selectors'

import { getFormat } from 'utils/price'
import { getDiffJoinsPrice_Hubs, getColorPrice } from 'utils/income'

interface Props {
  hubs: Hub[]
}

const Price = ({ hubs }: Props) => {
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
const PriceMemo = memo(Price)

const JoinsPay = (props: Props) => {
  const isExtraChildJoinOrder = useSelector(isExtraChildJoinOrderSelector)
  if (!isExtraChildJoinOrder) return null
  return <PriceMemo {...props} />
}

export default JoinsPay
