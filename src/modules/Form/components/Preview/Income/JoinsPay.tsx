import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  hubTypeSelector,
  isHubWellDoneSelector,
  isShowIncomeDropByJoinOrderSelector,
  joinsSelector,
  locateSettingSelector,
  orderPriceDefaultSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { getColorPrice, getDiffJoinsPrice_Hub } from 'utils/income'
import { getFormat } from 'utils/price'

const JoinsPay = () => {
  const f = useMemo(() => getFormat(), [])
  const joins = useSelector(joinsSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const isHubWellDone = useSelector(isHubWellDoneSelector)
  const hubType = useSelector(hubTypeSelector)
  const order = useSelector(orderSelector)
  const isShow = useSelector(isShowIncomeDropByJoinOrderSelector)
  const loc = useSelector(locateSettingSelector)

  const diffPrice = getDiffJoinsPrice_Hub({
    joins,
    orderPrice,
    isHubWellDone,
    hubType,
    order,
    loc,
  })

  if (!isShow) return null

  return (
    <ul className="p-2 border-line -mt-[1px]">
      <li>
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
    </ul>
  )
}

export default memo(JoinsPay)
