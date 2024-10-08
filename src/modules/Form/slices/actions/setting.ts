import { PayloadAction } from '@reduxjs/toolkit'
import { HUB_TYPE, HubState, IncomeSetting } from 'modules/Form/types'
import { getResetHubFillState } from 'utils/state'

const changeResetHubFillState = (state: HubState) => {
  const { hubShift, hubTime, hubType, joins } = getResetHubFillState()
  state.hubShift = hubShift
  state.hubTime = hubTime
  state.hubType = hubType
  state.joins = joins

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
