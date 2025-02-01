import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'

import FormItem from 'components/FormItem'
import { JOIN_3_DEFAULT } from 'modules/Form/constants'
import { useMaxJoinOrderPreview } from 'modules/Form/hooks/useMaxJoinOrderPreview'
import { useSettings } from 'modules/Form/hooks/useSettings'
import { orderPriceDefaultSelector } from 'modules/Form/selectors'
import type { JoinOrder } from 'modules/Form/types'
import { InputNumber, MaxLabel } from './Input'

interface Props {
  onClick?: (join: JoinOrder) => void
  onCancel?: () => void
  isHappyJoin?: boolean
  joinDefault?: JoinOrder
  noMaxMode?: boolean
  wrapperClassNames?: string
}

const formItemProps = {
  pb: 0,
  mt: 10,
  center: true,
  subLabelWidth: 80,
  labelWidth: '30%',
}
const joinTypeArr: JoinOrder['type'][] = [2, 3, 4, 5]
const INIT_JOIN_DEFAULT = { ...JOIN_3_DEFAULT }

const AddJoin = ({
  onClick,
  onCancel,
  isHappyJoin = false,
  joinDefault: JOIN_DEFAULT = INIT_JOIN_DEFAULT,
  wrapperClassNames = '',
  noMaxMode = false,
}: Props) => {
  const { settings: ST } = useSettings()

  const [order, setOrder] = useState(JOIN_DEFAULT.order)
  const [resetCountOrder, setResetCountOrder] = useState(0)
  const [joinType, setJoinType] = useState<JoinOrder['type']>(JOIN_DEFAULT.type)
  const { max } = useMaxJoinOrderPreview(joinType)

  const orderPrice = useSelector(orderPriceDefaultSelector)
  const fixedPrice = orderPrice * joinType

  const addBtnDisabled = noMaxMode ? false : order <= 0

  const createJoin = useRef<JoinOrder>({
    ...JOIN_DEFAULT,
    order,
    type: joinType,
  })

  const handleOnClick = () => {
    if (typeof onClick === 'function') {
      const newJoin: JoinOrder = {
        key: uuidv4(),
        type: createJoin.current.type,
        order: createJoin.current.order,
        price: createJoin.current.price,
      }
      onClick(newJoin)
    }
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
    <div
      className={clsx('border p-2', 'border-black dark:border-white', {
        [wrapperClassNames]: !!wrapperClassNames,
      })}
    >
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
      </FormItem>

      {!noMaxMode && (
        <FormItem {...formItemProps} label="Số lượng:" subLabel="đơn">
          <InputNumber
            min={0}
            initValue={0}
            onChangeInput={onChangeCreateOrder}
            resetCount={resetCountOrder}
            isCounterMobile={true}
            // with `noMaxMode`
            {...(!noMaxMode ? { max } : {})}
          />
          {!noMaxMode && <MaxLabel max={max} />}
        </FormItem>
      )}

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
            initValue={JOIN_DEFAULT['price']}
            onChangeInput={onChangeCreatePrice}
            disabled={isHappyJoin}
          />
        )}
      </FormItem>
      {/* Meta zone */}
      <FormItem {...formItemProps} label="">
        <button
          className="stardust-button-reset stardust-button stardust-button--primary"
          onClick={handleOnClick}
          disabled={addBtnDisabled}
        >
          Thêm
        </button>{' '}
        {typeof onCancel === 'function' ? (
          <button
            className="stardust-button-reset stardust-button stardust-button--secondary"
            onClick={onCancel}
          >
            Hủy
          </button>
        ) : null}
      </FormItem>
    </div>
  )
}

export default memo(AddJoin)
