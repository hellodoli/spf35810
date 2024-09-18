import React, { useState, memo, useCallback } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { FORM_ACTION, HUB_TYPE } from 'modules/Form/types'
import { actions } from 'modules/Form/slices'
import { hubTypeSelector } from 'modules/Form/selectors'

import FormItem from 'modules/Form/components/FormItem'

interface Props {
  type?: FORM_ACTION
}

interface HubBtnItem {
  id: string
  text: string
  type: HUB_TYPE
}

const Button = ({
  hub,
  isHubTypeActive = false,
  changeHubType,
  disabled = false,
}: {
  hub: HubBtnItem
  isHubTypeActive?: boolean
  changeHubType: (hubType: HUB_TYPE) => void
  disabled?: boolean
}) => {
  return (
    <button
      key={hub.id}
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
        {
          'stardust-button--active': isHubTypeActive,
        },
      )}
      style={{ borderRadius: '1rem' }}
      onClick={() => changeHubType(hub.type)}
      disabled={disabled}
    >
      {hub.text}
    </button>
  )
}

const ChooseHubBtn = memo(Button)

const HubType = ({ type = FORM_ACTION.ADD }: Props) => {
  const dispatch = useDispatch()
  const activeHubType = useSelector(hubTypeSelector)
  const [items] = useState<HubBtnItem[]>([
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
              hub={hub}
              isHubTypeActive={hub.type === activeHubType}
              changeHubType={changeHubType}
              disabled={type === FORM_ACTION.EDIT}
            />
          )
        })}
      </div>
    </FormItem>
  )
}

export default HubType
