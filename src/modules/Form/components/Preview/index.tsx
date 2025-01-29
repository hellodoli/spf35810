import React, { useCallback, useState } from 'react'

import { CheckBox } from 'components/Input'
import { ELE_CLASSNAMES } from 'modules/Form/constants'
import Income from './Income'
import Order from './Order'

const Preview = () => {
  const [checked, setChecked] = useState({
    order: false,
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
    <div className={`${ELE_CLASSNAMES.HUB_PREVIEW} p-4`}>
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
