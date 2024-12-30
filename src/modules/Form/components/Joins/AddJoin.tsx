import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import AddJoin from 'components/AddJoin'
import { actions } from 'modules/Form/slices'
import type { JoinOrder } from 'modules/Form/types'
interface Props {
  onCancel: () => void
  isHappyJoin: boolean
}

const Add = ({ onCancel, isHappyJoin }: Props) => {
  const dispatch = useDispatch()
  const addJoin = useCallback((join: JoinOrder) => {
    dispatch(actions.addJoin({ join }))
  }, [])

  return (
    <AddJoin
      wrapperClassNames="mt-2"
      onClick={addJoin}
      onCancel={onCancel}
      isHappyJoin={isHappyJoin}
    />
  )
}

export default Add
