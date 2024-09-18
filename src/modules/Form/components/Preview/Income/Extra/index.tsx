import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  orderSelector,
  joinsSelector,
  hubTypeSelector,
  isShowExtraJoinOrderPriceSelector,
} from 'modules/Form/selectors'
import { getTotalOrderOfJoins } from 'utils/join'
import { isSoldierHub } from 'utils/hub'

import ExtraPrice from './ExtraPrice'

const ExtraOrderPrice = () => {
  const order = useSelector(orderSelector)
  return (
    <ExtraPrice order={order} title="Thu nhập đơn vượt mốc:" isJoin={false} />
  )
}

const ExtraJoinOrderPrice = () => {
  const hubType = useSelector(hubTypeSelector)
  const joins = useSelector(joinsSelector)
  const isShowExtraJoinOrderPrice = useSelector(
    isShowExtraJoinOrderPriceSelector,
  )
  const totalOrderOfJoins = useMemo(() => getTotalOrderOfJoins(joins), [joins])
  if (!isSoldierHub(hubType) || !isShowExtraJoinOrderPrice) return null
  return (
    <ExtraPrice
      order={totalOrderOfJoins}
      title="Thu nhập đơn ghép vượt mốc:"
      isJoin={true}
    />
  )
}

export { ExtraOrderPrice, ExtraJoinOrderPrice }
