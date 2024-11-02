import { HUB_TYPE, HUB_DISPLAY } from './enum'
import { Settings, IncomeSetting, FilterHubTypeSetting } from './settings'
import { JoinOrder } from './join'
import { Hub, MyHubs, RangeTime } from './hub'

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
  isExpandAllHubListSummary: boolean
  filterHubTypeSetting: FilterHubTypeSetting
}
