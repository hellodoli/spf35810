import { createSelector } from '@reduxjs/toolkit'

import { initialState } from 'modules/Form/slices/initState'
import { RootState } from 'types/RootState'

const selectSlice = (state: RootState) => state.form || initialState

export const incomeSettingSelector = createSelector(
  [selectSlice],
  (state) => state.incomeSetting,
)

export const isShowExtraJoinOrderPriceSelector = createSelector(
  [incomeSettingSelector],
  (incomeSetting) => incomeSetting['SHOW_EXTRA_JOIN_ORDER_PRICE'],
)

export const isShowDetailWithOrderSelector = createSelector(
  [incomeSettingSelector],
  (incomeSetting) => incomeSetting['SHOW_DETAIL_WITH_ORDER'],
)

export const isShowIncomeDropByJoinOrderSelector = createSelector(
  [incomeSettingSelector],
  (incomeSetting) => incomeSetting['SHOW_INCOME_DROP_BY_JOIN_ORDER'],
)
