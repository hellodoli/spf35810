import React, { useCallback, useEffect, useMemo, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'configStore'
import DatePicker from 'react-datepicker'
import { FORM_ACTION } from 'modules/Form/types'
import { actions } from 'modules/Form/slices'
import { getHubsByHubTime } from 'modules/Form/slices/asyncThunk'
import { hubTimeSelector } from 'modules/Form/selectors'
import { getUnixTime } from 'utils/time'

import FormItem from 'modules/Form/components/FormItem'
import { InputWrapper } from 'modules/Form/components/Input'

interface Props {
  type?: FORM_ACTION
}

const HubTimeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormItem label="Ngày làm việc" center>
      <InputWrapper inline>{children}</InputWrapper>
    </FormItem>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HubTime = ({ type = FORM_ACTION.ADD }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const hubTime = useSelector(hubTimeSelector)
  const selected = useMemo(() => new Date(hubTime), [hubTime])

  const onChangeTime = useCallback((date: Date | null) => {
    if (date) {
      const hubTime = getUnixTime(date)
      dispatch(actions.changeHubTime({ hubTime }))
    }
    // reset hub shift
    dispatch(actions.changeHubShift({ shift: '' }))
  }, [])

  useEffect(() => {
    // find and save exits hub in database to redux
    dispatch(getHubsByHubTime(hubTime))
  }, [hubTime])

  return (
    <HubTimeLayout>
      <DatePicker
        selected={selected}
        onChange={onChangeTime}
        className="filter-none outline-none p-[12px] flex-[1_0_0%] border-none bg-none w-full"
        dateFormat={'dd/MM/yyyy'}
      />
    </HubTimeLayout>
  )
}

export default memo(HubTime)
