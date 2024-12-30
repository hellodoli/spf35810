import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FormItem from 'components/FormItem'
import { InputNumber } from 'components/Input'
import { useSettings } from 'modules/Form/hooks/useSettings'
import { orderSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { FORM_ACTION } from 'modules/Form/types/enum'

interface Props {
  type?: FORM_ACTION
}

const Order = ({ type = FORM_ACTION.ADD }: Props) => {
  const dispatch = useDispatch()
  const order = useSelector(orderSelector)
  const { settings: ST } = useSettings()

  const initValue = useMemo(() => {
    return type === FORM_ACTION.ADD ? ST.ORDER_QUANTITY.INIT : order
  }, [type, ST.ORDER_QUANTITY.INIT])

  const onChangeOrder = useCallback((order: number) => {
    dispatch(actions.changeOrder({ order }))
  }, [])

  return (
    <FormItem
      label="Số đơn trong ca:"
      className={`form-type-${type.toLowerCase()}`}
      center={true}
    >
      <InputNumber
        min={ST.ORDER_QUANTITY.MIN}
        max={ST.ORDER_QUANTITY.MAX}
        initValue={initValue}
        onChangeInput={onChangeOrder}
        isCounterMobile={true}
      />
    </FormItem>
  )
}

export default Order
