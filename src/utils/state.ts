import { v4 as uuidv4 } from 'uuid'

import { JOIN_2_DEFAULT, SETTINGS_DEFAULT } from 'modules/Form/constants'
import { HUB_TYPE, HubState } from 'modules/Form/types'
import { getDefaultHubAdvancedOpt, getDefaultIsHubWellDone } from './hub'
import { getUnixTime } from './time'

export const getResetHubFillState = () => {
  const join = {
    ...JOIN_2_DEFAULT,
    key: `${JOIN_2_DEFAULT.key}_${uuidv4()}`,
  }
  return {
    isHubWellDone: getDefaultIsHubWellDone(),
    hubType: HUB_TYPE.HUB_5,
    hubShift: '',
    hubTime: getUnixTime(new Date()),
    order: SETTINGS_DEFAULT.ORDER_QUANTITY.INIT, // LATER: custom by user
    joins: { [join.key]: join },
    hubAdvancedOpt: getDefaultHubAdvancedOpt(),
  }
}

export const changeResetHubFillState = (state: HubState) => {
  const { hubShift, hubTime, hubType, joins, isHubWellDone, hubAdvancedOpt } =
    getResetHubFillState()
  state.hubShift = hubShift
  state.hubTime = hubTime
  state.hubType = hubType
  state.joins = joins
  state.isHubWellDone = isHubWellDone
  state.order = state.settings['ORDER_QUANTITY']['INIT']
  state.hubAdvancedOpt = hubAdvancedOpt
  state.isLoading = false
  state.isLoadingMyHub = false
}
