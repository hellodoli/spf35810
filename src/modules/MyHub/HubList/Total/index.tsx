import React, { useMemo, memo } from 'react'
import { useSelector } from 'react-redux'

import {
  myHubsSelector,
  orderPriceDefaultSelector,
  filterHubTypeSelector,
  locateSettingSelector,
} from 'modules/Form/selectors'

import { getFormat } from 'utils/price'
import { getPrice_Hubs, getFilter_Hubs } from 'utils/income'

const Total = () => {
  const f = useMemo(() => getFormat(), [])
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

  return (
    <div className="mb-4">
      <div className="p-2 border-line text-xl">
        <span>Tổng thu nhập:</span>
        <strong className="ml-1 text-color-success">{f(price)}</strong>
      </div>
    </div>
  )
}

export default memo(Total)
