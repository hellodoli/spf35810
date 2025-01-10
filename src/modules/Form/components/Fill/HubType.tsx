import React, { memo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import FormItem from 'components/FormItem'
import { hubTypeSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { FORM_ACTION, HUB_TYPE } from 'modules/Form/types'

interface Props {
  type?: FORM_ACTION
}

interface HubBtnItem {
  id: string
  text: string
  type: HUB_TYPE
}

const Button = ({
  isHubTypeActive = false,
  changeHubType,
  disabled = false,
  text = '',
  hubType,
}: {
  text?: string
  hubType: HUB_TYPE
  isHubTypeActive?: boolean
  changeHubType: (hubType: HUB_TYPE) => void
  disabled?: boolean
}) => {
  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary',
        {
          'stardust-button--active': isHubTypeActive,
        },
      )}
      onClick={() => changeHubType(hubType)}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

const ChooseHubBtn = memo(Button)

const HubType = ({ type = FORM_ACTION.ADD }: Props) => {
  const dispatch = useDispatch()
  const activeHubType = useSelector(hubTypeSelector)
  const [items] = useState<HubBtnItem[]>([
    {
      id: 'hub_1',
      text: 'Hub 1',
      type: HUB_TYPE.HUB_1,
    },
    {
      id: 'hub_3',
      text: 'Hub 3',
      type: HUB_TYPE.HUB_3,
    },
    {
      id: 'hub_5',
      text: 'Hub 5',
      type: HUB_TYPE.HUB_5,
    },
    {
      id: 'hub_8',
      text: 'Hub 8',
      type: HUB_TYPE.HUB_8,
    },
    {
      id: 'hub_10',
      text: 'Hub 10',
      type: HUB_TYPE.HUB_10,
    },
  ])
  const changeHubType = useCallback((hubType: HUB_TYPE) => {
    dispatch(
      actions.changeHubType({
        hubType,
      }),
    )
  }, [])
  return (
    <FormItem label="Loại Hub:" center={true}>
      <div className={`hub-type-list ${type} flex flex-wrap gap-2`}>
        {items.map((hub) => {
          return (
            <ChooseHubBtn
              key={hub.id}
              isHubTypeActive={hub.type === activeHubType}
              changeHubType={changeHubType}
              disabled={type === FORM_ACTION.EDIT}
              hubType={hub.type}
              text={hub.text}
            />
          )
        })}
      </div>
    </FormItem>
  )
}

export default HubType
