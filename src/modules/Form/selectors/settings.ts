import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types/RootState'
import { HUB_TYPE } from 'modules/Form/types'
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

export const orderCompensateSelector = createSelector(
  [settingsSelector, (_, hubType: HUB_TYPE) => hubType],
  (settings, hubType) => {
    return settings['ORDER_COMPENSATE_NUMBER'][hubType]
  },
)

export const orderCompensateNumberSelector = createSelector(
  [settingsSelector],
  (settings) => settings['ORDER_COMPENSATE_NUMBER'],
)
