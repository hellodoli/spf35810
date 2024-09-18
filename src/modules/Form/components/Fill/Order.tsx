import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'modules/Form/slices'
import { orderSelector } from 'modules/Form/selectors'
import { useSettings } from 'modules/Form/hooks/useSettings'
import { FORM_ACTION } from 'modules/Form/types/enum'

import FormItem from 'modules/Form/components/FormItem'
import { InputNumber } from 'modules/Form/components/Input'

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
      />
    </FormItem>
  )
}

export default Order
