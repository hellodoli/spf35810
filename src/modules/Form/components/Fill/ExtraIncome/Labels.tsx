import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { quickExtraIncomeLabelsSelector } from 'modules/Form/selectors'
import { ExtraIncomeLabel } from 'modules/Form/types'

interface Props {
  onChangeLabelId?: (label?: ExtraIncomeLabel) => void
}

const getDefaultLabelId = (labels: ExtraIncomeLabel[]) => {
  return labels.find((label) => label.text === 'Tiền thừa khách cho')?.id || ''
}

const Labels = ({ onChangeLabelId }: Props) => {
  const labels = useSelector(quickExtraIncomeLabelsSelector)
  const [activeId, setActiveId] = useState(() => getDefaultLabelId(labels))
  const labelActive = useMemo(
    () => labels.find((label) => label.id === activeId),
    [activeId],
  )

  useEffect(() => {
    onChangeLabelId?.(labelActive)
  }, [labelActive])

  return (
    <div className={clsx('flex items-center flex-wrap gap-1', 'min-h-[30px]')}>
      {labels.map((label) => {
        return (
          <button
            key={label.id}
            className="stardust-button-reset stardust-button stardust-button--secondary"
            style={{
              color: activeId === label.id ? label.color : '',
              borderColor: activeId === label.id ? label.color : '',
            }}
            onClick={() => setActiveId(label.id)}
          >
            {label.text}
          </button>
        )
      })}
    </div>
  )
}

export default Labels
