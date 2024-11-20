import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types/RootState'
import { JoinOrder, HUB_TYPE, Hub } from 'modules/Form/types'
import { initialState } from 'modules/Form/slices/initState'

import { getMaxJoinOrder } from 'utils/join'

export * from './settings'
export * from './income-setting'

const selectSlice = (state: RootState) => state.form || initialState

export const orderSelector = createSelector(
  [selectSlice],
  (state) => state.order,
)

export const joinsObSelector = createSelector(
  [selectSlice],
  (state) => state.joins,
)

export const joinsSelector = createSelector([joinsObSelector], (joinsOb) =>
  Object.values(joinsOb),
)

export const isHubWellDoneSelector = createSelector(
  [selectSlice],
  (state) => state.isHubWellDone,
)

export const hubTypeSelector = createSelector(
  [selectSlice],
  (state) => state.hubType,
)

export const hubTimeSelector = createSelector(
  [selectSlice],
  (state) => state.hubTime,
)

export const hubShiftSelector = createSelector(
  [selectSlice],
  (state) => state.hubShift,
)

export const isOpenPreviewSelector = createSelector(
  [selectSlice],
  (state) => state.isOpenPreview,
)

export const hubsExistObSelector = createSelector(
  [selectSlice],
  (state) => state.hubsExist,
)

export const hubsExistSelector = createSelector(
  [hubsExistObSelector],
  (hubsExistOb) => Object.values(hubsExistOb),
)

export const isLoadingSelector = createSelector(
  [selectSlice],
  (state) => state.isLoading,
)

export const isLoadingMyHubSelector = createSelector(
  [selectSlice],
  (state) => state.isLoadingMyHub,
)

export const isCalModeSelector = createSelector(
  [selectSlice],
  (state) => state.isCalMode,
)

export const makeMaxJoinOrder = () =>
  createSelector(
    [selectSlice, (_, joinId: string) => joinId],
    (state, joinId) => {
      const join = state.joins[joinId]
      return getMaxJoinOrder({
        joins: Object.values(state.joins),
        order: state.order,
        joinId: join.key,
        joinType: join.type,
      })
    },
  )

export const makeMaxJoinOrderPreview = () =>
  createSelector(
    [selectSlice, (_, joinType: JoinOrder['type']) => joinType],
    (state, joinType) => {
      return getMaxJoinOrder({
        joins: Object.values(state.joins),
        order: state.order,
        joinId: '',
        joinType,
      })
    },
  )

export const makeMyHubByHubTime = () =>
  createSelector(
    [selectSlice, (_, hubTime: number) => hubTime],
    (state, hubTime) => {
      const obHubs = state.myHubs[hubTime]
      if (obHubs) return Object.values(obHubs)
      return []
    },
  )

export const makeFilterHubType = createSelector(
  [selectSlice, (_, hubType: HUB_TYPE) => hubType],
  (state, hubType) => {
    return state.filterHubTypeSetting[hubType]
  },
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

export const isOpenDbSelector = createSelector(
  [selectSlice],
  (state) => state.isOpenDb,
)

export const myHubKeysSelector = createSelector(
  [myHubsObSelector],
  (myHubsOb) => Object.keys(myHubsOb),
)

export const displayMyHubTypeSelector = createSelector(
  [selectSlice],
  (state) => state.displayMyHubType,
)

export const rangeTimeStartSelector = createSelector(
  [selectSlice],
  (state) => state.rangeTime.start,
)
export const rangeTimeEndSelector = createSelector(
  [selectSlice],
  (state) => state.rangeTime.end,
)
export const rangeTimeSelector = createSelector(
  [selectSlice],
  (state) => state.rangeTime,
)

export const isExpandAllHubListSummarySelector = createSelector(
  [selectSlice],
  (state) => state.isExpandAllHubListSummary,
)

export const filterHubTypeSelector = createSelector(
  [selectSlice],
  (state) => state.filterHubTypeSetting,
)

export const filterHubTypeHub10Selector = createSelector(
  [selectSlice],
  (state) => state.filterHubTypeSetting[HUB_TYPE.HUB_10],
)

export const filterHubTypeHub8Selector = createSelector(
  [selectSlice],
  (state) => state.filterHubTypeSetting[HUB_TYPE.HUB_8],
)

export const filterHubTypeHub5Selector = createSelector(
  [selectSlice],
  (state) => state.filterHubTypeSetting[HUB_TYPE.HUB_5],
)

export const filterHubTypeHub3Selector = createSelector(
  [selectSlice],
  (state) => state.filterHubTypeSetting[HUB_TYPE.HUB_3],
)

export const filterHubTypeHub1Selector = createSelector(
  [selectSlice],
  (state) => state.filterHubTypeSetting[HUB_TYPE.HUB_1],
)
