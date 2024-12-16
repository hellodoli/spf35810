import { PayloadAction } from '@reduxjs/toolkit'
import {
  HUB_TYPE,
  HubState,
  IncomeSetting,
  SETTING_LOCATE,
} from 'modules/Form/types'
import { settingsDefault_Locate } from 'modules/Form/default'
import { getResetHubFillState } from 'utils/state'
import { setLocalStorage } from 'utils/storages'

const SETTINGS_DEFAULT__LOCATE__LS_KEY = settingsDefault_Locate.lsKey

const changeResetHubFillState = (state: HubState) => {
  const { hubShift, hubTime, hubType, joins, isHubWellDone } =
    getResetHubFillState()
  state.hubShift = hubShift
  state.hubTime = hubTime
  state.hubType = hubType
  state.joins = joins
  state.isHubWellDone = isHubWellDone

  state.order = state.settings['ORDER_QUANTITY']['INIT']
  state.isLoading = false
  state.isLoadingMyHub = false
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
    setLocalStorage(SETTINGS_DEFAULT__LOCATE__LS_KEY, locate)
  },
  resetHubFill: (state: HubState) => {
    changeResetHubFillState(state)
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
}
