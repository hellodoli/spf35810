import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import {
  displayMyHubTypeSelector,
  rangeTimeEndSelector,
  rangeTimeStartSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { HUB_DISPLAY } from 'modules/Form/types'
import { getRangeTimeMyHubs } from 'utils/hub'

interface RangeTime {
  start: undefined | Date
  end: undefined | Date
}

const getDate = ({
  displayMyHubType = HUB_DISPLAY.D_TODAY,
  start = 0,
  end = 0,
}: {
  displayMyHubType?: HUB_DISPLAY
  start?: number
  end?: number
}): RangeTime => {
  const isCustom = displayMyHubType === HUB_DISPLAY.D_CUSTOM
  if (isCustom) {
    return {
      start: start ? new Date(start) : undefined,
      end: end ? new Date(end) : undefined,
    }
  }
  const range = getRangeTimeMyHubs(displayMyHubType)
  return {
    start: new Date(range.start),
    end: new Date(range.end),
  }
}

const Calendar = () => {
  const dispatch = useDispatch()
  const displayMyHubType = useSelector(displayMyHubTypeSelector)
  const start = useSelector(rangeTimeStartSelector)
  const end = useSelector(rangeTimeEndSelector)
  const isCustom = displayMyHubType === HUB_DISPLAY.D_CUSTOM
  const range = useMemo(
    () => getDate({ displayMyHubType, start, end }),
    [displayMyHubType, start, end],
  )
  const maxDate = useMemo(() => {
    if (!isCustom || !range.start) return undefined
    const dAfter31Date = dayjs(range.start).add(31, 'day')
    return new Date(dAfter31Date.valueOf())
  }, [isCustom, range.start])

  const dispatchChangeRangeTime = useCallback((start: number, end: number) => {
    dispatch(
      actions.changeRangeTime({
        rangeTime: {
          start,
          end,
        },
      }),
    )
  }, [])

  const onChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dates: [Date | null, Date | null]) => {
      if (!isCustom) return
      const [start, end] = dates
      const startTime = start ? start.getTime() : 0
      const endTime = end ? end.getTime() : 0
      dispatchChangeRangeTime(startTime, endTime)
    },
    [isCustom, dispatchChangeRangeTime],
  )

  useLayoutEffect(() => {
    if (isCustom) return
    dispatchChangeRangeTime(0, 0)
  }, [isCustom])

  return (
    <DatePicker
      maxDate={maxDate}
      selected={range.start}
      onChange={onChange}
      todayButton="Today"
      startDate={range.start}
      endDate={range.end}
      calendarStartDay={1}
      inline
      showDisabledMonthNavigation
      disabledKeyboardNavigation
      readOnly
      selectsRange
    />
  )
}

export default Calendar
