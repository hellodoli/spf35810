import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from 'dayjs/plugin/weekday'
import { v4 as uuidv4 } from 'uuid'

import { WEEK_REWARD, WEEK_REWARD_REST_KEY } from 'modules/Form/constants'
import {
  ExtraIncomeItem,
  Hub,
  HUB_DISPLAY,
  HUB_TYPE,
  HubAdvancedOpt,
  HubShiftList,
  HubShiftRawArr,
} from 'modules/Form/types'
import * as timeUtil from './time'

dayjs.extend(isoWeek)
dayjs.extend(weekday)

const IS_HUB_WELL_DONE_DEFAULT = true
const HUB_ADVANCED_OPT: HubAdvancedOpt = {
  includeSundayReward: true,
  includeWeekReward: true,
  includeAutoCompensate: true,
}
const IS_HUB_SHORT_DEFAULT = false

const EXTRA_MINUTE_UT = 1000 * 60
const EXTRA_HOUR_UT = 1000 * 60 * 60

export function getExtraMinuteUnixTime(minute: number) {
  return minute * EXTRA_MINUTE_UT
}

/**
 *
 * @param {string} start time start, eg: '15:05', '23:55', ...
 * @param {string} end time end
 * @returns {number} duration between end time and start time
 */
export function getDurationHubTime(start: string, end: string) {
  const timeStart = timeUtil.getDateHourTime(start)
  const timeEnd = timeUtil.getDateHourTime(end)
  return timeEnd.getTime() - timeStart.getTime()
}

export function combineWithUniqId(name: string) {
  return `${name}__${uuidv4()}`
}

//== 1. HUB Time
export function getHubTime(start: string, end: string) {
  const duration = getDurationHubTime(start, end)
  const extraMinutesUnixTime = getExtraMinuteUnixTime(59)
  const hubTime = {
    hub: HUB_TYPE.HUB_1,
    duration,
    minHub: EXTRA_HOUR_UT,
    maxHub: EXTRA_HOUR_UT + extraMinutesUnixTime,
  }
  const hubs: { type: HUB_TYPE; hour: number }[] = [
    { type: HUB_TYPE.HUB_10, hour: 10 },
    { type: HUB_TYPE.HUB_8, hour: 8 },
    { type: HUB_TYPE.HUB_5, hour: 5 },
    { type: HUB_TYPE.HUB_3, hour: 3 },
    { type: HUB_TYPE.HUB_1, hour: 1 },
  ]
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const hour = hub.hour
    const min = hour * EXTRA_HOUR_UT
    const max = min + extraMinutesUnixTime
    if (duration >= min && duration <= max) {
      hubTime.hub = hub.type
      hubTime.duration = duration
      hubTime.minHub = min
      hubTime.maxHub = max
      break
    }
  }
  return hubTime
}

export function getRangeTimeMyHubs(displayType: HUB_DISPLAY) {
  const date = new Date()
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const td = dayjs(today)

  const getVal = (td: dayjs.Dayjs) => td.valueOf()

  switch (displayType) {
    case HUB_DISPLAY.D_TODAY: {
      return {
        start: today.getTime(),
        end: today.getTime(),
      }
    }
    case HUB_DISPLAY.D_3DAYS: {
      return {
        start: getVal(td.subtract(2, 'day')),
        end: timeUtil.getUnixTime(today),
      }
    }
    case HUB_DISPLAY.D_WEEK: {
      return {
        start: getVal(td.startOf('isoWeek')),
        end: getVal(td.endOf('isoWeek')),
      }
    }
    case HUB_DISPLAY.D_PREV_WEEK: {
      return {
        start: getVal(td.startOf('isoWeek').subtract(1, 'week')),
        end: getVal(td.startOf('isoWeek').subtract(1, 'day')),
      }
    }
    case HUB_DISPLAY.D_MONTH: {
      return {
        start: getVal(td.startOf('month')), // First day of the month
        end: getVal(td.endOf('month')), // Last day of the month
      }
    }
    case HUB_DISPLAY.D_PREV_MONTH: {
      return {
        start: getVal(td.subtract(1, 'month').startOf('month')), // First day of the previous month
        end: getVal(td.subtract(1, 'month').endOf('month')), // Last day of the previous month
      }
    }
    default: {
      return {
        start: today.getTime(),
        end: today.getTime(),
      }
    }
  }
}
//==== END

//== 2. HUB Shift
//==== START
function generateHubShiftId(start: string, end: string) {
  return `${start}_${end}`
}
function getStartEndFromHubShiftId(hubShiftId: string) {
  const [start, end] = hubShiftId.split('_')
  return { start, end }
}
export function generate_HUB_SHIFT() {
  const hubShift: HubShiftList = {
    [HUB_TYPE.HUB_10]: [],
    [HUB_TYPE.HUB_8]: [],
    [HUB_TYPE.HUB_5]: [],
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  }
  const ALL_HUB: HubShiftRawArr = {
    [HUB_TYPE.HUB_1]: [
      ['10:55', '12:00'],
      ['12:00', '13:00'],
      ['16:55', '17:55'],
      ['17:55', '19:00'],
      ['19:00', '20:00'],
    ],
    [HUB_TYPE.HUB_3]: [
      ['00:00', '03:00'],
      ['03:05', '06:05'],
      ['06:00', '09:00'], // TPHCM
      ['06:55', '09:55'], // Ha Noi
      ['10:00', '13:00'], // Ha Noi
      ['16:00', '19:00'],
      ['17:55', '21:00'], // Ha Noi
      ['19:05', '22:05'], // TPHCM
      ['20:05', '23:05'],
      ['20:55', '23:55'],
    ],
    [HUB_TYPE.HUB_5]: [
      ['05:30', '10:30'],
      ['05:50', '10:50'],
      ['08:00', '13:00'],
      ['10:30', '15:30'],
      ['10:55', '16:00'],
      ['13:00', '18:00'],
      ['16:00', '21:00'],
      ['17:55', '23:00'],
    ],
    [HUB_TYPE.HUB_8]: [['10:55', '19:00']],
    [HUB_TYPE.HUB_10]: [['10:00', '20:00']],
  }
  const hubKeys = Object.keys(ALL_HUB)
  const hubs = Object.values(ALL_HUB)
  hubs.forEach((hub, index) => {
    const hubKey = hubKeys[index] as unknown as HUB_TYPE
    hub.forEach((time) => {
      const start = time[0]
      const end = time[1]
      hubShift[hubKey].push({
        id: generateHubShiftId(start, end),
        start,
        end,
        ...getHubTime(start, end),
      })
    })
  })

  return hubShift
}

