import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import clsx from 'clsx'

import { ReactComponent as DownIcon } from 'assets/icons/caret-down.svg'
import { ReactComponent as UpIcon } from 'assets/icons/caret-up.svg'
import InputWrapper from './InputWrapper'
interface Props {
  min?: number
  max?: number
  initValue?: number
  onChangeInput?: (order: number) => void
  resetCount?: number
  step?: number
  disabled?: boolean
  isCounterMobile?: boolean
  wrapperClassName?: string
  inline?: boolean
  activeWhenFocus?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onCount?: () => void
  parentRef?: React.Ref<unknown>
}

const getValue = ({
  value,
  min,
  max,
}: {
  min: number
  max: number
  value: number
}) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

const getNumberValue = (value: number | string, min: number) => {
  const number = typeof value === 'string' ? min : value
  return number
}

const counterBtnStyles = {
  padding: '4px 0',
  border: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}

const counterBtnStyles_Top = {
  borderBottomRightRadius: 0,
}

const counterBtnStyles_Bottom = {
  borderTopRightRadius: 0,
}

const CounterMobile = ({
  setValue,
  min,
  max,
  step,
  onCount: onCountCallback,
}: {
  setValue: React.Dispatch<React.SetStateAction<string | number>>
  min: number
  max: number
  step: number
  onCount?: () => void
}) => {
  const onCount = (type: 'up' | 'down') => {
    onCountCallback?.()
    setValue((value) => {
      const count = getNumberValue(value, min)
      const afterCountValue = type === 'up' ? count + step : count - step
      return getValue({ value: afterCountValue, min, max })
    })
  }
  return (
    <div className="lg:hidden w-6 h-full">
      <div className="w-full h-1/2 flex items-stretch">
        <button
          className={clsx(
            'w-full',
            'stardust-button-reset stardust-button',
            'flex items-center justify-center',
          )}
          style={{ ...counterBtnStyles, ...counterBtnStyles_Top }}
          onClick={() => onCount('up')}
        >
          <UpIcon width={12} height={14} fill="var(--spf-textPrimary)" />
        </button>
      </div>
      <div className="w-full h-1/2 flex items-stretch">
        <button
          className={clsx(
            'w-full',
            'stardust-button-reset stardust-button',
            'flex items-center justify-center',
          )}
          style={{ ...counterBtnStyles, ...counterBtnStyles_Bottom }}
          onClick={() => onCount('down')}
        >
          <DownIcon width={12} height={14} fill="var(--spf-textPrimary)" />
        </button>
      </div>
    </div>
  )
}

const InputNumber = ({
  min = 0,
  max = 100,
  initValue = 0,
  onChangeInput,
  resetCount = 0,
  step = 1,
  disabled = false,
  isCounterMobile = false,
  wrapperClassName = '',
  inline = false,
  activeWhenFocus = false,
  onFocus: onFocusCallback,
  onBlur: onBlurCallback,
  onCount: onCountCallback,
  parentRef,
}: Props) => {
  const inputWrapperProps = {
    className: wrapperClassName,
    inline,
  }

  const [value, setValue] = useState<string | number>(
    getValue({
      value: initValue,
      min,
      max,
    }),
  )
  const [activeFocus, setActiveFocus] = useState(false)

  const handleChangeValue = useCallback((number: string | number) => {
    setValue(number)
  }, [])

  const handleOffActiveFocus = useCallback(() => {
    if (activeWhenFocus) setActiveFocus(false)
  }, [activeWhenFocus])
  const handleOnActiveFocus = useCallback(() => {
    if (activeWhenFocus) setActiveFocus(true)
  }, [activeWhenFocus])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    handleOnActiveFocus()
  }

  const onCount = useCallback(() => {
    handleOnActiveFocus()
    onCountCallback?.()
  }, [handleOnActiveFocus])

  const onFocus = () => {
    handleOnActiveFocus()
    onFocusCallback?.()
  }

  const onBlur = () => {
    onBlurCallback?.()
  }

  useEffect(() => {
    if (onChangeInput) onChangeInput(getNumberValue(value, min))
  }, [min, value, onChangeInput])

  useEffect(() => {
    if (resetCount > 0) {
      setValue(
        getValue({
          min,
          max,
          value: initValue,
        }),
      )
    }
  }, [resetCount, initValue, min, max])

  useEffect(() => {
    const curVal = getNumberValue(value, min)
    if (curVal > max) {
      handleChangeValue(max)
    } else if (curVal < min) {
      handleChangeValue(min)
    }
  }, [value, min, max, handleChangeValue])

  useImperativeHandle(parentRef, () => {
    return {
      handleOffActiveFocus,
      handleOnActiveFocus,
    }
  }, [])

  return (
    <InputWrapper {...inputWrapperProps} activeFocus={activeFocus}>
      <input
        type="number"
        className="filter-none outline-none p-[12px] flex-[1_0_0%] border-none bg-none"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isCounterMobile && (
        <CounterMobile
          setValue={setValue}
          min={min}
          max={max}
          step={step}
          onCount={onCount}
        />
      )}
    </InputWrapper>
  )
}

export default memo(InputNumber)
