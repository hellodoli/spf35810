import React, { useEffect, useState, memo, useCallback } from 'react'
import InputWrapper from './InputWrapper'

interface Props {
  min?: number
  max?: number
  initValue?: number
  onChangeInput?: (order: number) => void
  resetCount?: number
  step?: number
  disabled?: boolean
}

const getInitialValue = ({
  initValue,
  min,
  max,
}: {
  min: number
  max: number
  initValue: number
}) => {
  if (initValue < min) return min
  if (initValue > max) return max
  return initValue
}

const getNumberValue = (value: number | string, min: number) => {
  const number = typeof value === 'string' ? min : value
  return number
}

const InputNumber = ({
  min = 0,
  max = 100,
  initValue = 0,
  onChangeInput,
  resetCount = 0,
  step = 1,
  disabled = false,
}: Props) => {
  const [value, setValue] = useState<string | number>(
    getInitialValue({
      initValue,
      min,
      max,
    }),
  )

  const handleChangeValue = useCallback((number: string | number) => {
    setValue(number)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ val: e.target.value })
    const rootValue = e.target.value
    const number = parseInt(rootValue)
    if (!Number.isNaN(number)) {
      // condition: number >= min && number <= max
      handleChangeValue(number)
    } else {
      if (rootValue === '') {
        handleChangeValue('')
      }
    }
  }

  useEffect(() => {
    if (onChangeInput) {
      onChangeInput(getNumberValue(value, min))
    }
  }, [min, value, onChangeInput])

  useEffect(() => {
    if (resetCount > 0) setValue(initValue)
  }, [resetCount, initValue])

  useEffect(() => {
    if (getNumberValue(value, min) > max) {
      handleChangeValue(max)
    }
  }, [value, min, max, handleChangeValue])

  return (
    <InputWrapper>
      <input
        type="number"
        className="filter-none outline-none p-[12px] flex-[1_0_0%] border-none bg-none"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        disabled={disabled}
      />
    </InputWrapper>
  )
}

export default memo(InputNumber)
