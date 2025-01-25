import { HUB_DISPLAY, HUB_TYPE } from './enum'
import { Hub, MyHubs, RangeTime } from './hub'
import { JoinOrder } from './join'
import { FilterHubTypeSetting, IncomeSetting, Settings } from './settings'

export interface HubState {
  settings: Settings
  incomeSetting: IncomeSetting
  isHubWellDone: boolean
  hubType: HUB_TYPE
  hubShift: string
  hubTime: number
  order: number
  joins: {
    [key: string]: JoinOrder
  }
  myHubs: MyHubs
  hubsExist: {
    [key: string]: Hub
  }
  isCalMode: boolean
  isOpenPreview: boolean
  isLoading: boolean
  isLoadingMyHub: boolean | null
  isOpenDb: boolean
  displayMyHubType: HUB_DISPLAY
  rangeTime: RangeTime

  filterHubTypeSetting: FilterHubTypeSetting

  isExpandAllHub: boolean
  isExpandExtraChildJoinOrder: boolean
  isExpandWeekReward: boolean
}
