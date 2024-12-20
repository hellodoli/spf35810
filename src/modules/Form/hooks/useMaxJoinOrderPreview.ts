import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { makeMaxJoinOrderPreview } from 'modules/Form/selectors'
import type { JoinOrder } from 'modules/Form/types'

export const useMaxJoinOrderPreview = (joinType: JoinOrder['type']) => {
  const maxJoinOrder = useMemo(makeMaxJoinOrderPreview, [])
  const maxOrder = useSelector((state) => maxJoinOrder(state, joinType))
  const max = maxOrder > 0 ? maxOrder : 0
  return { max }
}
