import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { locateSettingSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { SETTING_LOCATE } from 'modules/Form/types'

interface Props {
  locate: SETTING_LOCATE
}

const Meta = ({ locate }: Props) => {
  const history = useHistory()
  const params = useParams<{ settingType: 'locate' | 'order' }>()
  const dispatch = useDispatch()

  const { settingType } = params

  const curLocate = useSelector(locateSettingSelector)

  const isDisabled = settingType === 'locate' ? curLocate === locate : true

  const onCancel = () => {
    history.goBack()
  }

  const onSave = () => {
    dispatch(
      actions.changeLocateSetting({
        locate,
      }),
    )
  }

  return (
    <div className="md:flex md:items-center w-full">
      {settingType !== 'order' ? (
        <button
          className="stardust-button-reset stardust-button stardust-button--primary stardust-button--wide w-full md:w-auto"
          onClick={onSave}
          disabled={isDisabled}
        >
          Lưu thay đổi
        </button>
      ) : null}
      <button
        className="stardust-button-reset stardust-button stardust-button--secondary stardust-button--wide mt-1 md:mt-0 md:ml-2 w-full md:w-auto"
        onClick={onCancel}
      >
        Hủy
      </button>
    </div>
  )
}

export default Meta
