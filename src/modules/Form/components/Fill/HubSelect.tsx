import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useMemo,
  memo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  hubTypeSelector,
  hubsExistSelector,
  hubShiftSelector,
} from 'modules/Form/selectors'
import { HUB_SHIFT } from 'modules/Form/constants'
import { HubShift, FORM_ACTION } from 'modules/Form/types'
import { actions } from 'modules/Form/slices'
import { isDisabledHubShift } from 'utils/hub'

import FormItem from 'components/FormItem'
import { InputWrapper } from 'modules/Form/components/Input'

interface Props {
  type?: FORM_ACTION
  hubId?: string
}

const SelectItem = ({
  hub,
  disabled = false,
}: {
  hub: HubShift
  disabled?: boolean
}) => {
  return (
    <option value={hub.id} disabled={disabled}>
      {`${hub.start} - ${hub.end} ${disabled ? '(Trùng lịch)' : ''}`}
    </option>
  )
}

const HubSelect = ({ hubId = '', type = FORM_ACTION.ADD }: Props) => {
  const dispatch = useDispatch()
  const activeHubType = useSelector(hubTypeSelector)
  const hubsExist = useSelector(hubsExistSelector)
  const hubShift = useSelector(hubShiftSelector)
  const hubsExistFilterSelf = useMemo(
    () => hubsExist.filter((hub) => hub.id !== hubId),
    [hubsExist, hubId],
  )
  console.log('re-render HubSelect', { hubShift })

  const [hubShiftList, setHubShiftList] = useState([
    ...HUB_SHIFT[activeHubType],
  ])

  const onChangeHubShift = useCallback((shift: string) => {
    dispatch(
      actions.changeHubShift({
        shift,
      }),
    )
  }, [])

  const onChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const shift = e.target.value
      onChangeHubShift(shift)
    },
    [onChangeHubShift],
  )

  useLayoutEffect(() => {
    setHubShiftList([...HUB_SHIFT[activeHubType]])
    if (type === FORM_ACTION.ADD) onChangeHubShift('')
  }, [type, activeHubType, onChangeHubShift])

  return (
    <FormItem label="Khung giờ:" center={true}>
      <InputWrapper>
        <select
          value={hubShift}
          onChange={onChangeSelect}
          className="filter-none outline-none p-[12px] flex-[1_0_0%] border-none bg-none"
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          {hubShiftList.map((hub) => (
            <SelectItem
              key={hub.id}
              hub={hub}
              disabled={isDisabledHubShift(
                hubsExistFilterSelf,
                hub.start,
                hub.end,
              )}
            />
          ))}
        </select>
      </InputWrapper>
    </FormItem>
  )
}

export default memo(HubSelect)
