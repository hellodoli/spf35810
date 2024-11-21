import React, { useMemo, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeMaxJoinOrder } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

import { MaxLabel, InputNumber } from '../Input'

interface Props {
  joinId: string
  initValue: number
}

const Order = ({ joinId, initValue: nextValue }: Props) => {
  const dispatch = useDispatch()
  const maxJoinOrder = useMemo(makeMaxJoinOrder, [])
  const maxOrder = useSelector((state) => maxJoinOrder(state, joinId))
  const max = maxOrder > 0 ? maxOrder : 0

  const onChangeInput = useCallback(
    (order: number) => {
      dispatch(
        actions.setJoin({
          joinId,
          updateKey: 'order',
          value: order,
        }),
      )
    },
    [joinId],
  )

  return (
    <>
      <InputNumber
        min={0}
        max={max}
        initValue={nextValue}
        onChangeInput={onChangeInput}
        isCounterMobile={true}
        resetCount={1} // trick always change when `initValue` change
      />
      <MaxLabel max={max} />
    </>
  )
}

export default memo(Order)
