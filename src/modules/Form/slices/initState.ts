import {
  FILTER_HUBTYPE_MY_HUB_DEFAULT,
  INCOME_SETTING,
  SETTINGS_DEFAULT,
} from 'modules/Form/constants'
import {
  get_Global_ExpandAllHubListSummary,
  get_Global_ExpandWeekReward,
  get_Global_ExtraChildJoinOrder,
} from 'modules/Form/default'
import { HUB_DISPLAY, HubState } from 'modules/Form/types'
import { isCalPathName } from 'utils/route-path'
import { getResetHubFillState } from 'utils/state'

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
  // global switch
  isExpandAllHub: get_Global_ExpandAllHubListSummary(),
  isExpandExtraChildJoinOrder: get_Global_ExtraChildJoinOrder(),
  isExpandWeekReward: get_Global_ExpandWeekReward(),
}

export { initialState }
