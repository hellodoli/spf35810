import { PayloadAction } from '@reduxjs/toolkit'
import { HubState, JoinOrder } from 'modules/Form/types'

export const joinActions = {
  addJoin: (state: HubState, action: PayloadAction<{ join: JoinOrder }>) => {
    const { join } = action.payload
    state.joins[join.key] = join
  },
  setJoin: (
    state: HubState,
    action: PayloadAction<{
      updateKey: keyof JoinOrder
      joinId: string
      value: unknown
    }>,
  ) => {
    const { updateKey, joinId, value } = action.payload
    state.joins[joinId] = {
      ...state.joins[joinId],
      [updateKey]: value,
    }
  },
  deleteJoin: (
    state: HubState,
    action: PayloadAction<{
      joinId: string
    }>,
  ) => {
    const { joinId } = action.payload
    if (state.joins[joinId]) {
      delete state.joins[joinId]
    }
  },
}
