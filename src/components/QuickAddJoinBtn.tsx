import React from 'react'

import { useMaxJoinOrderPreview } from 'modules/Form/hooks/useMaxJoinOrderPreview'
import type { JoinOrder } from 'modules/Form/types'
import { getFormat } from 'utils/price'

interface Props {
  join: JoinOrder
  onClickJoin?: (join: JoinOrder) => void
  isDisabledOnClick?: boolean
  isViewMode?: boolean
}

const QuickAddJoinBtn = ({
  join,
  onClickJoin,
  isDisabledOnClick = false,
  isViewMode = false,
}: Props) => {
  const f = getFormat()
  const { max } = useMaxJoinOrderPreview(join.type)
  const disabled = !isViewMode && max === 0

  const onClick = () => {
    if (!isDisabledOnClick && onClickJoin) onClickJoin(join)
  }
  return (
    <button
      className="stardust-button-reset stardust-button stardust-button--primary mr-1"
      disabled={disabled}
      onClick={onClick}
    >
      {`+ Ghép ${join.type}: ${f(join.price)}`}
    </button>
  )
}

export default QuickAddJoinBtn
