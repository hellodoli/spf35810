import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HubState } from 'modules/Form/types/state'
import { initialState } from './initState'

import { orderActions } from './actions/order'
import { joinActions } from './actions/join'
import { formActions } from './actions/form'
import { settingActions } from './actions/setting'
import { hubActions } from './actions/hub'

import { Hub, MyHubs } from 'modules/Form/types'
import {
  getHubsByHubTime,
  modifyHub,
  getMyHubs,
  deleteHubById,
} from './asyncThunk'

export const slice = createSlice({
  initialState,
  name: 'form',
  reducers: {
    resetState: () => initialState,
    changeIsOpenDb: (
      state: HubState,
      action: PayloadAction<{ isOpenDb: boolean }>,
    ) => {
      const { isOpenDb } = action.payload
      state.isOpenDb = isOpenDb
    },
    ...joinActions,
    ...orderActions,
    ...formActions,
    ...settingActions,
    ...hubActions,
  },
  extraReducers: (builder) => {
    // getHubsByHubTime
    builder.addCase(getHubsByHubTime.fulfilled, (state, action) => {
      const response = action.payload
      const { data: hubs } = response
      const newHubsExist: { [key: string]: Hub } = {}
      for (let i = 0; i < hubs.length; i++) {
        const hub = hubs[i]
        newHubsExist[hub.id] = { ...hub }
      }
      console.log({ newHubsExist })
      state.hubsExist = newHubsExist
    })
    builder.addCase(getHubsByHubTime.rejected, (/*state, action*/) => {})

    // modifyHub
    builder.addCase(modifyHub.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(modifyHub.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(modifyHub.rejected, (state) => {
      state.isLoading = false
    })

    // getMyHub
    builder.addCase(getMyHubs.pending, (state) => {
      state.isLoadingMyHub = true
    })
    builder.addCase(getMyHubs.fulfilled, (state, action) => {
      const response = action.payload

      const { data: hubs } = response

      const newHubs: MyHubs = {}
      const hubTimeArr: number[] = []

      for (let i = 0; i < hubs.length; i++) {
        const hub = hubs[i]
        const hubTime = hub.hubTime
        if (!hubTimeArr.includes(hubTime)) {
          hubTimeArr.push(hubTime)
          newHubs[hubTime] = { [hub.id]: hub }
        } else {
          newHubs[hubTime][hub.id] = hub
        }
      }
      console.log({ hubs, newHubs })
      state.myHubs = newHubs
      state.isLoadingMyHub = false
    })
    builder.addCase(getMyHubs.rejected, (state) => {
      state.isLoadingMyHub = false
    })

    builder.addCase(deleteHubById.fulfilled, (state, action) => {
      const { data } = action.payload
      const hubId = data.hubId
      const date = data.date
      if (state.myHubs?.[date]) {
        delete state.myHubs[date][hubId]
        const datas = [...Object.values(state.myHubs?.[date])]
        if (!datas.length) delete state.myHubs[date]
      }
    })
    builder.addCase(deleteHubById.rejected, () => {})
  },
})

export const { actions, reducer } = slice
