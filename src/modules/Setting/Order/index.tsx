import React from 'react'
import { useSelector } from 'react-redux'

import AddJoin from 'components/AddJoin'
import QuickAddJoinBtn from 'components/QuickAddJoinBtn'
import { JOIN_2_DEFAULT } from 'modules/Form/constants'
import { quickAddJoinsSelector } from 'modules/Form/selectors'

const joinDefault = { ...JOIN_2_DEFAULT }

const Order = () => {
  const quickAddJoins = useSelector(quickAddJoinsSelector)

  return (
    <div>
      <AddJoin noMaxMode={true} joinDefault={joinDefault} />
      <div className="flex items-center flex-wrap gap-1 min-h-[30px] mt-4">
        {quickAddJoins.map((join) => {
          return (
            <QuickAddJoinBtn key={join.key} join={join} isViewMode={true} />
          )
        })}
      </div>
    </div>
  )
}

export default Order
