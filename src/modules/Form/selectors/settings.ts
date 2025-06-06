import { createSelector } from '@reduxjs/toolkit'

import { initialState } from 'modules/Form/slices/initState'
import { HUB_TYPE } from 'modules/Form/types'
import { RootState } from 'types/RootState'
import { getPriceDefaultWithHubShort } from 'utils/income'

const selectSlice = (state: RootState) => state.form || initialState

export const settingsSelector = createSelector(
  [selectSlice],
  (state) => state.settings,
)

export const isHubShortSelector = createSelector(
  [selectSlice],
  (state) => state.isHubShort,
)

export const orderPriceDefaultSelector = createSelector(
  [isHubShortSelector, settingsSelector],
  (isHubShort, settings) =>
    getPriceDefaultWithHubShort({
      hubShortPrice: settings['HUB_SHORT_PRICE'],
      orderPrice: settings['ORDER_PRICE']['DEFAULT'],
      isHubShort,
    }),
)

export const hubShortPriceSelector = createSelector(
  [settingsSelector],
  (settings) => settings['HUB_SHORT_PRICE'],
)

export const locateSettingSelector = createSelector(
  [settingsSelector],
  (settings) => settings['LOCATE'],
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

export const quickAddJoinsSelector = createSelector(
  [settingsSelector],
  (settings) => settings['QUICK_ADD_JOINS'],
)

export const quickExtraIncomeLabelListSelector = createSelector(
  [settingsSelector],
  (settings) => settings['QUICK_EXTRA_INCOME_LABELS'],
)

export const quickExtraIncomeLabelsSelector = createSelector(
  [quickExtraIncomeLabelListSelector],
  (labelList) => Object.values(labelList),
)
