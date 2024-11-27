import React, { useMemo, memo } from 'react'
import { useSelector } from 'react-redux'

import { HUB_DISPLAY } from 'modules/Form/types'
import {
  myHubsSelector,
  orderPriceDefaultSelector,
  filterHubTypeSelector,
  locateSettingSelector,
  displayMyHubTypeSelector,
} from 'modules/Form/selectors'

import { getFormat } from 'utils/price'
import { getPrice_Hubs, getFilter_Hubs } from 'utils/income'

import WeekReward from './WeekReward'

const isShowWeekReward = ({
  displayMyHubType,
}: {
  displayMyHubType: HUB_DISPLAY
}) => {
  return (
    displayMyHubType === HUB_DISPLAY.D_PREV_WEEK ||
    displayMyHubType === HUB_DISPLAY.D_WEEK
  )
}

const Total = () => {
  const f = useMemo(() => getFormat(), [])
  const displayMyHubType = useSelector(displayMyHubTypeSelector) // displayMyHubType
  const allHubs = useSelector(myHubsSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const filters = useSelector(filterHubTypeSelector)
  const loc = useSelector(locateSettingSelector)

  const hubs = useMemo(
    () =>
      getFilter_Hubs({
        hubs: allHubs,
        filters,
      }),
    [allHubs, filters],
  )
  const price = useMemo(
    () => getPrice_Hubs(hubs, orderPrice, true, loc),
    [hubs, orderPrice, loc],
  )

  const renderShowPrice = () => {
    const showWeekReward = isShowWeekReward({ displayMyHubType })
    if (showWeekReward) {
      return <WeekReward totalPrice={price} />
    }

    // just display total price only
    return (
      <li className="text-lg">
        <span>Tổng thu nhập:</span>
        <strong className="ml-1 text-color-success">{f(price)}</strong>
      </li>
    )
  }

  return (
    <div className="mb-4">
      <ul className="p-2 border-line">{renderShowPrice()}</ul>
    </div>
  )
}

export default memo(Total)
