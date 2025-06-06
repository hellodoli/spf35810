import { createSelector } from '@reduxjs/toolkit'

import { initialState } from 'modules/Form/slices/initState'
import { RootState } from 'types/RootState'

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

export const isHubShortSelector = createSelector(
  [selectSlice],
  (state) => state.isHubShort,
)
