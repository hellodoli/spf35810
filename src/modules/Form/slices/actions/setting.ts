import { PayloadAction } from '@reduxjs/toolkit'

import {
  settingsDefault_Locate,
  settingsDefault_QuickAddJoins,
} from 'modules/Form/default'
import {
  HUB_TYPE,
  HubState,
  IncomeSetting,
  JoinOrder,
  SETTING_LOCATE,
} from 'modules/Form/types'
import { changeResetHubFillState } from 'utils/state'
import { setLocalStorage } from 'utils/storages'

const setLs_QuickAddJoins = (quickJoins: JoinOrder[]) => {
  setLocalStorage(
    settingsDefault_QuickAddJoins.lsKey,
    JSON.stringify(quickJoins),
  )
}

export const settingActions = {
  changeIncomeSetting: (
    state: HubState,
    action: PayloadAction<{
      key: keyof IncomeSetting
      setting: boolean
    }>,
  ) => {
    const { key, setting } = action.payload
    state.incomeSetting = {
      ...state.incomeSetting,
      [key]: setting,
    }
  },
  changeIsCalMode: (
    state: HubState,
    action: PayloadAction<{
      isCalMode: boolean
    }>,
  ) => {
    const { isCalMode } = action.payload
    state.isCalMode = isCalMode
    if (isCalMode) {
      state.isOpenPreview = true
      changeResetHubFillState(state)
    }
  },
  changeLocateSetting: (
    state: HubState,
    action: PayloadAction<{
      locate: SETTING_LOCATE
    }>,
  ) => {
    const { locate } = action.payload
    state.settings.LOCATE = locate
    setLocalStorage(settingsDefault_Locate.lsKey, locate)
  },
  changeToggleFilterHubType: (
    state: HubState,
    action: PayloadAction<{
      hubType: HUB_TYPE
    }>,
  ) => {
    const { hubType } = action.payload
    state.filterHubTypeSetting[hubType] = !state.filterHubTypeSetting[hubType]
  },
  deleteQuickAddJoins: (
    state: HubState,
    action: PayloadAction<{
      id: string
    }>,
  ) => {
    const { id } = action.payload
    const quickAddJoins = state.settings['QUICK_ADD_JOINS'].filter(
      (join) => join.key !== id,
    )
    state.settings['QUICK_ADD_JOINS'] = quickAddJoins
    setLs_QuickAddJoins(quickAddJoins)
  },
  addQuickAddJoins: (
    state: HubState,
    action: PayloadAction<{
      join: JoinOrder
    }>,
  ) => {
    const { join } = action.payload
    const quickAddJoins = [...state.settings['QUICK_ADD_JOINS'], join]
    state.settings['QUICK_ADD_JOINS'] = quickAddJoins
    setLs_QuickAddJoins(quickAddJoins)
  },
}
