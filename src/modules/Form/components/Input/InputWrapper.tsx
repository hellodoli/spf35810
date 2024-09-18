import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  inline?: boolean
}

const InputWrapper = ({ children, inline = false }: Props) => {
  return (
    <div
      className={clsx('rounded-[2px] box-border overflow-hidden h-[40px]', {
        'flex items-center w-full': !inline,
        'inline-flex items-center': inline,
      })}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.14)',
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 2px 0px inset',
      }}
    >
      {children}
    </div>
  )
}

export default InputWrapper
