import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  displayMyHubTypeSelector,
  filterHubTypeSelector,
  locateSettingSelector,
  myHubsSelector,
  orderCompensateNumberSelector,
  orderPriceDefaultSelector,
} from 'modules/Form/selectors'
import { HUB_DISPLAY } from 'modules/Form/types'
import { getFilter_Hubs, getPrice_Hubs } from 'utils/income'
import { getFormat } from 'utils/price'
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
  const orderCompensateNumber = useSelector(orderCompensateNumberSelector)

  const hubs = useMemo(
    () =>
      getFilter_Hubs({
        hubs: allHubs,
        filters,
      }),
    [allHubs, filters],
  )
  const price = useMemo(
    () =>
      getPrice_Hubs({
        hubs,
        orderPrice,
        loc,
        orderCompensateNumber,
      }),
    [hubs, orderPrice, loc, orderCompensateNumber],
  )

  const renderShowPrice = () => {
    const showWeekReward = isShowWeekReward({ displayMyHubType })
    if (showWeekReward) {
      return <WeekReward hubs={hubs} totalPrice={price} />
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
