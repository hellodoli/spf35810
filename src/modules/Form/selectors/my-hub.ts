import { createSelector } from '@reduxjs/toolkit'

import { initialState } from 'modules/Form/slices/initState'
import { Hub } from 'modules/Form/types'
import { RootState } from 'types/RootState'

const selectSlice = (state: RootState) => state.form || initialState

export const isLoadingMyHubSelector = createSelector(
  [selectSlice],
  (state) => state.isLoadingMyHub,
)

export const myHubsObSelector = createSelector(
  [selectSlice],
  (state) => state.myHubs,
)

export const myHubsSelector = createSelector([myHubsObSelector], (myHubsOb) => {
  const allHubs: Hub[] = []
  const hubDates = Object.values(myHubsOb)
  hubDates.forEach((hubByIds) => {
    const hubs = Object.values(hubByIds)
    hubs.forEach((hub) => allHubs.push(hub))
  })
  return allHubs
})

export const myHubKeysSelector = createSelector(
  [myHubsObSelector],
  (myHubsOb) => Object.keys(myHubsOb),
)
