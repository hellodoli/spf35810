import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types/RootState'

import { initialState } from 'modules/Form/slices/initState'

const selectSlice = (state: RootState) => state.form || initialState

export const settingsSelector = createSelector(
  [selectSlice],
  (state) => state.settings,
)

export const orderPriceDefaultSelector = createSelector(
  [settingsSelector],
  (settings) => settings.ORDER_PRICE.DEFAULT,
)

export const locateSettingSelector = createSelector(
  [settingsSelector],
  (settings) => settings.LOCATE,
)
