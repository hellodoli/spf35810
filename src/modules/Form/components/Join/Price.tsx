import React, { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSettings } from 'modules/Form/hooks/useSettings'
import { orderPriceDefaultSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { JoinOrder } from 'modules/Form/types/join'

import { InputNumber } from '../Input'

interface Props {
  joinId: string
  joinType: JoinOrder['type']
  initValue: number
}

/**
 * LATER: chế độ đơn ghép trả tiền đầy đủ
 */
const isHappyJoin = false

const Price = ({ joinId, joinType, initValue }: Props) => {
  const dispatch = useDispatch()
  const orderPrice = useSelector(orderPriceDefaultSelector)

  const { settings: ST } = useSettings()
  const fixedPrice = orderPrice * joinType

  const onChangeInput = useCallback(
    (price: number) => {
      dispatch(
        actions.setJoin({
          joinId,
          updateKey: 'price',
          value: price,
        }),
      )
    },
    [joinId],
  )

  useEffect(() => {
    if (isHappyJoin) onChangeInput(fixedPrice)
  }, [isHappyJoin, onChangeInput, fixedPrice])

  return (
    <>
      {isHappyJoin ? (
        <div className="filter-none outline-none p-[12px] flex-[1_0_0%] border-none bg-none">
          {fixedPrice}
        </div>
      ) : (
        <InputNumber
          min={ST.ORDER_PRICE.MIN}
          max={ST.ORDER_PRICE.MAX}
          step={ST.ORDER_PRICE.STEP}
          initValue={initValue}
          onChangeInput={onChangeInput}
          disabled={isHappyJoin}
        />
      )}
    </>
  )
}

export default memo(Price)
