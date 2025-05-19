import dayjs from 'dayjs'

import {
  WEEK_REWARD,
  WEEK_REWARD_2025_05_19,
  WEEK_REWARD_SEASON_2025_05_19,
} from 'modules/Form/constants'
import {
  Hub,
  HUB_DISPLAY,
  HUB_TYPE,
  OrderExtraRewardArr,
  SETTING_LOCATE,
} from 'modules/Form/types'
import { getIncludeWeekReward, getIsHubWellDone } from 'utils/hub'
import { getDisplayDate } from 'utils/time'
import type {
  GetWeekReward,
  HubTypeBySeason,
  HubTypeItemPreview,
  HubTypeValidForReward,
} from './type'

const hubTypesCheckArr = [HUB_TYPE.HUB_10, HUB_TYPE.HUB_8, HUB_TYPE.HUB_5]

const defaultGetWeekReward: GetWeekReward = {
  price: 0,
  hubTypes: {
    [HUB_TYPE.HUB_10]: {
      rest: 0,
      [WEEK_REWARD_SEASON_2025_05_19]: 0,
    },
    [HUB_TYPE.HUB_8]: {
      rest: 0,
      [WEEK_REWARD_SEASON_2025_05_19]: 0,
    },
    [HUB_TYPE.HUB_5]: {
      rest: 0,
      [WEEK_REWARD_SEASON_2025_05_19]: 0,
    },
  },
  hubTypesArr: [],
}

export const isShowWeekReward = ({
  displayMyHubType,
  isExpandWeekReward,
}: {
  displayMyHubType: HUB_DISPLAY
  isExpandWeekReward: boolean
}) => {
  return (
    isExpandWeekReward &&
    (displayMyHubType === HUB_DISPLAY.D_PREV_WEEK ||
      displayMyHubType === HUB_DISPLAY.D_WEEK ||
      displayMyHubType === HUB_DISPLAY.D_MONTH ||
      displayMyHubType === HUB_DISPLAY.D_PREV_MONTH ||
      displayMyHubType === HUB_DISPLAY.D_CUSTOM)
  )
}

const getValidHubTypesForWeekReward = (hubs: Hub[]) => {
  const hubTypes: HubTypeBySeason = {
    [HUB_TYPE.HUB_10]: {
      rest: 0,
      [WEEK_REWARD_SEASON_2025_05_19]: 0,
    },
    [HUB_TYPE.HUB_8]: {
      rest: 0,
      [WEEK_REWARD_SEASON_2025_05_19]: 0,
    },
    [HUB_TYPE.HUB_5]: {
      rest: 0,
      [WEEK_REWARD_SEASON_2025_05_19]: 0,
    },
  }

  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const hubType = hub.hubType
    if (
      hubTypesCheckArr.includes(hubType) &&
      getIsHubWellDone(hub.isHubWellDone) &&
      getIncludeWeekReward(hub.hubAdvancedOpt?.includeWeekReward)
    ) {
      const validHubType = hubType as HubTypeValidForReward
      const time_reward_2025_05_19 = +WEEK_REWARD_SEASON_2025_05_19
      const hubTime = hub.hubTime
      if (hubTime >= time_reward_2025_05_19) {
        hubTypes[validHubType][WEEK_REWARD_SEASON_2025_05_19] += 1
      } else {
        hubTypes[validHubType]['rest'] += 1
      }
    }
  }

  return hubTypes
}

export const getWeekReward = (hubs: Hub[], loc: SETTING_LOCATE) => {
  if (hubs.some((hub) => hub.order <= 0)) {
    /**
     * Not valid with shopeefood KPI, return 0
     */
    return defaultGetWeekReward
  }

  const hubTypes = getValidHubTypesForWeekReward(hubs)
  const seasonKey = WEEK_REWARD_SEASON_2025_05_19

  if (
    !hubTypes[HUB_TYPE.HUB_10]['rest'] &&
    !hubTypes[HUB_TYPE.HUB_10][seasonKey] &&
    !hubTypes[HUB_TYPE.HUB_8]['rest'] &&
    !hubTypes[HUB_TYPE.HUB_8][seasonKey] &&
    !hubTypes[HUB_TYPE.HUB_5]['rest'] &&
    !hubTypes[HUB_TYPE.HUB_5][seasonKey]
  ) {
    /**
     *
     */
    return defaultGetWeekReward
  }

  let price = 0
  const hubTypesArr: HubTypeItemPreview[] = []
  const keys = Object.keys(hubTypes) as (
    | HUB_TYPE.HUB_10
    | HUB_TYPE.HUB_8
    | HUB_TYPE.HUB_5
  )[]

  const getRewardByHubPrice = (
    rewards: OrderExtraRewardArr[],
    count: number,
  ) => {
    let rewardByHubPrice = 0
    for (let j = 0; j < rewards.length; j++) {
      const reward = rewards[j]
      if (count >= reward[0]) rewardByHubPrice = reward[2]
    }
    return rewardByHubPrice
  }

  for (let i = 0; i < keys.length; i++) {
    const type = keys[i]
    const hubType = hubTypes[type]

    const rewardPrice_Rest = getRewardByHubPrice(
      WEEK_REWARD[loc][type],
      hubType['rest'],
    )
    const rewardPrice_2025_05_19 = getRewardByHubPrice(
      WEEK_REWARD_2025_05_19[loc][type],
      hubType[seasonKey],
    )
    const totalPrice = rewardPrice_Rest + rewardPrice_2025_05_19

    price += totalPrice

    hubTypesArr.push({
      type,
      price: totalPrice,
      count: hubType['rest'] + hubType[seasonKey],
    })
  }

  return {
    price,
    hubTypes,
    hubTypesArr: hubTypesArr.filter((hub) => hub.price),
  }
}

