import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'

import type { JoinOrder } from 'modules/Form/types'
import { JOIN_3_DEFAULT } from 'modules/Form/constants'
import {
  makeMaxJoinOrderPreview,
  orderPriceDefaultSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

import { useSettings } from 'modules/Form/hooks/useSettings'

import { MaxLabel, InputNumber } from '../Input'
import FormItem from '../FormItem'

interface Props {
  closeAdv: () => void
  isHappyJoin?: boolean
}

const formItemProps = {
  pb: 0,
  mt: 10,
  center: true,
  subLabelWidth: 80,
  labelWidth: '30%',
}

const joinTypeArr: JoinOrder['type'][] = [2, 3, 4, 5]

const JOIN_DEFAULT = { ...JOIN_3_DEFAULT }

const AddJoin = ({ closeAdv, isHappyJoin = false }: Props) => {
  const dispatch = useDispatch()
  const { settings: ST } = useSettings()

  const [order, setOrder] = useState(JOIN_DEFAULT.order)
  const [resetCountOrder, setResetCountOrder] = useState(0)
  const [joinType, setJoinType] = useState<JoinOrder['type']>(JOIN_DEFAULT.type)

  const maxJoinOrder = useMemo(makeMaxJoinOrderPreview, [])
  const maxOrder = useSelector((state) => maxJoinOrder(state, joinType))
  const max = maxOrder > 0 ? maxOrder : 0

  const orderPrice = useSelector(orderPriceDefaultSelector)
  const fixedPrice = orderPrice * joinType

  const createJoin = useRef<JoinOrder>({
    ...JOIN_DEFAULT,
    order,
    type: joinType,
  })

  const addJoin = () => {
    const newJoin: JoinOrder = {
      key: uuidv4(),
      type: createJoin.current.type,
      order: createJoin.current.order,
      price: createJoin.current.price,
    }
    dispatch(actions.addJoin({ join: newJoin }))
  }

  const onChangeCreateJoinType = useCallback(
    (newType: number) => {
      const newJoinType = newType as JoinOrder['type']
      if (newJoinType === joinType) return
      // change new type
      createJoin.current.type = newJoinType
      setJoinType(newJoinType)
      setResetCountOrder((count) => count + 1)
    },
    [joinType],
  )
  const onChangeCreateOrder = useCallback((order: number) => {
    createJoin.current.order = order
    setOrder(order)
  }, [])
  const onChangeCreatePrice = useCallback((price: number) => {
    createJoin.current.price = price
  }, [])

  useEffect(() => {
    if (isHappyJoin) onChangeCreatePrice(fixedPrice)
  }, [isHappyJoin, onChangeCreatePrice, fixedPrice])

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
        {isHappyJoin ? (
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
            disabled={isHappyJoin}
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

export default memo(AddJoin)
