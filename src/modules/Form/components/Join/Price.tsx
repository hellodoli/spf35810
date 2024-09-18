import React, { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JoinOrder } from 'modules/Form/types/join'
import {
  orderPriceDefaultSelector,
  isSoldierHubSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { useSettings } from 'modules/Form/hooks/useSettings'

import { InputNumber } from '../Input'

interface Props {
  joinId: string
  joinType: JoinOrder['type']
  initValue: number
}

const Price = ({ joinId, joinType, initValue }: Props) => {
  const dispatch = useDispatch()
  const orderPrice = useSelector(orderPriceDefaultSelector)

  const { settings: ST } = useSettings()
  const soldierHub = useSelector(isSoldierHubSelector)
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
    if (!soldierHub) onChangeInput(fixedPrice)
  }, [soldierHub, onChangeInput, fixedPrice])

  return (
    <>
      {!soldierHub ? (
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
          disabled={!soldierHub}
        />
      )}
    </>
  )
}

export default memo(Price)
