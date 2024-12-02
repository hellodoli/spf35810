import React from 'react'
import clsx from 'clsx'

const ExpandBtn = ({
  isDetail,
  toggleDetail,
  textHide = '(Ẩn)',
  textShow = '(Chi tiết)',
  isMarginLeft = true,
}: {
  isDetail: boolean
  toggleDetail?: () => void
  textHide?: string
  textShow?: string
  isMarginLeft?: boolean
}) => {
  const onClick = () => {
    toggleDetail?.()
  }

  return (
    <span
      className={clsx('link cursor-pointer select-none', {
        'ml-1': isMarginLeft,
      })}
      onClick={onClick}
    >
      {`${isDetail ? textHide : textShow}`}
    </span>
  )
}

export default ExpandBtn
