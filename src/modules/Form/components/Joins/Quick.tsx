import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import FormItem from 'components/FormItem'
import { useMaxJoinOrderPreview } from 'modules/Form/hooks/useMaxJoinOrderPreview'
import { actions } from 'modules/Form/slices'
import type { JoinOrder } from 'modules/Form/types'
import { getFormat } from 'utils/price'

const quickAddBtns: JoinOrder[] = [
  { key: `quickAddBtns_2_20900`, type: 2, order: 1, price: 20090 },
  { key: `quickAddBtns_3_31200`, type: 3, order: 1, price: 31200 },
  { key: `quickAddBtns_3_32350`, type: 3, order: 1, price: 32350 },
]

const QuickAddBtn = ({
  join,
  addJoin,
}: {
  join: JoinOrder
  addJoin: (join: JoinOrder) => void
}) => {
  const f = getFormat()
  const { max } = useMaxJoinOrderPreview(join.type)
  return (
    <button
      className="stardust-button-reset stardust-button stardust-button--primary mr-1"
      disabled={max === 0}
      onClick={() => addJoin(join)}
    >
      {`+ Ghép ${join.type}: ${f(join.price)}`}
    </button>
  )
}

const Quick = () => {
  const dispatch = useDispatch()

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
        {quickAddBtns.map((join) => {
          return <QuickAddBtn key={join.key} join={join} addJoin={addJoin} />
        })}
      </div>
    </FormItem>
  )
}

export default Quick
