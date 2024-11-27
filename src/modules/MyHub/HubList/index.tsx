import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'configStore'

import {
  myHubKeysSelector,
  displayMyHubTypeSelector,
  isOpenDbSelector,
  rangeTimeStartSelector,
  rangeTimeEndSelector,
  isLoadingMyHubSelector,
  myHubsSelector,
  orderPriceDefaultSelector,
  filterHubTypeSelector,
  locateSettingSelector,
} from 'modules/Form/selectors'
import { HUB_DISPLAY } from 'modules/Form/types'
import * as asThunk from 'modules/Form/slices/asyncThunk'

import { getFormat } from 'utils/price'
import { getPrice_Hubs, getFilter_Hubs } from 'utils/income'

import ExpandTotalPrice from './ExpandTotalPrice'
import HubDate from './HubDate'

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

const HubList = () => {
  const dispatch: AppDispatch = useDispatch()
  const type = useSelector(displayMyHubTypeSelector) // displayMyHubType
  const isOpenDb = useSelector(isOpenDbSelector)
  const myHubsKeys = useSelector(myHubKeysSelector)
  const rangeTimeStart = useSelector(rangeTimeStartSelector)
  const rangeTimeEnd = useSelector(rangeTimeEndSelector)
  const isLoadingMyHub = useSelector(isLoadingMyHubSelector)

  useEffect(() => {
    if (!isOpenDb) return
    const isCustom = type === HUB_DISPLAY.D_CUSTOM
    if (isCustom && !rangeTimeStart && !rangeTimeEnd) {
      /**
       *
       */
      return
    }
    if ((isCustom && rangeTimeStart && rangeTimeEnd) || !isCustom) {
      dispatch(
        asThunk.getMyHubs({
          type,
          start: rangeTimeStart,
          end: rangeTimeEnd,
        }),
      )
    }
  }, [type, isOpenDb, rangeTimeStart, rangeTimeEnd])

  if (isLoadingMyHub === null) return
  if (isLoadingMyHub) {
    /**
     * LATER: add some loading component here.
     */
    return null
  }
  if (!isLoadingMyHub && !myHubsKeys.length) {
    return <div className="text-center p-4 my-8">Không có ca hub nào.</div>
  }

  console.log({
    displayMyHubType: type,
    rangeTimeStart,
    rangeTimeEnd,
    isLoadingMyHub,
    myHubsKeys,
  })

  return (
    <div className="hub-list">
      <div className="mb-4">
        <ExpandTotalPrice />
      </div>
      <Total />
      <div className="hub-dates">
        {myHubsKeys.map((date) => (
          <HubDate key={date} date={date} />
        ))}
      </div>
    </div>
  )
}

export default HubList
