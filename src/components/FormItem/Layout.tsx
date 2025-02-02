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
      className={clsx('lg:flex first:mt-0', {
        'lg:items-center': center,
        'mt-4': mt === '',
        [className]: !!className,
      })}
      style={{
        ...(mt !== '' && { marginTop: applyPxStyleValue(mt) }),
      }}
    >
      <div
        className={clsx(
          'prose-spf prose-slate dark:prose-dark',
          'overflow-hidden lg:text-right',
          // default mobile
          'pb-1',
          `lg:pb-[${applyPxStyleValue(pb)}]`,
          `max-[575px]:!w-auto`,
          {
            'whitespace-nowrap': isWrapLabel,
          },
        )}
        style={{
          width: applyPxStyleValue(labelWidth),
        }}
      >
        {label}
      </div>

      <div
        className={clsx(
          'flex-1 box-border',
          'pl-0', // default mobile
          `lg:pl-[${applyPxStyleValue(pl)}]`,
          `lg:pb-[${applyPxStyleValue(pb)}]`,
        )}
        style={{
          color: 'var(--nc-text-primary)',
          width: contentWidth,
        }}
      >
        {children}
      </div>

      {!!subLabel && (
        <div
          className={clsx(
            'prose-spf prose-slate dark:prose-dark',
            'flex-none overflow-hidden whitespace-nowrap',
            'lg:pl-[20px]',
            'hidden lg:flex',
          )}
          style={{
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
