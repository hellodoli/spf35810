import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import FormItem from 'components/FormItem'
import QuickAddJoinBtn from 'components/QuickAddJoinBtn'
import { quickAddJoinsSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import type { JoinOrder } from 'modules/Form/types'

const Quick = () => {
  const dispatch = useDispatch()
  const quickAddJoins = useSelector(quickAddJoinsSelector)

  const addJoin = useCallback((join: JoinOrder) => {
    const newJoin: JoinOrder = {
      key: uuidv4(),
      type: join.type,
      price: join.price,
      order: 1,
    }
    dispatch(actions.addJoin({ join: newJoin }))
  }, [])

  return (
    <FormItem label="Thêm nhanh:" center={true}>
      <div className="flex items-center flex-wrap gap-1 min-h-[30px]">
        {quickAddJoins.map((join) => {
          return (
            <QuickAddJoinBtn key={join.key} join={join} onClickJoin={addJoin} />
          )
        })}
      </div>
    </FormItem>
  )
}

export default Quick
