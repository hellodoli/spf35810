import { v4 as uuidv4 } from 'uuid'

import {
  IS_HUB_WELL_DONE_DEFAULT,
  JOIN_2_DEFAULT,
  SETTINGS_DEFAULT,
} from 'modules/Form/constants'
import { HUB_TYPE, HubState } from 'modules/Form/types'
import { getUnixTime } from './time'

export const getResetHubFillState = () => {
  const join = {
    ...JOIN_2_DEFAULT,
    key: `${JOIN_2_DEFAULT.key}_${uuidv4()}`,
  }
  return {
    isHubWellDone: IS_HUB_WELL_DONE_DEFAULT,
    hubType: HUB_TYPE.HUB_5,
    hubShift: '',
    hubTime: getUnixTime(new Date()),
    order: SETTINGS_DEFAULT.ORDER_QUANTITY.INIT, // LATER: custom by user
    joins: {
      [join.key]: join,
    },
  }
}

export const changeResetHubFillState = (state: HubState) => {
  const { hubShift, hubTime, hubType, joins, isHubWellDone } =
    getResetHubFillState()
  state.hubShift = hubShift
  state.hubTime = hubTime
  state.hubType = hubType
  state.joins = joins
  state.isHubWellDone = isHubWellDone

  state.order = state.settings['ORDER_QUANTITY']['INIT']
  state.isLoading = false
  state.isLoadingMyHub = false
}
