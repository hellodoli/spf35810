import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddJoin from 'components/AddJoin'
import QuickAddJoinBtn from 'components/QuickAddJoinBtn'
import { JOIN_2_DEFAULT } from 'modules/Form/constants'
import { quickAddJoinsSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import type { JoinOrder } from 'modules/Form/types'

const joinDefault = { ...JOIN_2_DEFAULT }

const Order = () => {
  const dispath = useDispatch()
  const quickAddJoins = useSelector(quickAddJoinsSelector)

  const onDelete = useCallback((id: string) => {
    dispath(actions.deleteQuickAddJoins({ id }))
  }, [])

  const onAdd = useCallback((join: JoinOrder) => {
    dispath(actions.addQuickAddJoins({ join }))
  }, [])

  return (
    <div>
      <div className="mb-1">
        <em className="link cursor-pointer select-none !no-underline">
          *Tùy chỉnh đơn ghép nhanh
        </em>
      </div>
      <AddJoin noMaxMode={true} joinDefault={joinDefault} onClick={onAdd} />
      <div className="flex items-center flex-wrap gap-1 min-h-[30px] mt-4 empty:hidden">
        {quickAddJoins.map((join) => {
          return (
            <QuickAddJoinBtn
              key={join.key}
              join={join}
              isViewMode={true}
              hasDelete={true}
              isDisabledOnClick={true}
              onDelete={onDelete}
              noMargin={true}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Order