// summary func
interface MonSunDate {
  monday: number
  sunday: number
  isFullWeek: boolean
}

interface GetHubsInRangeWeek {
  dates: MonSunDate[]
  hubs: Hub[]
  isAcceptFullWeekOnly?: boolean
}

interface GetHubsInRangeWeekDisplayList extends GetHubsInRangeWeek {
  loc: SETTING_LOCATE
}

export function getMondayAndSundayInRange(fromUnix: number, toUnix: number) {
  const from = dayjs.unix(fromUnix / 1000) // Convert 'from' to a dayjs object
  const to = dayjs.unix(toUnix / 1000) // Convert 'to' to a dayjs object

  const dates: MonSunDate[] = []
  const getVal = (td: dayjs.Dayjs) => td.valueOf()
  const addDates = (mon: dayjs.Dayjs, sun: dayjs.Dayjs, isFullWeek: boolean) =>
    dates.push({
      monday: getVal(mon),
      sunday: getVal(sun),
      isFullWeek,
    })

  let current = from.startOf('day') // Start from the beginning of the 'from' day

  // Loop until the current day exceeds the 'to' day
  while (current.isBefore(to) || current.isSame(to, 'day')) {
    // Check if the current day is a Thursday (day 4 in dayjs)
    const day = current.day()
    const monday = current.subtract(day === 0 ? 6 : day - 1, 'day')
    const sunday = monday.add(6, 'day')

    const isBefore = sunday.isBefore(to) || sunday.isSame(to, 'day')
    const fromDate = current
    const endDate = isBefore ? sunday : to
    const isFullWeek = day === 1 && isBefore
    addDates(fromDate, endDate, isFullWeek)
    current = sunday.add(1, 'day')
  }

  return dates
}

export function getHubsInRangeWeek({
  dates,
  hubs,
  isAcceptFullWeekOnly = false,
}: GetHubsInRangeWeek) {
  const ob: {
    [key: string]: {
      id: string
      hubs: Hub[]
    }
  } = {}

  const filterDates = dates.filter((date) =>
    !isAcceptFullWeekOnly ? true : date.isFullWeek,
  )

  for (let i = 0; i < filterDates.length; i++) {
    const { monday, sunday } = filterDates[i]
    const key = `${monday}-${sunday}`
    ob[key] = {
      id: key,
      hubs: [],
    }
    for (let j = 0; j < hubs.length; j++) {
      const hub = hubs[j]
      const hubTime = hub.hubTime
      const isInRange = hubTime >= monday && hubTime <= sunday
      if (isInRange && Array.isArray(ob[key]?.['hubs'])) {
        ob[key]['hubs'].push(hub)
      }
    }
  }

  return ob
}

export function getHubsInRangeWeekDisplayList({
  dates,
  hubs,
  isAcceptFullWeekOnly = false,
  loc,
}: GetHubsInRangeWeekDisplayList) {
  const hubsInRangeWeek = getHubsInRangeWeek({
    hubs,
    dates,
    isAcceptFullWeekOnly,
  })
  const hubsInRangeWeekArr = Object.values(hubsInRangeWeek)
  const hubsResult = hubsInRangeWeekArr.map((weekR) => {
    const { hubTypesArr } = getWeekReward(weekR.hubs, loc)
    const [monFrom, sunEnd] = weekR.id.split('-')
    return {
      id: weekR.id,
      hubTypesArr,
      fromDate: monFrom,
      toDate: sunEnd,
      displayDate: `${getDisplayDate(new Date(+monFrom))} - ${getDisplayDate(new Date(+sunEnd))}`,
    }
  })
  return hubsResult
}
