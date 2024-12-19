import React from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppDispatch } from 'configStore'
import { FORM_ACTION } from 'modules/Form/types'
import {
  hubShiftSelector,
  isLoadingSelector,
  isCalModeSelector,
  isOpenPreviewSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import * as thunk from 'modules/Form/slices/asyncThunk'

import FormItem from 'components/FormItem'

import { ReactComponent as RightToBracket } from 'assets/icons/right-to-bracket.svg'

interface Props {
  type?: FORM_ACTION
  hubId?: string
}

const Meta = ({ type = FORM_ACTION.ADD, hubId = '' }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()

  const hubShift = useSelector(hubShiftSelector)
  const isLoading = useSelector(isLoadingSelector)
  const isCalMode = useSelector(isCalModeSelector)
  const isOpenPreview = useSelector(isOpenPreviewSelector)

  const disabled = !hubShift || isLoading

  const toggle = () => {
    dispatch(actions.toggleIsOpenPreview())
  }

  const modify = () => {
    dispatch(thunk.modifyHub({ type, hubId }))
  }

  const onCancel = () => {
    history.goBack()
  }

  return (
    <FormItem label="">
      <div className="md:flex md:items-center w-full">
        {!isCalMode && (
          <button
            className="stardust-button-reset stardust-button stardust-button--primary stardust-button--wide w-full md:w-auto"
            disabled={disabled}
            onClick={modify}
          >
            {type === FORM_ACTION.ADD ? 'thêm ca' : 'cập nhật ca'}
          </button>
        )}
        <button
          className="stardust-button-reset stardust-button stardust-button--secondary stardust-button--wide mt-1 md:mt-0 md:ml-2 w-full md:w-auto"
          onClick={onCancel}
        >
          {isCalMode ? 'trở về' : 'hủy'}
        </button>
        <button
          className={clsx(
            'stardust-button-reset stardust-button stardust-button--primary stardust-button--wide',
            'mt-4 md:mt-0 w-full md:w-auto md:ml-auto',
            'flex items-center text-center justify-center',
          )}
          onClick={toggle}
        >
          <span className="mr-2">
            {isOpenPreview ? 'Ẩn thống kê' : 'Hiện thống kê'}
          </span>
          <RightToBracket
            fill="#fff"
            width={16}
            height={16}
            className={clsx('transform', {
              'rotate-180': isOpenPreview,
            })}
          />
        </button>
      </div>
    </FormItem>
  )
}

export default Meta
