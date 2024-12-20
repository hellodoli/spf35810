import React, { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as CaretIcon } from 'assets/icons/caret-down.svg'
import { ReactComponent as SettingIcon } from 'assets/icons/sliders.svg'
import { CheckBox } from 'modules/Form/components/Input'
import {
  isShowDetailWithOrderSelector,
  isShowExtraJoinOrderPriceSelector,
  isShowIncomeDropByJoinOrderSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { IncomeSetting } from 'modules/Form/types'
import Main from './Main'
interface CheckBoxSetting {
  id: string
  label: string
  defaultValue: boolean
  settingKey: keyof IncomeSetting
}

const iconStyle = {
  fill: 'var(--nc-primary)',
  width: 14,
  height: 14,
}

const Income = () => {
  const dispatch = useDispatch()
  const isShowDetailWithOrder = useSelector(isShowDetailWithOrderSelector)
  const isShowExtraJoinOrderPrice = useSelector(
    isShowExtraJoinOrderPriceSelector,
  )
  const isShowIncomeDropByJoinOrder = useSelector(
    isShowIncomeDropByJoinOrderSelector,
  )
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

  const checkBoxSettingList = useMemo<CheckBoxSetting[]>(() => {
    return [
      {
        id: `INCOME_SETTING__SHOW_EXTRA_JOIN_ORDER_PRICE`,
        label: 'Thu nhập đơn ghép vượt mốc',
        defaultValue: isShowExtraJoinOrderPrice,
        settingKey: 'SHOW_EXTRA_JOIN_ORDER_PRICE',
      },
      {
        id: `INCOME_SETTING__SHOW_INCOME_DROP_BY_JOIN_ORDER`,
        label: 'Thu nhập tăng/giảm do đơn ghép',
        defaultValue: isShowIncomeDropByJoinOrder,
        settingKey: 'SHOW_INCOME_DROP_BY_JOIN_ORDER',
      },
      {
        id: `INCOME_SETTING__SHOW_DETAIL_WITH_ORDER`,
        label: 'Chi tiết với số đơn',
        defaultValue: isShowDetailWithOrder,
        settingKey: 'SHOW_DETAIL_WITH_ORDER',
      },
    ]
  }, [
    isShowDetailWithOrder,
    isShowExtraJoinOrderPrice,
    isShowIncomeDropByJoinOrder,
  ])

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

      <Main />
    </div>
  )
}

export default memo(Income)
