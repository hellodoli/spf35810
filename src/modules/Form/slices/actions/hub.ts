import { PayloadAction } from '@reduxjs/toolkit'

import {
  global_ExpandAllHubListSummary,
  global_ExtraChildJoinOrder,
} from 'modules/Form/default'
import { HUB_DISPLAY, HubState, RangeTime } from 'modules/Form/types'
import { changeResetHubFillState } from 'utils/state'
import { setLocalStorage } from 'utils/storages'

const setLs_IsExtraChildJoinOrder = (value: boolean) => {
  setLocalStorage(global_ExtraChildJoinOrder.lsKey, `${value}`)
}

const setLs_IsExpandAllHubListSummary = (value: boolean) => {
  setLocalStorage(global_ExpandAllHubListSummary.lsKey, `${value}`)
}

export const hubActions = {
  resetHubFill: (state: HubState) => {
    changeResetHubFillState(state)
  },
  changeDisplayMyHubType: (
    state: HubState,
    action: PayloadAction<{ type: HUB_DISPLAY }>,
  ) => {
    const { type } = action.payload
    state.displayMyHubType = type
    if (type === HUB_DISPLAY.D_CUSTOM) {
      state.myHubs = {}
      state.isLoadingMyHub = false
    }
  },
  changeRangeTime: (
    state: HubState,
    action: PayloadAction<{ rangeTime: RangeTime }>,
  ) => {
    const { rangeTime } = action.payload
    state.rangeTime = rangeTime
  },
  resetRangeTime: (state: HubState) => {
    state.rangeTime = {
      start: 0,
      end: 0,
    }
    state.myHubs = {}
    state.isLoadingMyHub = false
  },
  showIsExpandAllHubListSummary: (state: HubState) => {
    state.isExpandAllHubListSummary = true
    setLs_IsExpandAllHubListSummary(true)
  },
  hideIsExpandAllHubListSummary: (state: HubState) => {
    state.isExpandAllHubListSummary = false
    setLs_IsExpandAllHubListSummary(false)
  },
  showIsExtraChildJoinOrder: (state: HubState) => {
    state.isExtraChildJoinOrder = true
    setLs_IsExtraChildJoinOrder(true)
  },
  hideIsExtraChildJoinOrder: (state: HubState) => {
    state.isExtraChildJoinOrder = false
    setLs_IsExtraChildJoinOrder(false)
  },
}
