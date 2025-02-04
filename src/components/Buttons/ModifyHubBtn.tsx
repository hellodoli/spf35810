import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { AppDispatch } from 'configStore'

import { ReactComponent as FloppyDiskIcon } from 'assets/icons/floppy-disk.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import { hubShiftSelector, isLoadingSelector } from 'modules/Form/selectors'
import * as thunk from 'modules/Form/slices/asyncThunk'
import { FORM_ACTION } from 'modules/Form/types/enum'

const ModifyHubBtn = ({
  formType = FORM_ACTION.ADD,
  hubId = '',
  className = '',
  iconMode = false,
}: {
  formType?: FORM_ACTION
  hubId?: string
  className?: string
  iconMode?: boolean
}) => {
  const dispatch: AppDispatch = useDispatch()

  const hubShift = useSelector(hubShiftSelector)
  const isLoading = useSelector(isLoadingSelector)

  const disabled = !hubShift || isLoading

  const modify = () => {
    dispatch(thunk.modifyHub({ type: formType, hubId }))
  }

  const renderText = () => {
    if (!iconMode)
      return <>{formType === FORM_ACTION.ADD ? 'thêm ca' : 'cập nhật ca'}</>
    return (
      <>
        {formType === FORM_ACTION.ADD ? (
          <PlusIcon fill="#fff" width={16} height={16} />
        ) : (
          <FloppyDiskIcon fill="#fff" width={16} height={16} />
        )}
      </>
    )
  }

  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--primary',
        {
          [className]: !!className,
        },
      )}
      disabled={disabled}
      onClick={modify}
    >
      {renderText()}
    </button>
  )
}

export default ModifyHubBtn
