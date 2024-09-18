import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { isOpenPreviewSelector } from 'modules/Form/selectors'

interface Props {
  children: React.ReactNode
  isOpen?: boolean
}

const PreviewContainer = ({ children }: Props) => {
  const isOpen = useSelector(isOpenPreviewSelector)
  if (!isOpen) return null
  return (
    <div
      className={clsx('flex-[0_0_auto] overflow-hidden', {
        'w-full lg:w-[40%]': isOpen,
        'w-0': !isOpen,
      })}
    >
      {children}
    </div>
  )
}

export default PreviewContainer
