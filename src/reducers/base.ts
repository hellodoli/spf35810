import { AnyAction } from '@reduxjs/toolkit'

export interface BaseState {
  appName: string
  author: string
}

export const initialState: BaseState = {
  appName: 'spf35810',
  author: 'hellodoli',
}

const baseReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state
  }
}

export default baseReducer
