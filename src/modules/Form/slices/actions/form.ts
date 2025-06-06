import { PayloadAction } from '@reduxjs/toolkit'

import { Hub, HUB_TYPE, HubAdvancedOpt, HubState } from 'modules/Form/types'
import {
  combineWithUniqId,
  getHubAdvancedOpt,
  getHubExtraIncomeArr,
  getIsHubShort,
  getIsHubWellDone,
} from 'utils/hub'
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
  changeHubAdvancedOpt: (
    state: HubState,
    action: PayloadAction<{ isInclude: boolean; key: keyof HubAdvancedOpt }>,
  ) => {
    const { isInclude, key } = action.payload
    state.hubAdvancedOpt[key] = isInclude
  },
  addHubExtraIncome: (
    state: HubState,
    action: PayloadAction<{
      price: number
      labelId: string
      labelText: string
    }>,
  ) => {
    const { price, labelId, labelText } = action.payload
    const labelIds = [...state.extraIncomeArr].map(
      (extraIncome) => extraIncome.labelId,
    )
    const matchLabelId = labelIds.includes(labelId)
    if (matchLabelId) {
      // exist label
      state.extraIncomeArr = state.extraIncomeArr.map((extraIncome) => {
        if (extraIncome.labelId === labelId)
          return {
            ...extraIncome,
            price: extraIncome.price + price,
          }
        return extraIncome
      })
    } else {
      // add new
      state.extraIncomeArr.push({
        id: combineWithUniqId(labelId),
        labelId,
        labelText,
        price,
      })
    }
  },
  deleteHubExtraIncome: (
    state: HubState,
    action: PayloadAction<{
      id: string
    }>,
  ) => {
    const { id } = action.payload
    state.extraIncomeArr = state.extraIncomeArr.filter(
      (extraIncome) => extraIncome.id !== id,
    )
  },
  changeHubDetail: (state: HubState, action: PayloadAction<{ hub: Hub }>) => {
    const { hub } = action.payload
    state.hubShift = hub.hubShift
    state.hubType = hub.hubType
    state.hubTime = hub.hubTime
    state.order = hub.order
    state.joins = convertFromJoinsOb(hub.joins)
    state.isHubWellDone = getIsHubWellDone(hub.isHubWellDone)
    state.hubAdvancedOpt = getHubAdvancedOpt(hub.hubAdvancedOpt)
    state.extraIncomeArr = getHubExtraIncomeArr(hub.extraIncomeArr)
    state.isHubShort = getIsHubShort(hub.isHubShort)
    state.isLoading = false
  },
  changeHubShort: (
    state: HubState,
    action: PayloadAction<{ isHubShort: boolean }>,
  ) => {
    const { isHubShort } = action.payload
    state.isHubShort = isHubShort
  },
}
