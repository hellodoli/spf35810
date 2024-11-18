import React, { useState, useCallback, memo } from 'react'
import { useSelector } from 'react-redux'

import { joinsSelector } from 'modules/Form/selectors'

import FormItem from 'components/FormItem'
import Join from '../Join'
import AddJoin from './AddJoin'

/**
 * LATER: chế độ đơn ghép trả tiền đầy đủ
 */
const isHappyJoin = false

const ListJoin = () => {
  console.log(' re-rende ListJoin')
  const joins = useSelector(joinsSelector)
  return (
    <div className="joins-list">
      {joins.map((join) => (
        <Join key={join.key} joinOrder={join} />
      ))}
    </div>
  )
}

const List = memo(ListJoin)

const Joins = () => {
  const [isOpenAdv, setIsOpenAdv] = useState(false)

  const openAdv = useCallback(() => {
    setIsOpenAdv(true)
  }, [])

  const closeAdv = useCallback(() => {
    setIsOpenAdv(false)
  }, [])

  return (
    <FormItem label="Đơn ghép trong ca:">
      <div className="border-line p-2">
        {/* Joins */}
        <List />
        {/* Tùy chỉnh */}
        <div className="flex items-center gap-1 mt-4 mb-2 min-h-[30px]">
          <button
            className="stardust-button-reset stardust-button stardust-button--primary"
            onClick={openAdv}
          >
            + Thêm loại đơn ghép
          </button>
        </div>
        {isOpenAdv && <AddJoin closeAdv={closeAdv} isHappyJoin={isHappyJoin} />}
      </div>
    </FormItem>
  )
}

export default Joins
