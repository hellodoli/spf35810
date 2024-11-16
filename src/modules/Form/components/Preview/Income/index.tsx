import React, { memo, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { IncomeSetting } from 'modules/Form/types'
import { joinsSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

import { ReactComponent as SettingIcon } from 'assets/icons/sliders.svg'
import { ReactComponent as CaretIcon } from 'assets/icons/caret-down.svg'

import { CheckBox } from 'modules/Form/components/Input'
import SingleOrder from './SingleOrder'
import JoinOrder from './JoinOrder'
import { ExtraJoinOrderPrice, ExtraOrderPrice, ExtraContainer } from './Extra'
import Total from './Total'
import JoinsPay from './JoinsPay'

interface CheckBoxSetting {
  id: number
  label: string
  defaultValue: boolean
  settingKey: keyof IncomeSetting
}

const checkBoxSettingList: CheckBoxSetting[] = [
  {
    id: 1,
    label: 'Thu nhập đơn ghép vượt mốc',
    defaultValue: true,
    settingKey: 'SHOW_EXTRA_JOIN_ORDER_PRICE',
  },
  {
    id: 2,
    label: 'Thu nhập tăng/giảm do đơn ghép',
    defaultValue: true,
    settingKey: 'SHOW_INCOME_DROP_BY_JOIN_ORDER',
  },
  {
    id: 3,
    label: 'Chi tiết với số đơn',
    defaultValue: true,
    settingKey: 'SHOW_DETAIL_WITH_ORDER',
  },
]

const iconStyle = {
  fill: 'var(--nc-primary)',
  width: 14,
  height: 14,
}

const Income = () => {
  const dispatch = useDispatch()
  const joins = useSelector(joinsSelector)
  const [toggleSetting, setToggleSetting] = useState(false)

  const onChangeChecked = useCallback(
    (key: keyof IncomeSetting, isChecked: boolean) => {
      dispatch(
        actions.changeIncomeSetting({
          key,
          setting: isChecked,
        }),
      )
    },
    [],
  )

  return (
    <div className="order-preview text-base p-2">
      <div className="p-2 border-line">
        <div className="flex items-center justify-between">
          <span className="text-2xl">💰💰💰</span>
          <button
            className="flex items-center stardust-button-reset stardust-button stardust-button--ghost"
            onClick={() => setToggleSetting(!toggleSetting)}
          >
            <SettingIcon {...iconStyle} className="mr-1" />
            <CaretIcon
              {...iconStyle}
              className={clsx('transform', {
                'rotate-180': toggleSetting,
              })}
            />
          </button>
        </div>
        {toggleSetting && (
          <div className="flex items-center gap-3 flex-wrap mt-3">
            {checkBoxSettingList.map(
              ({ id, label, defaultValue, settingKey }) => {
                return (
                  <CheckBox
                    key={id}
                    label={label}
                    checked={defaultValue}
                    onChangeChecked={(isChecked) =>
                      onChangeChecked(settingKey, isChecked)
                    }
                  />
                )
              },
            )}
          </div>
        )}
      </div>

      <Total />

      <ul className="p-2 border-line -mt-[1px]">
        {/* Thu nhập đơn lẻ */}
        <SingleOrder />
        {/* Thu nhập đơn ghép */}
        <JoinOrder joins={joins} />
      </ul>

      <ExtraContainer>
        <ExtraOrderPrice />
        <ExtraJoinOrderPrice />
      </ExtraContainer>

      <JoinsPay />
    </div>
  )
}

export default memo(Income)
