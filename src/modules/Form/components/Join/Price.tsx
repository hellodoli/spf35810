import React, { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { InputNumber } from 'components/Input'
import { useSettings } from 'modules/Form/hooks/useSettings'
import {
  isHubShortSelector,
  orderPriceDefaultSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { JoinOrder } from 'modules/Form/types/join'

interface Props {
  joinId: string
  joinType: JoinOrder['type']
  initValue: number
  isPlainUI?: boolean
}

/**
 * LATER: chế độ đơn ghép trả tiền đầy đủ
 */
const isHappyJoin = false

const Price = ({ joinId, joinType, initValue, isPlainUI = false }: Props) => {
  const dispatch = useDispatch()
  const isHubShort = useSelector(isHubShortSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)

  const { settings: ST } = useSettings()
  const fixedPrice = orderPrice * joinType
  const isUseFixedPrice = isHappyJoin || isHubShort

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
    if (isUseFixedPrice) onChangeInput(fixedPrice)
  }, [isUseFixedPrice, onChangeInput, fixedPrice])

  return (
    <>
      {isUseFixedPrice && (
        <InputNumber
          min={ST.ORDER_PRICE.MIN}
          max={ST.ORDER_PRICE.MAX}
          step={ST.ORDER_PRICE.STEP}
          initValue={fixedPrice}
          wrapperClassName={isPlainUI ? '!h-8' : ''}
          disabled={true}
        />
      )}
      {!isUseFixedPrice && (
        <InputNumber
          min={ST.ORDER_PRICE.MIN}
          max={ST.ORDER_PRICE.MAX}
          step={ST.ORDER_PRICE.STEP}
          initValue={initValue}
          onChangeInput={onChangeInput}
          wrapperClassName={isPlainUI ? '!h-8' : ''}
        />
      )}
    </>
  )
}

export default memo(Price)
