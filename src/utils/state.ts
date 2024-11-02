import { HUB_TYPE } from 'modules/Form/types'
import {
  JOIN_2_DEFAULT,
  SETTINGS_DEFAULT,
  IS_HUB_WELL_DONE_DEFAULT,
} from 'modules/Form/constants'
import { getUnixTime } from './time'

export const getResetHubFillState = () => {
  const join = { ...JOIN_2_DEFAULT }
  return {
    isHubWellDone: IS_HUB_WELL_DONE_DEFAULT,
    hubType: HUB_TYPE.HUB_5,
    hubShift: '',
    hubTime: getUnixTime(new Date()),
    order: SETTINGS_DEFAULT.ORDER_QUANTITY.INIT,
    joins: {
      [join.key]: join,
    },
  }
}
