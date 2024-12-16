import { HubState, HUB_DISPLAY } from 'modules/Form/types'
import {
  SETTINGS_DEFAULT,
  INCOME_SETTING,
  FILTER_HUBTYPE_MY_HUB_DEFAULT,
} from 'modules/Form/constants'
import {
  get_Global_ExpandAllHubListSummary,
  get_Global_ExtraChildJoinOrder,
} from 'modules/Form/default'
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
  // global switch
  isExpandAllHubListSummary: get_Global_ExpandAllHubListSummary(), // (ẩn/hiện) tất cả thống kê (list hub)
  isExtraChildJoinOrder: get_Global_ExtraChildJoinOrder(), // (ẩn/hiện) Thu nhập tăng/giảm do đơn ghép (list hub)
}

export { initialState }
