import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg'
import FormItem from 'components/FormItem'
import Modal from 'components/Modal'
import QuickAddJoinBtn from 'components/QuickAddJoinBtn'
import { quickAddJoinsSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import type { JoinOrder } from 'modules/Form/types'
import Order from 'modules/Setting/Order'

const Label = () => {
  const [isOpen, setIsOpenModal] = useState(false)
  const closeModal = useCallback(() => setIsOpenModal(false), [])
  return (
    <>
      <div className="mb-1" onClick={() => setIsOpenModal(true)}>
        <div className="custom-label inline-flex items-center cursor-pointer">
          <PencilIcon width={12} height={12} fill="var(--nc-primary)" />
          <span className="ml-1">Thêm nhanh</span>
          <span>:</span>
        </div>
      </div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div className="p-4">
          <Order />
        </div>
      </Modal>
    </>
  )
}

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
    <FormItem center={true} LabelComp={Label}>
      <div className="flex items-center flex-wrap gap-1 min-h-[30px]">
        {quickAddJoins.map((join) => {
          return (
            <QuickAddJoinBtn
              key={join.key}
              join={join}
              onClickJoin={addJoin}
              noMargin
            />
          )
        })}
      </div>
    </FormItem>
  )
}

export default Quick
