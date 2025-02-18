import React, { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { InputNumber, MaxLabel } from 'components/Input'
import { makeMaxJoinOrder } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

interface Props {
  joinId: string
  initValue: number
  isPlainUI: boolean
}

const Order = ({ joinId, initValue: nextValue, isPlainUI }: Props) => {
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
        wrapperClassName={isPlainUI ? '!h-8' : ''}
      />
      <MaxLabel max={max} isShortText={isPlainUI} />
    </>
  )
}

export default memo(Order)
