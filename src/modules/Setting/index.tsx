import React, { memo, useCallback, useState } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions } from 'modules/Form/slices'
import { routes } from 'utils/route-path'

import { Settings } from 'modules/Form/types'
import { locateSettingSelector } from 'modules/Form/selectors'
import FormItem from 'modules/Form/components/FormItem'

interface LocateBtnItem {
  id: string
  text: string
  value: Settings['LOCATE']
}

const Button = ({
  isActive = false,
  disabled = false,
  text = '',
  value = 'TPHCM',
  onChangeLocate,
}: {
  text?: string
  isActive?: boolean
  disabled?: boolean
  value?: Settings['LOCATE']
  onChangeLocate: (value: Settings['LOCATE']) => void
}) => {
  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
        {
          'stardust-button--active': isActive,
        },
      )}
      onClick={() => onChangeLocate(value)}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
const ChooseHubBtn = memo(Button)

const locateText = 'locate'
const locates: LocateBtnItem[] = [
  { id: `${locateText}-1`, text: 'TPHCM', value: 'TPHCM' },
  { id: `${locateText}-2`, text: 'Hà Nội', value: 'HANOI' },
]

const Setting = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const curLocate = useSelector(locateSettingSelector)
  const [initInfo, setInitInfo] = useState({
    locate: curLocate,
    isDirty: false,
  })

  const isDisabled = curLocate === initInfo.locate

  const onChangeLocate = useCallback((locate: Settings['LOCATE']) => {
    setInitInfo((state) => ({
      ...state,
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
        locate: initInfo.locate,
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
                  isActive={value === initInfo.locate}
                  onChangeLocate={onChangeLocate}
                />
              )
            })}
          </div>
        </FormItem>

        <FormItem label="">
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
