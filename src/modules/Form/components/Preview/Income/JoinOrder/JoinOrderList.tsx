import React from 'react'
import { JoinOrder } from 'modules/Form/types'
import { useSelector } from 'react-redux'
import { isShowDetailWithOrderSelector } from 'modules/Form/selectors'

import JoinOrderItem from './JoinOrderItem'

const JoinOrderList = ({ joins }: { joins: JoinOrder[] }) => {
  const isShowDetailWithOrder = useSelector(isShowDetailWithOrderSelector)
  return (
    <ul className="pl-4 ml-2 list-disc">
      {joins.map((join) => {
        return (
          <JoinOrderItem
            key={join.key}
            join={join}
            isShowDetailOrder={isShowDetailWithOrder}
          />
        )
      })}
    </ul>
  )
}

export default JoinOrderList
