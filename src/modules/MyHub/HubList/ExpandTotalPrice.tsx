import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as CaretIcon } from 'assets/icons/caret-down.svg'
import Switch from 'components/Switch'
import {
  isExpandAllHubSelector,
  isExpandExtraChildJoinOrderSelector,
  isExpandWeekRewardSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import InfoModal from './InfoModal'

const Switches = () => {
  const dispatch = useDispatch()

  const isExpandAllHub = useSelector(isExpandAllHubSelector)
  const isExtraChildJoinOrder = useSelector(isExpandExtraChildJoinOrderSelector)
  const isExpandWeekReward = useSelector(isExpandWeekRewardSelector)

  const expandData = useMemo(
    () => ({
      allHub: isExpandAllHub,
      childJoinOrder: isExtraChildJoinOrder,
      weekReward: isExpandWeekReward,
    }),
    [isExpandAllHub, isExtraChildJoinOrder, isExpandWeekReward],
  )

  const expandAllHub = useCallback((isChecked: boolean) => {
    if (isChecked) dispatch(actions.showIsExpandAllHub())
    else dispatch(actions.hideIsExpandAllHub())
  }, [])

  const expandExtraChildJoinOrder = useCallback((isChecked: boolean) => {
    if (isChecked) dispatch(actions.showIsExtraChildJoinOrder())
    else dispatch(actions.hideIsExtraChildJoinOrder())
  }, [])

  const expandWeekReward = useCallback((isChecked: boolean) => {
    if (isChecked) dispatch(actions.showIsExpandWeekReward())
    else dispatch(actions.hideIsExpandWeekReward())
  }, [])

  return (
    <>
      <div className="mb-2 last:mb-0">
        <Switch
          text="Ẩn/hiện tất cả thống kê"
          onChangeChecked={expandAllHub}
          checked={expandData.allHub}
        />
      </div>
      <div className="mb-2 last:mb-0">
        <Switch
          text="Thưởng tuần"
          onChangeChecked={expandWeekReward}
          checked={expandData.weekReward}
        />
      </div>
      <div className="mb-2 last:mb-0">
        <Switch
          text="Thu nhập tăng/giảm do đơn ghép"
          onChangeChecked={expandExtraChildJoinOrder}
          checked={expandData.childJoinOrder}
        />
      </div>
    </>
  )
}

const ExpandTotalPrice = () => {
  const [toggleSetting, setToggleSetting] = useState(false)

  return (
    <div
      className={clsx(
        'button-group',
        'flex items-stretch flex-wrap',
        'no-margin-x',
      )}
    >
      <button
        className={clsx(
          'flex items-center',
          'stardust-button-reset stardust-button',
          'stardust-button--secondary',
          {
            '!border-b-transparent': toggleSetting,
          },
        )}
        onClick={() => setToggleSetting(!toggleSetting)}
      >
        <span className="mr-2">Tùy chọn</span>
        <CaretIcon
          width={14}
          height={14}
          className={clsx('transform', {
            'rotate-180': toggleSetting,
          })}
          fill="var(--spf-textPrimary)"
        />
      </button>

      <InfoModal />

      {toggleSetting && (
        <div
          className={clsx(
            'p-2 w-full',
            'border-line',
            'dark:bg-slate-800 dark:shadow-none bg-white',
          )}
          style={{
            marginTop: '-1px',
            padding: '8px 10px',
          }}
        >
          <Switches />
        </div>
      )}
    </div>
  )
}

export default ExpandTotalPrice
