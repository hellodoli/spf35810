import React, { memo } from 'react'
import clsx from 'clsx'

import { SETTING_LOCATE } from 'modules/Form/types'

const ChooseHubBtn = ({
  isActive = false,
  disabled = false,
  text = '',
  value = SETTING_LOCATE.TPHCM,
  onChangeLocate,
}: {
  text?: string
  isActive?: boolean
  disabled?: boolean
  value?: SETTING_LOCATE
  onChangeLocate: (value: SETTING_LOCATE) => void
}) => {
  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
        {
          'stardust-button--active': isActive,
        },
      )}
      onClick={() => onChangeLocate(value)}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default memo(ChooseHubBtn)
