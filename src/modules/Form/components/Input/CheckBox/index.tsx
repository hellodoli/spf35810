import React, { useState, useEffect } from 'react'
import XCheckMark from './XCheckMark'

const CheckBox = ({
  label = '',
  checked = false,
  onChangeChecked,
}: {
  label?: string
  checked?: boolean
  onChangeChecked?: (isChecked: boolean) => void
}) => {
  const defaultChecked = checked ? checked : false
  const [isChecked, setIsChecked] = useState(defaultChecked)

  useEffect(() => {
    onChangeChecked?.(isChecked)
  }, [isChecked])

  return (
    <div className="flex flex-wrap justify-start items-start">
      <label
        className="overflow-hidden flex items-start cursor-pointer select-none py-1"
        style={{
          color: 'rgba(0,0,0,.8)',
          fontSize: '.875rem',
        }}
      >
        <div
          className="relative"
          style={{
            marginTop: '.0625rem',
            marginRight: '.625rem',
          }}
        >
          <input
            type="checkbox"
            className="flex items-center justify-center shrink-0 appearance-none box-border cursor-pointer m-0 text-center select-none"
            style={{
              height: '.8125rem',
              width: '.8125rem',
              lineHeight: '.6875rem',
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,.26)',
              borderRadius: 2,
              boxShadow: 'inset 0 1px 0 0 rgba(0,0,0,.05)',
            }}
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
          />
          {isChecked && <XCheckMark />}
        </div>
        <span className="overflow-hidden text-ellipsis break-words line-clamp-3 leading-4 max-h-12">
          {label}
        </span>
      </label>
    </div>
  )
}

export default CheckBox
