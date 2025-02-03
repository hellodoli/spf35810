import React, { memo, useEffect, useState } from 'react'

import './style.scss'

interface SwitchOnlyProps {
  onChangeChecked?: (isChecked: boolean) => void
  checked?: boolean
  disabled?: boolean
  isOutsideHandle?: boolean
}

interface SwitchProps extends SwitchOnlyProps {
  text?: string
  labelStyle?: React.CSSProperties
  labelClassName?: string
  children?: React.ReactNode
}

const SwitchOnly = ({
  onChangeChecked,
  disabled = false,
  checked = false,
  isOutsideHandle = false,
}: SwitchOnlyProps) => {
  const [isChecked, setIsChecked] = useState(checked)
  const checkedValue = isOutsideHandle ? checked : isChecked

  const onChange = () => {
    if (!isOutsideHandle) {
      setIsChecked((checked) => !checked)
    } else {
      onChangeChecked?.(!checkedValue)
    }
  }

  useEffect(() => {
    if (!isOutsideHandle) onChangeChecked?.(isChecked)
  }, [isOutsideHandle, isChecked])

  return (
    <label className="switch flex-none">
      <input
        type="checkbox"
        checked={checkedValue}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="slider round" />
    </label>
  )
}

const Switch = (props: SwitchProps) => {
  const { text, labelStyle, labelClassName = '', children, ...rest } = props

  const renderSwitch = () => <SwitchOnly {...rest} />

  if (text || children) {
    const renderLabel = () => {
      if (text)
        return (
          <span style={labelStyle} className={labelClassName}>
            {text}
          </span>
        )
      return children
    }
    return (
      <div className="flex items-center justify-between w-full">
        {renderLabel()}
        {renderSwitch()}
      </div>
    )
  }
  return renderSwitch()
}

export default memo(Switch)
