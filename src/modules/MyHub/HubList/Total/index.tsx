import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  displayMyHubTypeSelector,
  filterHubTypeSelector,
  hubShortPriceSelector,
  isExpandWeekRewardSelector,
  locateSettingSelector,
  myHubsSelector,
  orderCompensateNumberSelector,
  orderPriceDefaultSelector,
} from 'modules/Form/selectors'
import { getFilter_Hubs, getPrice_Hubs } from 'utils/income'
import { getFormat } from 'utils/price'
import { isShowWeekReward } from './utils'
import WeekReward from './WeekReward'

const Total = () => {
  const f = useMemo(() => getFormat(), [])
  const displayMyHubType = useSelector(displayMyHubTypeSelector)
  const isExpandWeekReward = useSelector(isExpandWeekRewardSelector)
  // hubs data
  const allHubs = useSelector(myHubsSelector)
  // filters
  const filters = useSelector(filterHubTypeSelector)
  // settings
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const loc = useSelector(locateSettingSelector)
  const orderCompensateNumber = useSelector(orderCompensateNumberSelector)

  const hubShortPrice = useSelector(hubShortPriceSelector)

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
        hubShortPrice,
      }).total,
    [hubs, orderPrice, loc, orderCompensateNumber],
  )

  const renderShowPrice = () => {
    const showWeekReward = isShowWeekReward({
      displayMyHubType,
      isExpandWeekReward,
    })
    if (showWeekReward) {
      return <WeekReward hubs={hubs} totalPrice={price} loc={loc} />
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
