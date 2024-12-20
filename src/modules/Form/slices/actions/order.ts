import { PayloadAction } from '@reduxjs/toolkit'

import { HubState } from 'modules/Form/types/state'

export const orderActions = {
  changeOrder: (state: HubState, action: PayloadAction<{ order: number }>) => {
    const { order } = action.payload
    state.order = order
  },
  increaseOrder: (state: HubState) => {
    state.order += 1
  },
  decreaseOrder: (state: HubState) => {
    state.order -= 1
  },
}
