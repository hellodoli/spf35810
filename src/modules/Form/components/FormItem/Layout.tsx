import React from 'react'
import clsx from 'clsx'
import type { ItemLayout } from './type'

interface Props extends ItemLayout {
  children: React.ReactNode
}

const applyPxStyleValue = (styleValue: string | number) => {
  const style = typeof styleValue === 'string' ? styleValue : `${styleValue}px`
  return style
}

const Layout = ({
  label = '',
  mt = '',
  pb = 30,
  pl = 20,
  labelWidth = '20%',
  contentWidth = 'auto',
  subLabelWidth = 'auto',
  isWrapLabel = true,
  subLabel = '',
  children,
  center = false,
  className = '',
}: Props) => {
  return (
    <div
      className={clsx('md:flex', 'first:mt-0', {
        'md:items-center': center,
        'mt-4': mt === '',
        [className]: !!className,
      })}
      style={{
        ...(mt !== '' && { marginTop: applyPxStyleValue(mt) }),
      }}
    >
      <div
        className={clsx(
          `overflow-hidden md:text-right`,
          // default mobile
          'pb-1',
          `md:pb-[${applyPxStyleValue(pb)}]`,
          `max-[575px]:!w-auto`,
          {
            'whitespace-nowrap': isWrapLabel,
          },
        )}
        style={{
          color: 'rgba(85,85,85,0.8)',
          width: applyPxStyleValue(labelWidth),
        }}
      >
        {label}
      </div>

      <div
        className={clsx(
          'flex-1 box-border',
          'pl-0', // default mobile
          `md:pl-[${applyPxStyleValue(pl)}]`,
          `md:pb-[${applyPxStyleValue(pb)}]`,
        )}
        style={{
          width: contentWidth,
        }}
      >
        {children}
      </div>

      {!!subLabel && (
        <div
          className={clsx(
            'flex-none overflow-hidden whitespace-nowrap',
            'md:pl-[20px]',
            'hidden md:flex',
          )}
          style={{
            color: 'rgba(85,85,85,0.8)',
            width: subLabelWidth,
          }}
        >
          {subLabel}
        </div>
      )}
    </div>
  )
}

export default Layout
