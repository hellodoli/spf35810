import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'configStore'

import {
  displayMyHubTypeSelector,
  isLoadingMyHubSelector,
  isOpenDbSelector,
  myHubKeysSelector,
  rangeTimeEndSelector,
  rangeTimeStartSelector,
} from 'modules/Form/selectors'
import * as asThunk from 'modules/Form/slices/asyncThunk'
import { HUB_DISPLAY } from 'modules/Form/types'
import ExpandTotalPrice from './ExpandTotalPrice'
import HubDate from './HubDate'
import Total from './Total'

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

  console.log({
    displayMyHubType: type,
    rangeTimeStart,
    rangeTimeEnd,
    isLoadingMyHub,
    myHubsKeys,
  })

  if (isLoadingMyHub === null || isLoadingMyHub) return null
  if (!isLoadingMyHub && !myHubsKeys.length) {
    return <div className="text-center p-4 my-8">Không có ca hub nào.</div>
  }

  return (
    <div className="hub-list">
      <div className="mb-4 empty:hidden">
        <ExpandTotalPrice />
      </div>
      {isLoadingMyHub ? null /**
       * LATER: add some loading component here.
       */ : (
        <>
          <Total />
          <div className="hub-dates">
            {myHubsKeys.map((date) => (
              <HubDate key={date} date={date} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HubList
