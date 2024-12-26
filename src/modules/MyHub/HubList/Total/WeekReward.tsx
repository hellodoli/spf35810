/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import ExpandBtn from 'components/ExpandBtn'
import { HUB_COLORS, WEEK_REWARD } from 'modules/Form/constants'
import {
  displayMyHubTypeSelector,
  rangeTimeEndSelector,
  rangeTimeStartSelector,
} from 'modules/Form/selectors'
import { Hub, HUB_DISPLAY } from 'modules/Form/types'
import { getRangeTimeMyHubs } from 'utils/hub'
import { getFormat } from 'utils/price'
import {
  getHubsInRangeWeekDisplayList,
  getMondayAndSundayInRange,
} from './utils'

const WeekReward = ({
  hubs,
  totalPrice = 0,
}: {
  hubs: Hub[]
  totalPrice?: number
}) => {
  const [toggle, setToggle] = useState(false)
  const f = useMemo(() => getFormat(), [])
  const displayMyHubType = useSelector(displayMyHubTypeSelector)
  const timeStart = useSelector(rangeTimeStartSelector)
  const timeEnd = useSelector(rangeTimeEndSelector)

  let start = 0
  let end = 0
  const isCustom = displayMyHubType === HUB_DISPLAY.D_CUSTOM
  if (isCustom) {
    start = timeStart
    end = timeEnd
  } else {
    const rangeTime = getRangeTimeMyHubs(displayMyHubType)
    start = rangeTime.start
    end = rangeTime.end
  }

  const dates = useMemo(
    () => getMondayAndSundayInRange(start, end),
    [start, end],
  )
  const hubsInRangeWeek = useMemo(
    () =>
      getHubsInRangeWeekDisplayList({
        dates,
        hubs,
        isAcceptFullWeekOnly: false,
      }),
    [dates, hubs],
  )
  const weekRewardPrice = useMemo(() => {
    return hubsInRangeWeek.reduce((acc, weekR) => {
      const { hubTypesArr } = weekR
      const sum = hubTypesArr.reduce((acc, hub) => acc + hub.price, 0)
      return acc + sum
    }, 0)
  }, [hubsInRangeWeek])

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
          <span>Thu nhập:</span>
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
            <>
              {hubsInRangeWeek.map((weekR) => {
                const { hubTypesArr } = weekR
                return (
                  <ul key={weekR.id} className="pl-0 ml-2">
                    <li className="text-sm">{weekR.displayDate}</li>
                    <ul className="pl-4 ml-2 list-disc">
                      {!hubTypesArr.length && (
                        <li className="text-sm italic text-color-disabled">
                          Không đủ ca.
                        </li>
                      )}
                      {hubTypesArr.map((hub) => {
                        return (
                          <li
                            key={`${weekR.id}-${hub.type}`}
                            className="text-sm"
                          >
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
                  </ul>
                )
              })}
            </>
          )}
        </li>
      </ul>
    </li>
  )
}

export default memo(WeekReward)
