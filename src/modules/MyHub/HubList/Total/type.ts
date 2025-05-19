import { WEEK_REWARD_SEASON_2025_05_19 } from 'modules/Form/constants'
import { HUB_TYPE } from 'modules/Form/types'

type HubTypeValidForReward = HUB_TYPE.HUB_10 | HUB_TYPE.HUB_8 | HUB_TYPE.HUB_5

interface HubTypeItemPreview {
  type: HubTypeValidForReward
  price: number
  count: number
}

interface HubTypeItemBySeason {
  rest: number
  [WEEK_REWARD_SEASON_2025_05_19]: number
}

type HubTypeBySeason = {
  [key in HubTypeValidForReward]: HubTypeItemBySeason
}

interface GetWeekReward {
  price: number
  hubTypes: HubTypeBySeason
  hubTypesArr: HubTypeItemPreview[]
}

export type {
  GetWeekReward,
  HubTypeBySeason,
  HubTypeItemBySeason,
  HubTypeItemPreview,
  HubTypeValidForReward,
}
