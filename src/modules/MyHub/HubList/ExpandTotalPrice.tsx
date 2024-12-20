import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as CaretIcon } from 'assets/icons/caret-down.svg'
import Switch from 'components/Switch'
import {
  isExpandAllHubListSummarySelector,
  isExtraChildJoinOrderSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

const Switches = () => {
  const dispatch = useDispatch()

  const isExpandAllHubListSummary = useSelector(
    isExpandAllHubListSummarySelector,
  )
  const isExtraChildJoinOrder = useSelector(isExtraChildJoinOrderSelector)

  const onChangeCheckedShowHideDetail = useCallback((isChecked: boolean) => {
    if (isChecked) dispatch(actions.showIsExpandAllHubListSummary())
    else dispatch(actions.hideIsExpandAllHubListSummary())
  }, [])

  const onChangeCheckedShowHideExtraChildJoinOrder = useCallback(
    (isChecked: boolean) => {
      if (isChecked) dispatch(actions.showIsExtraChildJoinOrder())
      else dispatch(actions.hideIsExtraChildJoinOrder())
    },
    [],
  )

  return (
    <>
      <div className="mb-2 last:mb-0">
        <Switch
          text="Ẩn/hiện tất cả thống kê"
          onChangeChecked={onChangeCheckedShowHideDetail}
          checked={isExpandAllHubListSummary}
        />
      </div>
      <div className="mb-2 last:mb-0">
        <Switch
          text="Thu nhập tăng giảm do đơn ghép"
          onChangeChecked={onChangeCheckedShowHideExtraChildJoinOrder}
          checked={isExtraChildJoinOrder}
        />
      </div>
    </>
  )
}

const ExpandOtherSetting = () => {
  const [toggleSetting, setToggleSetting] = useState(false)

  return (
    <>
      <button
        className={clsx(
          'flex items-center',
          'stardust-button-reset stardust-button',
          {
            '!border-b-transparent': toggleSetting,
          },
        )}
        onClick={() => setToggleSetting(!toggleSetting)}
        style={{
          background: toggleSetting ? 'var(--nc-primary-bg)' : '#fff',
        }}
      >
        <span className="mr-2">Tùy chọn</span>
        <CaretIcon
          width={14}
          height={14}
          className={clsx('transform', {
            'rotate-180': toggleSetting,
          })}
        />
      </button>
      {toggleSetting && (
        <div
          className={clsx('p-2 w-full', 'border-line')}
          style={{
            marginTop: '-1px',
            padding: '8px 10px',
            borderColor: 'var(--nc-util-disabled)',
            background: 'var(--nc-primary-bg)',
          }}
        >
          <Switches />
        </div>
      )}
    </>
  )
}

const ExpandTotalPrice = () => {
  return (
    <div className="button-group flex items-stretch flex-wrap no-margin-x">
      <ExpandOtherSetting />
    </div>
  )
}

export default ExpandTotalPrice
