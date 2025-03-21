import React, { memo, useCallback, useEffect, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'configStore'

import FormItem from 'components/FormItem'
import { InputWrapper } from 'components/Input'
import { hubTimeSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { getHubsByHubTime } from 'modules/Form/slices/asyncThunk'
import { getUnixTime } from 'utils/time'

const HubTimeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormItem label="Ngày làm việc" center>
      <InputWrapper inline className="hub-time-input">
        {children}
      </InputWrapper>
    </FormItem>
  )
}

const HubTime = () => {
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
        onKeyDown={(e) => e.preventDefault()}
        calendarStartDay={1}
      />
    </HubTimeLayout>
  )
}

export default memo(HubTime)
