import React, { useMemo } from 'react'

import { Hub, HUB_TYPE } from 'modules/Form/types'
import { WEEK_REWARD } from 'modules/Form/constants'

import { getFormat } from 'utils/price'
import { getIsHubWellDone } from 'utils/hub'

const isExistEmptyOrderHub = (hubs: Hub[]) => {
  return hubs.some((hub) => hub.order <= 0)
}

const getValidHubTypesForWeekReward = (hubs: Hub[]) => {
  const hubTypesArr = [HUB_TYPE.HUB_10, HUB_TYPE.HUB_8, HUB_TYPE.HUB_5]
  const hubTypes = {
    [HUB_TYPE.HUB_10]: 0,
    [HUB_TYPE.HUB_8]: 0,
    [HUB_TYPE.HUB_5]: 0,
  }

  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const hubType = hub.hubType
    if (hubTypesArr.includes(hubType) && getIsHubWellDone(hub.isHubWellDone)) {
      const validHubType = hubType as
        | HUB_TYPE.HUB_10
        | HUB_TYPE.HUB_8
        | HUB_TYPE.HUB_5
      hubTypes[validHubType] += 1
    }
  }

  return hubTypes
}

const getWeekReward = (hubs: Hub[]) => {
  if (isExistEmptyOrderHub(hubs)) {
    /**
     * Not valid with shopeefood KPI, return 0
     */
    return 0
  }

  const hubTypes = getValidHubTypesForWeekReward(hubs)

  if (
    !hubTypes[HUB_TYPE.HUB_10] &&
    !hubTypes[HUB_TYPE.HUB_8] &&
    !hubTypes[HUB_TYPE.HUB_5]
  ) {
    /**
     *
     */
    return 0
  }

  let price = 0
  const keys = Object.keys(hubTypes) as (
    | HUB_TYPE.HUB_10
    | HUB_TYPE.HUB_8
    | HUB_TYPE.HUB_5
  )[]

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const rewards = WEEK_REWARD[key]
    if (rewards) {
      let rewardByHubPrice = 0
      const count = hubTypes[key]
      for (let j = 0; j < rewards.length; j++) {
        const reward = rewards[j]
        if (count >= reward[0]) rewardByHubPrice = reward[2]
      }
      price += rewardByHubPrice
    }
  }

  return price
}

const WeekReward = ({
  hubs,
  totalPrice = 0,
}: {
  hubs: Hub[]
  totalPrice?: number
}) => {
  const f = useMemo(() => getFormat(), [])
  const weekRewardPrice = getWeekReward(hubs)
  const totalPriceSumWeekReward = totalPrice + weekRewardPrice

  return (
    <li className="text-xl">
      <span>Tổng:</span>
      <strong className="ml-1 text-color-success">
        {f(totalPriceSumWeekReward)}
      </strong>
      <ul className="pl-4 ml-2 text-base list-disc">
        <li>
          <span>Thu nhập tuần:</span>
          <strong className="ml-1 text-color-success">{f(totalPrice)}</strong>
        </li>
        <li>
          <span>Thưởng tuần:</span>
          <strong className="ml-1 text-color-success">
            {f(weekRewardPrice)}
          </strong>
        </li>
      </ul>
    </li>
  )
}

export default WeekReward
