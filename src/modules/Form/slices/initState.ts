import { HubState, HUB_DISPLAY } from 'modules/Form/types'
import {
  SETTINGS_DEFAULT,
  INCOME_SETTING,
  FILTER_HUBTYPE_MY_HUB_DEFAULT,
} from 'modules/Form/constants'
import { getResetHubFillState } from 'utils/state'
import { isCalPathName } from 'utils/route-path'

const settings = { ...SETTINGS_DEFAULT }
const incomeSetting = { ...INCOME_SETTING }
const filterHubTypeSetting = { ...FILTER_HUBTYPE_MY_HUB_DEFAULT }

const initialState: HubState = {
  // others
  isOpenPreview: isCalPathName(window.location.pathname),
  isCalMode: isCalPathName(window.location.pathname),
  isOpenDb: false,
  // settings
  settings,
  incomeSetting,
  filterHubTypeSetting,
  // create, update hub
  ...getResetHubFillState(),
  isLoading: false,
  // list hub
  isLoadingMyHub: null,
  hubsExist: {}, // use for check invalid hubtime
  myHubs: {},
  displayMyHubType: HUB_DISPLAY.D_TODAY,
  rangeTime: {
    start: 0,
    end: 0,
  },
  isExpandAllHubListSummary: false,
}

export { initialState }
