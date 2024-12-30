import React from 'react'
import clsx from 'clsx'

import { useMaxJoinOrderPreview } from 'modules/Form/hooks/useMaxJoinOrderPreview'
import type { JoinOrder } from 'modules/Form/types'
import { getFormat } from 'utils/price'

interface Props {
  join: JoinOrder
  onClickJoin?: (join: JoinOrder) => void
  isDisabledOnClick?: boolean
  isViewMode?: boolean
  hasDelete?: boolean
  onDelete?: (id: string) => void
  noMargin?: boolean
}

const QuickAddJoinBtn = ({
  join,
  onClickJoin,
  onDelete,
  isDisabledOnClick = false,
  isViewMode = false,
  hasDelete = false,
  noMargin = false,
}: Props) => {
  const f = getFormat()
  const { max } = useMaxJoinOrderPreview(join.type)
  const disabled = !isViewMode && max === 0

  const handleOnClick = () => {
    if (!isDisabledOnClick && typeof onClickJoin === 'function')
      onClickJoin(join)
  }

  const handleDelete = () => {
    if (typeof onDelete === 'function') onDelete(join.key)
  }

  return (
    <button
      className={clsx(
        'flex items-center justify-center stardust-button-reset stardust-button stardust-button--primary whitespace-nowrap',
        {
          'mr-1 last:mr-0': !noMargin,
        },
      )}
      disabled={disabled}
      onClick={handleOnClick}
    >
      <span>{`+ Ghép ${join.type}: ${f(join.price)}`}</span>
      {hasDelete && (
        <span
          className={clsx(
            'delete-button',
            'rounded-full w-[16px] h-[16px] p-0',
            'flex items-center justify-center',
            'cursor-pointer border-line text-xs select-none',
            'ml-2',
            {
              'lg:ml-auto': !isViewMode,
              'always-visible': isViewMode,
            },
          )}
          onClick={handleDelete}
        >
          x
        </span>
      )}
    </button>
  )
}

export default QuickAddJoinBtn
