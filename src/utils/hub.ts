import dayjs from 'dayjs'
import {
  HUB_TYPE,
  HubShiftRawArr,
  HubShiftList,
  Hub,
  HUB_DISPLAY,
} from 'modules/Form/types'
import { getDateHourTime, getUnixTime } from './time'

import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

const EXTRA_MINUTE_UT = 1000 * 60
const EXTRA_HOUR_UT = 1000 * 60 * 60

const HUB_10_UT = 10 * EXTRA_HOUR_UT
const HUB_8_UT = 8 * EXTRA_HOUR_UT
const HUB_5_UT = 5 * EXTRA_HOUR_UT
const HUB_3_UT = 3 * EXTRA_HOUR_UT

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
  const timeStart = getDateHourTime(start)
  const timeEnd = getDateHourTime(end)
  return timeEnd.getTime() - timeStart.getTime()
}

export function getHubTime(start: string, end: string) {
  const duration = getDurationHubTime(start, end)
  const extraMinutesUnixTime = getExtraMinuteUnixTime(59)

  const min_hub_10 = HUB_10_UT
  const max_hub_10 = min_hub_10 + extraMinutesUnixTime
  const min_hub_8 = HUB_8_UT
  const max_hub_8 = min_hub_8 + extraMinutesUnixTime
  const min_hub_5 = HUB_5_UT
  const max_hub_5 = min_hub_5 + extraMinutesUnixTime
  const min_hub_3 = HUB_3_UT
  const max_hub_3 = min_hub_3 + extraMinutesUnixTime

  if (duration >= min_hub_10 && duration <= max_hub_10) {
    // hub 5
    return {
      hub: HUB_TYPE.HUB_10,
      duration,
      minHub: min_hub_10,
      maxHub: max_hub_10,
    }
  } else if (duration >= min_hub_8 && duration <= max_hub_8) {
    // hub 5
    return {
      hub: HUB_TYPE.HUB_8,
      duration,
      minHub: min_hub_8,
      maxHub: max_hub_8,
    }
  } else if (duration >= min_hub_5 && duration <= max_hub_5) {
    // hub 5
    return {
      hub: HUB_TYPE.HUB_5,
      duration,
      minHub: min_hub_5,
      maxHub: max_hub_5,
    }
  } else {
    // hub 3
    return {
      hub: HUB_TYPE.HUB_3,
      duration,
      minHub: min_hub_3,
      maxHub: max_hub_3,
    }
  }
}

export const generateHubShiftId = (start: string, end: string) => {
  return `${start}_${end}`
}

export const getStartEndFromHubShiftId = (hubShiftId: string) => {
  const [start, end] = hubShiftId.split('_')
  return { start, end }
}

export const generate_HUB_SHIFT = () => {
  const hubShift: HubShiftList = {
    [HUB_TYPE.HUB_10]: [],
    [HUB_TYPE.HUB_8]: [],
    [HUB_TYPE.HUB_5]: [],
    [HUB_TYPE.HUB_3]: [],
  }
  const ALL_HUB: HubShiftRawArr = {
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
      ['05:50', '10:50'],
      ['08:00', '13:00'],
      ['10:55', '16:00'],
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

export const isSoldierHub = (hubType: HUB_TYPE) => {
  if (hubType === HUB_TYPE.HUB_3 || hubType === HUB_TYPE.HUB_5) return true
  return false
}

export const isDisabledHubShift = (
  hubs: Hub[],
  hubShiftStart: string,
  hubShiftEnd: string,
) => {
  let isDisabled = false
  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const hubShift = getStartEndFromHubShiftId(hub.hubShift)
    const start = getDateHourTime(hubShift.start).getTime()
    const end = getDateHourTime(hubShift.end).getTime()
    const curHubTimeStart = getDateHourTime(hubShiftStart).getTime()
    const curHubTimeEnd = getDateHourTime(hubShiftEnd).getTime()
    if (
      (curHubTimeStart >= start && curHubTimeStart < end) ||
      (curHubTimeEnd >= start && curHubTimeEnd <= end) ||
      (start >= curHubTimeStart && start <= curHubTimeEnd)
    ) {
      isDisabled = true
      break
    }
  }
  return isDisabled
}

export const getRangeTimeMyHubs = (displayType: HUB_DISPLAY) => {
  const date = new Date()
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (displayType === HUB_DISPLAY.D_TODAY) {
    return {
      start: today.getTime(),
      end: today.getTime(),
    }
  }
  if (displayType === HUB_DISPLAY.D_3DAYS) {
    return {
      start: dayjs(today).subtract(2, 'day').valueOf(),
      end: getUnixTime(today),
    }
  }
  if (displayType === HUB_DISPLAY.D_WEEK) {
    return {
      start: dayjs(today).startOf('isoWeek').valueOf(),
      end: getUnixTime(today),
    }
  }
  return {
    start: today.getTime(),
    end: today.getTime(),
  }
}
