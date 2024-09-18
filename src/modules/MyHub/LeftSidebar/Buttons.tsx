import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { HUB_DISPLAY } from 'modules/Form/types'
import { displayMyHubTypeSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

const buttons = [
  { id: 1, text: '3 ngày gần nhất', value: HUB_DISPLAY.D_3DAYS },
  { id: 2, text: 'Hôm nay', value: HUB_DISPLAY.D_TODAY },
  { id: 3, text: 'Tuần này', value: HUB_DISPLAY.D_WEEK },
  { id: 4, text: 'Tùy chỉnh...', value: HUB_DISPLAY.D_CUSTOM },
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
    <div className="button-group">
      {buttons.map((button) => {
        const active = displayMyHubType === button.value
        return (
          <button
            key={button.id}
            className={clsx(
              'stardust-button-reset stardust-button stardust-button--secondary',
              '-ml-[1px] first:ml-0',
              'whitespace-nowrap',
            )}
            style={{
              backgroundColor: active ? '#ee4d2d' : '#fff',
              borderColor: active ? 'transparent' : 'rgba(0, 0, 0, 0.09)',
              color: active ? '#fff' : '#555',
              flex: 'auto',
            }}
            onClick={() => onClick(button.value)}
          >
            {button.text}
          </button>
        )
      })}
    </div>
  )
}

export default Buttons
