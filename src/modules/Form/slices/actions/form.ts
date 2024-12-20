import { PayloadAction } from '@reduxjs/toolkit'

import { Hub, HUB_TYPE, HubState } from 'modules/Form/types'
import { getIsHubWellDone } from 'utils/hub'
import { convertFromJoinsOb } from 'utils/join'

export const formActions = {
  toggleIsOpenPreview: (state: HubState) => {
    state.isOpenPreview = !state.isOpenPreview
  },
  closeIsOpenPreview: (state: HubState) => {
    state.isOpenPreview = false
  },
  openIsOpenPreview: (state: HubState) => {
    state.isOpenPreview = true
  },
  changeHubType: (
    state: HubState,
    action: PayloadAction<{ hubType: HUB_TYPE }>,
  ) => {
    const { hubType } = action.payload
    state.hubType = hubType
  },
  changeHubTime: (
    state: HubState,
    action: PayloadAction<{ hubTime: number }>,
  ) => {
    const { hubTime } = action.payload
    state.hubTime = hubTime
  },
  changeHubShift: (
    state: HubState,
    action: PayloadAction<{ shift: string }>,
  ) => {
    const { shift } = action.payload
    state.hubShift = shift
  },
  changeIsHubWellDone: (
    state: HubState,
    action: PayloadAction<{ isHubWellDone: boolean }>,
  ) => {
    const { isHubWellDone } = action.payload
    state.isHubWellDone = isHubWellDone
  },
  changeHubDetail: (state: HubState, action: PayloadAction<{ hub: Hub }>) => {
    const { hub } = action.payload
    state.hubShift = hub.hubShift
    state.hubType = hub.hubType
    state.hubTime = hub.hubTime
    state.order = hub.order
    state.joins = convertFromJoinsOb(hub.joins)
    state.isLoading = false
    state.isHubWellDone = getIsHubWellDone(hub.isHubWellDone)
  },
}
