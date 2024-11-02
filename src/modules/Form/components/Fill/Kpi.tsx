import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'modules/Form/slices'
import { isHubWellDoneSelector } from 'modules/Form/selectors'
import FormItem from 'modules/Form/components/FormItem'

const Kpi = () => {
  const dispatch = useDispatch()
  const isHubIsDone = useSelector(isHubWellDoneSelector)

  const onChangeIsHubWellDone = (isHubWellDone: boolean) => {
    dispatch(
      actions.changeIsHubWellDone({
        isHubWellDone,
      }),
    )
  }

  return (
    <FormItem label="Hiệu suất ca HUB:" center={true}>
      <div className={`flex flex-wrap gap-2`}>
        <button
          className={clsx(
            'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
          )}
          style={{
            color: isHubIsDone ? 'var(--nc-success)' : '',
            borderColor: isHubIsDone ? 'var(--nc-success)' : '',
          }}
          onClick={() => onChangeIsHubWellDone(true)}
        >
          Đạt
        </button>
        <button
          className={clsx(
            'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
          )}
          style={{
            color: !isHubIsDone ? 'var(--nc-error)' : '',
            borderColor: !isHubIsDone ? 'var(--nc-error)' : '',
          }}
          onClick={() => onChangeIsHubWellDone(false)}
        >
          Không Đạt
        </button>
      </div>
    </FormItem>
  )
}

export default Kpi
