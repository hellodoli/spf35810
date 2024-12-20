import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { displayMyHubTypeSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { HUB_DISPLAY } from 'modules/Form/types'

const buttons = [
  { id: 1, text: '3 ngày gần nhất', value: HUB_DISPLAY.D_3DAYS },
  { id: 2, text: 'Hôm nay', value: HUB_DISPLAY.D_TODAY },
  { id: 3, text: 'Tuần trước', value: HUB_DISPLAY.D_PREV_WEEK },
  { id: 4, text: 'Tuần này', value: HUB_DISPLAY.D_WEEK },
  { id: 5, text: 'Tháng này', value: HUB_DISPLAY.D_MONTH },
  { id: 6, text: 'Tháng trước', value: HUB_DISPLAY.D_PREV_MONTH },
  { id: 7, text: 'Tùy chỉnh...', value: HUB_DISPLAY.D_CUSTOM },
]

const Buttons = () => {
  const dispatch = useDispatch()
  const displayMyHubType = useSelector(displayMyHubTypeSelector)
  const onClick = useCallback((type: HUB_DISPLAY) => {
    dispatch(
      actions.changeDisplayMyHubType({
        type,
      }),
    )
  }, [])
  return (
    <div className="button-group no-margin-x has-border-x">
      {buttons.map((button) => {
        const hubDisplay = button.value
        const active = displayMyHubType === hubDisplay
        return (
          <button
            key={button.id}
            className={clsx(
              'stardust-button-reset stardust-button stardust-button--secondary',
              // '-ml-[1px] first:ml-0',
              'whitespace-nowrap',
            )}
            style={{
              backgroundColor: active ? 'var(--nc-primary)' : '#fff',
              borderColor: active ? 'transparent' : 'var(--nc-util-line)',
              color: active ? '#fff' : '#555',
            }}
            onClick={() => onClick(hubDisplay)}
          >
            {button.text}
          </button>
        )
      })}
    </div>
  )
}

export default Buttons
