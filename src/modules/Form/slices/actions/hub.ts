import { PayloadAction } from '@reduxjs/toolkit'

import {
  global_ExpandAllHubListSummary,
  global_ExpandWeekReward,
  global_ExtraChildJoinOrder,
} from 'modules/Form/default'
import { HUB_DISPLAY, HubState, RangeTime } from 'modules/Form/types'
import { changeResetHubFillState } from 'utils/state'
import { setLocalStorage } from 'utils/storages'

const setLs_IsExtraChildJoinOrder = (value: boolean) => {
  setLocalStorage(global_ExtraChildJoinOrder.lsKey, `${value}`)
}
const setLs_IsExpandAllHub = (value: boolean) => {
  setLocalStorage(global_ExpandAllHubListSummary.lsKey, `${value}`)
}
const setLs_IsExpandWeekReward = (value: boolean) => {
  setLocalStorage(global_ExpandWeekReward.lsKey, `${value}`)
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

  showIsExpandAllHub: (state: HubState) => {
    state.isExpandAllHub = true
    setLs_IsExpandAllHub(true)
  },
  hideIsExpandAllHub: (state: HubState) => {
    state.isExpandAllHub = false
    setLs_IsExpandAllHub(false)
  },
  toggleIsExpandAllHub: (state: HubState) => {
    state.isExpandAllHub = !state.isExpandAllHub
    setLs_IsExpandAllHub(!state.isExpandAllHub)
  },

  showIsExtraChildJoinOrder: (state: HubState) => {
    state.isExpandExtraChildJoinOrder = true
    setLs_IsExtraChildJoinOrder(true)
  },
  hideIsExtraChildJoinOrder: (state: HubState) => {
    state.isExpandExtraChildJoinOrder = false
    setLs_IsExtraChildJoinOrder(false)
  },
  toggleIsExtraChildJoinOrder: (state: HubState) => {
    state.isExpandExtraChildJoinOrder = !state.isExpandExtraChildJoinOrder
    setLs_IsExtraChildJoinOrder(!state.isExpandExtraChildJoinOrder)
  },

  showIsExpandWeekReward: (state: HubState) => {
    state.isExpandWeekReward = true
    setLs_IsExpandWeekReward(true)
  },
  hideIsExpandWeekReward: (state: HubState) => {
    state.isExpandWeekReward = false
    setLs_IsExpandWeekReward(false)
  },
}
