import React, { useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'

import ExpandBtn from 'components/ExpandBtn'
import { HUB_COLORS, WEEK_REWARD } from 'modules/Form/constants'
import { Hub, HUB_TYPE } from 'modules/Form/types'
import { getIsHubWellDone } from 'utils/hub'
import { getFormat } from 'utils/price'

type HubTypeValidForReward = HUB_TYPE.HUB_10 | HUB_TYPE.HUB_8 | HUB_TYPE.HUB_5
const hubTypesCheckArr = [HUB_TYPE.HUB_10, HUB_TYPE.HUB_8, HUB_TYPE.HUB_5]

interface HubTypeItemPreview {
  type: HubTypeValidForReward
  price: number
  count: number
}
interface GetWeekReward {
  price: number
  hubTypes: {
    [key in HubTypeValidForReward]: number
  }
  hubTypesArr: HubTypeItemPreview[]
}

const defaultGetWeekReward: GetWeekReward = {
  price: 0,
  hubTypes: {
    [HUB_TYPE.HUB_10]: 0,
    [HUB_TYPE.HUB_8]: 0,
    [HUB_TYPE.HUB_5]: 0,
  },
  hubTypesArr: [],
}

const isExistEmptyOrderHub = (hubs: Hub[]) => {
  return hubs.some((hub) => hub.order <= 0)
}

const getValidHubTypesForWeekReward = (hubs: Hub[]) => {
  const hubTypes = {
    [HUB_TYPE.HUB_10]: 0,
    [HUB_TYPE.HUB_8]: 0,
    [HUB_TYPE.HUB_5]: 0,
  }

  for (let i = 0; i < hubs.length; i++) {
    const hub = hubs[i]
    const hubType = hub.hubType
    if (
      hubTypesCheckArr.includes(hubType) &&
      getIsHubWellDone(hub.isHubWellDone)
    ) {
      const validHubType = hubType as HubTypeValidForReward
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
    return defaultGetWeekReward
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
    return defaultGetWeekReward
  }

  let price = 0
  let hubTypesArr: HubTypeItemPreview[] = []
  const keys = Object.keys(hubTypes) as (
    | HUB_TYPE.HUB_10
    | HUB_TYPE.HUB_8
    | HUB_TYPE.HUB_5
  )[]

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const rewards = WEEK_REWARD[key]
    hubTypesArr.push({ type: key, price: 0, count: 0 })

    if (rewards) {
      let rewardByHubPrice = 0
      const count = hubTypes[key]
      for (let j = 0; j < rewards.length; j++) {
        const reward = rewards[j]
        if (count >= reward[0]) rewardByHubPrice = reward[2]
      }

      hubTypesArr = hubTypesArr.map((hub) => {
        if (hub.type === key) {
          return {
            ...hub,
            count,
            price: rewardByHubPrice,
          }
        }
        return hub
      })
      price += rewardByHubPrice
    }
  }

  return {
    price,
    hubTypes,
    hubTypesArr: hubTypesArr.filter((hub) => hub.price),
  }
}

const WeekReward = ({
  hubs,
  totalPrice = 0,
}: {
  hubs: Hub[]
  totalPrice?: number
}) => {
  const [toggle, setToggle] = useState(false)
  const f = useMemo(() => getFormat(), [])
  const { price: weekRewardPrice, hubTypesArr } = getWeekReward(hubs)

  const isShowDetail = weekRewardPrice > 0
  const totalPriceSumWeekReward = totalPrice + weekRewardPrice

  const toggleDetail = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [])

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
          <span className="flex items-center whitespace-nowrap">
            <span className="mr-1">Thưởng tuần:</span>
            <strong className={clsx('text-color-success mr-1')}>
              {f(weekRewardPrice)}
            </strong>
            {isShowDetail && (
              <ExpandBtn
                isDetail={toggle}
                toggleDetail={toggleDetail}
                textHide="(Ẩn)"
                textShow="(Xem ca Hub)"
              />
            )}
          </span>
          {isShowDetail && toggle && (
            <ul className="pl-4 ml-2 list-disc">
              {hubTypesArr.map((hub) => {
                return (
                  <li key={hub.type} className="text-sm">
                    <span
                      className="mr-1"
                      style={{ color: HUB_COLORS[hub.type] }}
                    >
                      {hub.type}
                    </span>
                    <small className="mr-1">X</small>
                    <span className="mr-1">{hub.count}</span>
                    <span className="mr-1">:</span>
                    <span className="text-color-success font-bold">
                      {f(hub.price)}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </li>
      </ul>
    </li>
  )
}

export default WeekReward
