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
  filterHubTypeHub1Selector,
  filterHubTypeHub3Selector,
  filterHubTypeHub5Selector,
  filterHubTypeHub8Selector,
  filterHubTypeHub10Selector,
} from 'modules/Form/selectors'
import { HUB_DISPLAY, HUB_TYPE } from 'modules/Form/types'
import * as asThunk from 'modules/Form/slices/asyncThunk'

import { getFormat } from 'utils/price'
import { getPriceOfHubs } from './utils'

import ExpandTotalPrice from './ExpandTotalPrice'
import HubDate from './HubDate'

const Total = () => {
  const f = useMemo(() => getFormat(), [])
  const allHubs = useSelector(myHubsSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const filter_1 = useSelector(filterHubTypeHub1Selector)
  const filter_3 = useSelector(filterHubTypeHub3Selector)
  const filter_5 = useSelector(filterHubTypeHub5Selector)
  const filter_8 = useSelector(filterHubTypeHub8Selector)
  const filter_10 = useSelector(filterHubTypeHub10Selector)

  const hubs = useMemo(() => {
    return allHubs.filter((hub) => {
      if (
        (!filter_1 && hub.hubType === HUB_TYPE.HUB_1) ||
        (!filter_3 && hub.hubType === HUB_TYPE.HUB_3) ||
        (!filter_5 && hub.hubType === HUB_TYPE.HUB_5) ||
        (!filter_8 && hub.hubType === HUB_TYPE.HUB_8) ||
        (!filter_10 && hub.hubType === HUB_TYPE.HUB_10)
      )
        return false
      return true
    })
  }, [allHubs, filter_1, filter_3, filter_5, filter_8, filter_10])

  const price = useMemo(
    () => getPriceOfHubs(hubs, orderPrice),
    [hubs, orderPrice],
  )

  return (
    <div className="mb-4">
      <div className="p-2 border-line text-xl">
        <span>Tổng thu nhập:</span>
        <strong className="ml-1" style={{ color: 'var(--nc-success)' }}>
          {f(price)}
        </strong>
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
     * add some loading component here.
     */
    return null
  }
  if (!isLoadingMyHub && !myHubsKeys.length) {
    return <div className="text-center p-4 my-8">Không có ca hub nào.</div>
  }

  console.log({
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
