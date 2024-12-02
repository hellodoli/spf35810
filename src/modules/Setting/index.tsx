import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions } from 'modules/Form/slices'
import { routes } from 'utils/route-path'

import { SETTING_LOCATE } from 'modules/Form/types'
import { locateSettingSelector } from 'modules/Form/selectors'

import FormItem from 'components/FormItem'
import LocateInfoView, { locatesArr as locates } from './LocateInfoView'
import ChooseHubBtn from './ChooseHubBtn'

const Setting = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const curLocate = useSelector(locateSettingSelector)
  const [info, setInfo] = useState({
    locate: curLocate,
    isDirty: false,
  })

  const isDisabled = curLocate === info.locate

  const onChangeLocate = useCallback((locate: SETTING_LOCATE) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      locate,
      isDirty: true,
    }))
  }, [])

  const onCancel = () => {
    history.push(routes.home)
  }

  const onSave = () => {
    dispatch(
      actions.changeLocateSetting({
        locate: info.locate,
      }),
    )
  }

  return (
    <div className="flex-[0_0_auto] p-4 transition-all w-full">
      <div className="flex flex-col">
        <FormItem label="Vị trí:" center={true}>
          <div className="flex flex-wrap gap-2">
            {locates.map(({ text, id, value }) => {
              return (
                <ChooseHubBtn
                  key={id}
                  text={text}
                  value={value}
                  isActive={value === info.locate}
                  onChangeLocate={onChangeLocate}
                />
              )
            })}
          </div>
        </FormItem>

        <FormItem>
          <em className="link cursor-pointer select-none !no-underline">
            *Tiền thưởng sẽ thay đổi tùy vào khu vực
          </em>
          <div className="link cursor-pointer select-none !no-underline mt-4 mb-1">
            (Tiền thưởng chuyên cần chủ nhật)
          </div>
          <LocateInfoView curLocate={info.locate} />
        </FormItem>

        <FormItem>
          <div className="md:flex md:items-center w-full">
            <button
              className="stardust-button-reset stardust-button stardust-button--primary stardust-button--wide w-full md:w-auto"
              onClick={onSave}
              disabled={isDisabled}
            >
              Lưu thay đổi
            </button>
            <button
              className="stardust-button-reset stardust-button stardust-button--secondary stardust-button--wide mt-1 md:mt-0 md:ml-2 w-full md:w-auto"
              onClick={onCancel}
            >
              Hủy
            </button>
          </div>
        </FormItem>
      </div>
    </div>
  )
}

export default Setting
