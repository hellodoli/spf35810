import React, { useCallback, useState } from 'react'

import { CheckBox } from 'modules/Form/components/Input'
import Order from './Order'
import Income from './Income'

const Preview = () => {
  const [checked, setChecked] = useState({
    order: true,
    income: true,
  })

  const handleChangeChecked = useCallback((key: string, checked: boolean) => {
    setChecked((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }, [])

  const onChangeCheckedOrder = useCallback(
    (checked: boolean) => {
      handleChangeChecked('order', checked)
    },
    [handleChangeChecked],
  )

  const onChangeCheckedIncome = useCallback(
    (checked: boolean) => {
      handleChangeChecked('income', checked)
    },
    [handleChangeChecked],
  )

  return (
    <div className="hub-preview p-4">
      <div className="checkbox-choose-preview p-2">
        <div className="flex items-center gap-3">
          <CheckBox
            label="Thống kê số đơn"
            checked={checked.order}
            onChangeChecked={onChangeCheckedOrder}
          />
          <CheckBox
            label="Thống kê thu nhập"
            checked={checked.income}
            onChangeChecked={onChangeCheckedIncome}
          />
        </div>
      </div>
      {checked.order && <Order />}
      {checked.income && <Income />}
    </div>
  )
}

export default Preview
