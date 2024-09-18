import { PayloadAction } from '@reduxjs/toolkit'
import { HubState, HUB_DISPLAY, RangeTime } from 'modules/Form/types'

export const hubActions = {
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
  },
  hideIsExpandAllHubListSummary: (state: HubState) => {
    state.isExpandAllHubListSummary = false
  },
}
