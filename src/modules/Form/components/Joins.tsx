import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'

import type { JoinOrder } from 'modules/Form/types'
import { JOIN_2_DEFAULT } from 'modules/Form/constants'
import {
  joinsSelector,
  makeMaxJoinOrderPreview,
  isSoldierHubSelector,
  orderPriceDefaultSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { useSettings } from 'modules/Form/hooks/useSettings'

import { MaxLabel, InputNumber } from './Input'
import FormItem from './FormItem'
import Join from './Join'

const formItemProps = {
  pb: 0,
  mt: 10,
  center: true,
  subLabelWidth: 80,
  labelWidth: '30%',
}

const joinTypeArr: JoinOrder['type'][] = [2, 3, 4, 5]

const Add = ({ closeAdv }: { closeAdv: () => void }) => {
  const dispatch = useDispatch()
  const { settings: ST } = useSettings()

  const [order, setOrder] = useState(0)
  const [resetCountOrder, setResetCountOrder] = useState(0)
  const [joinType, setJoinType] = useState<JoinOrder['type']>(3)

  const maxJoinOrder = useMemo(makeMaxJoinOrderPreview, [])
  const maxOrder = useSelector((state) => maxJoinOrder(state, joinType))
  const max = maxOrder > 0 ? maxOrder : 0
  const soldierHub = useSelector(isSoldierHubSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const fixedPrice = orderPrice * joinType

  const createJoin = useRef<JoinOrder>({ ...JOIN_2_DEFAULT })

  const addJoin = () => {
    const newJoin: JoinOrder = {
      key: uuidv4(),
      type: createJoin.current.type,
      order: createJoin.current.order,
      price: createJoin.current.price,
    }
    dispatch(actions.addJoin({ join: newJoin }))
  }

  const onChangeCreateJoinType = useCallback((newType: number) => {
    const joinType = newType as JoinOrder['type']
    createJoin.current.type = joinType
    setJoinType(joinType)
    setResetCountOrder((count) => count + 1)
  }, [])
  const onChangeCreateOrder = useCallback((order: number) => {
    createJoin.current.order = order
    setOrder(order)
  }, [])
  const onChangeCreatePrice = useCallback((price: number) => {
    createJoin.current.price = price
  }, [])

  useEffect(() => {
    if (!soldierHub) onChangeCreatePrice(fixedPrice)
  }, [soldierHub, onChangeCreatePrice, fixedPrice])

  return (
    <div className="border p-2 border-black">
      <FormItem {...formItemProps} label="Loại ghép:" isWrapLabel={false}>
        <div className="flex flex-wrap gap-2">
          {joinTypeArr.map((type) => {
            return (
              <button
                key={type}
                className={clsx(
                  'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
                  {
                    'stardust-button--active': joinType === type,
                  },
                )}
                onClick={() => onChangeCreateJoinType(type)}
              >
                {`${type} đơn`}
              </button>
            )
          })}
        </div>
        {/* OLD CODE: input type */}
        {/*<InputNumber
          min={2}
          max={5}
          initValue={3}
          onChangeInput={onChangeCreateJoinType}
        />*/}
      </FormItem>
      <FormItem {...formItemProps} label="Số lượng:" subLabel="đơn">
        <InputNumber
          min={0}
          max={max}
          initValue={0}
          onChangeInput={onChangeCreateOrder}
          resetCount={resetCountOrder}
          isCounterMobile={true}
        />
        <MaxLabel max={max} />
      </FormItem>
      <FormItem {...formItemProps} label="Giá đơn ghép:">
        {!soldierHub ? (
          <div className="filter-none outline-none p-[12px] flex-[1_0_0%] border-none bg-none">
            {orderPrice * joinType}
          </div>
        ) : (
          <InputNumber
            min={ST.ORDER_PRICE.MIN}
            max={ST.ORDER_PRICE.MAX}
            step={ST.ORDER_PRICE.STEP}
            initValue={ST['JOIN_3'].PRICE}
            onChangeInput={onChangeCreatePrice}
            disabled={!soldierHub}
          />
        )}
      </FormItem>
      {/* Meta zone */}
      <FormItem {...formItemProps} label="">
        <button
          className="stardust-button-reset stardust-button stardust-button--primary"
          onClick={addJoin}
          disabled={order <= 0}
        >
          Thêm
        </button>{' '}
        <button
          className="stardust-button-reset stardust-button stardust-button--secondary"
          onClick={closeAdv}
        >
          Hủy
        </button>
      </FormItem>
    </div>
  )
}

const List = () => {
  const joins = useSelector(joinsSelector)
  return (
    <div className="joins-list">
      {joins.map((join) => (
        <Join key={join.key} joinOrder={join} />
      ))}
    </div>
  )
}

const Joins = () => {
  const [isOpenAdv, setIsOpenAdv] = useState(false)

  const openAdv = useCallback(() => {
    setIsOpenAdv(true)
  }, [])

  const closeAdv = useCallback(() => {
    setIsOpenAdv(false)
  }, [])

  return (
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
      {isOpenAdv && <Add closeAdv={closeAdv} />}
    </div>
  )
}

export default Joins
