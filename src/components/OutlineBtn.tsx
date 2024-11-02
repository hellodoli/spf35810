import React, { memo } from 'react'
import clsx from 'clsx'

interface Props {
  text?: string
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
}

const OutlineBtn = ({
  isActive = false,
  disabled = false,
  text = '',
  onClick: onClickProp,
}: Props) => {
  const onClick = () => {
    onClickProp?.()
  }
  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
        {
          'stardust-button--active': isActive,
        },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default memo(OutlineBtn)
