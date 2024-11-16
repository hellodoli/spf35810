import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  orderPriceDefaultSelector,
  joinsSelector,
  isHubWellDoneSelector,
  hubTypeSelector,
  orderSelector,
  isShowIncomeDropByJoinOrderSelector,
} from 'modules/Form/selectors'

import { getFormat } from 'utils/price'
import { getDiffJoinsPrice_Hub } from 'utils/income'

const JoinsPay = () => {
  const f = useMemo(() => getFormat(), [])
  const joins = useSelector(joinsSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const isHubWellDone = useSelector(isHubWellDoneSelector)
  const hubType = useSelector(hubTypeSelector)
  const order = useSelector(orderSelector)
  const isShow = useSelector(isShowIncomeDropByJoinOrderSelector)

  const diffPrice = getDiffJoinsPrice_Hub({
    joins,
    orderPrice,
    isHubWellDone,
    hubType,
    order,
  })

  if (!isShow) return null

  return (
    <ul className="p-2 border-line -mt-[1px]">
      <li>
        <span>Thu nhập tăng/giảm do đơn ghép:</span>
        <strong
          className="ml-1"
          style={{
            ...(diffPrice !== 0 && {
              color: diffPrice >= 0 ? 'var(--nc-success)' : 'var(--nc-error)',
            }),
          }}
        >
          {f(diffPrice)}
        </strong>
      </li>
    </ul>
  )
}

export default memo(JoinsPay)