export function isDisabledHubShift(
  hubs: Hub[],
  hubShiftStart: string,
  hubShiftEnd: string,
) {
  let isDisabled = false
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const hubShift = getStartEndFromHubShiftId(hub.hubShift)
    const start = timeUtil.getDateHourTime(hubShift.start).getTime()
    const end = timeUtil.getDateHourTime(hubShift.end).getTime()
    const curHubTimeStart = timeUtil.getDateHourTime(hubShiftStart).getTime()
    const curHubTimeEnd = timeUtil.getDateHourTime(hubShiftEnd).getTime()
    if (curHubTimeStart < end && start < curHubTimeEnd) {
      isDisabled = true
      break
    }
    /*if (
      (curHubTimeStart >= start && curHubTimeStart < end) ||
      (curHubTimeEnd >= start && curHubTimeEnd <= end) ||
      (start >= curHubTimeStart && start <= curHubTimeEnd)
    ) {
      isDisabled = true
      break
    }*/
  }
  return isDisabled
}

//==== END

//== 3. HUB
//==== START
export function isEnhanceHub(hubType: HUB_TYPE) {
  return hubType === HUB_TYPE.HUB_1
}
export function isSuperHub(hubType: HUB_TYPE) {
  return hubType === HUB_TYPE.HUB_10 || hubType === HUB_TYPE.HUB_8
}

export const isApplyForExtraSunday = (unixDate: number) => {
  const d = new Date(unixDate)
  return d.getDay() === 0 && d.getTime() >= 1729962000000 // after 27/10/2024
}

const getHubDataBooleanDefault = (fallbackData: boolean, data?: boolean) => {
  return typeof data === 'boolean' ? data : fallbackData
}

export const getDefaultIsHubWellDone = () => IS_HUB_WELL_DONE_DEFAULT
export const getIsHubWellDone = (isHubWellDone?: boolean) => {
  return getHubDataBooleanDefault(getDefaultIsHubWellDone(), isHubWellDone)
}

export const getDefaultIsHubShort = () => IS_HUB_SHORT_DEFAULT
export const getIsHubShort = (isHubShort?: boolean) => {
  return getHubDataBooleanDefault(getDefaultIsHubShort(), isHubShort)
}

export const getDefaultHubAdvancedOpt = () => HUB_ADVANCED_OPT
export const getHubAdvancedOpt = (hubAdvancedOpt?: HubAdvancedOpt) => {
  return typeof hubAdvancedOpt !== 'undefined'
    ? hubAdvancedOpt
    : getDefaultHubAdvancedOpt()
}
export const getIncludeWeekReward = (includeWeekReward?: boolean) => {
  return getHubDataBooleanDefault(
    HUB_ADVANCED_OPT.includeWeekReward,
    includeWeekReward,
  )
}
export const getIncludeSundayReward = (includeSundayReward?: boolean) => {
  return getHubDataBooleanDefault(
    HUB_ADVANCED_OPT.includeSundayReward,
    includeSundayReward,
  )
}
export const getIncludeAutoCompensate = (includeAutoCompensate?: boolean) => {
  return getHubDataBooleanDefault(
    HUB_ADVANCED_OPT.includeAutoCompensate,
    includeAutoCompensate,
  )
}

export const getHubExtraIncomeArr = (hubExtraIncomeArr?: ExtraIncomeItem[]) => {
  return typeof hubExtraIncomeArr !== 'undefined' ? hubExtraIncomeArr : []
}
export const getHubExtraIncome = (
  hubExtraIncomeArr: ExtraIncomeItem[] = [],
) => {
  return hubExtraIncomeArr.reduce(
    (accumulator, extra) => accumulator + extra.price,
    0,
  )
}

export const getIsSoftCompensate = ({
  hubType,
  isHubWellDone,
  order,
  includeAutoCompensate,
}: {
  hubType: HUB_TYPE
  order: number
  isHubWellDone: boolean
  includeAutoCompensate: boolean
}) => {
  const isSoftCompensate =
    includeAutoCompensate && isSuperHub(hubType) && isHubWellDone && order > 0
  return isSoftCompensate
}

export const getHubTimesConsume = () => {
  return Object.keys(WEEK_REWARD)
    .filter((k) => k !== WEEK_REWARD_REST_KEY)
    .map((k) => Number(k))
    .sort((a, b) => b - a)
}
export const getLastHubTimesConsume = () => {
  const hubTimesConsume = getHubTimesConsume()
  const lastHubTimesConsume = hubTimesConsume[0]
  return lastHubTimesConsume
}

//==== END
