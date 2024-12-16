import React, { useState, useEffect, memo } from 'react'

import './style.scss'

interface SwitchOnlyProps {
  onChangeChecked?: (isChecked: boolean) => void
  checked?: boolean
  disabled?: boolean
}

interface SwitchProps extends SwitchOnlyProps {
  text?: string
}

const SwitchOnly = ({
  onChangeChecked,
  disabled = false,
  checked = false,
}: SwitchOnlyProps) => {
  const defaultChecked = checked ? checked : false
  const [isChecked, setIsChecked] = useState(defaultChecked)

  useEffect(() => {
    onChangeChecked?.(isChecked)
  }, [isChecked])

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((checked) => !checked)}
        disabled={disabled}
      />
      <span className="slider round" />
    </label>
  )
}

const Switch = (props: SwitchProps) => {
  const { text, ...rest } = props

  const renderSwitch = () => {
    return <SwitchOnly {...rest} />
  }

  if (text) {
    return (
      <div className="flex items-center justify-between w-full">
        <span>{text}</span>
        {renderSwitch()}
      </div>
    )
  }
  return renderSwitch()
}

export default memo(Switch)
