import React, { useCallback, useState } from 'react'

import FormItem from 'components/FormItem'
import AddJoin from './AddJoin'
import List from './List'
import Quick from './Quick'

/**
 * LATER: chế độ đơn ghép trả tiền đầy đủ
 */
const isHappyJoin = false

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

        <div>
          {/* Quick Add */}
          <Quick />
          {/* Custom Add */}
          <FormItem label="Thêm tùy chỉnh:" center={true}>
            <button
              className="stardust-button-reset stardust-button stardust-button--primary"
              onClick={openAdv}
              disabled={isOpenAdv}
            >
              + Thêm loại đơn ghép
            </button>
          </FormItem>
          {isOpenAdv && (
            <AddJoin closeAdv={closeAdv} isHappyJoin={isHappyJoin} />
          )}
        </div>
      </div>
    </FormItem>
  )
}

export default Joins
