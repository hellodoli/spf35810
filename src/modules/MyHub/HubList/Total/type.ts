import { HUB_TYPE } from 'modules/Form/types'

type HubTypeValidForReward = HUB_TYPE.HUB_10 | HUB_TYPE.HUB_8 | HUB_TYPE.HUB_5

interface HubTypeItemPreview {
  type: HubTypeValidForReward
  price: number
  count: number
}

type HubTypeBySeason = {
  [key in HubTypeValidForReward]: {
    [key in string]: number
  }
}

interface GetWeekReward {
  price: number
  hubTypes: HubTypeBySeason
  hubTypesArr: HubTypeItemPreview[]
}

export type {
  GetWeekReward,
  HubTypeBySeason,
  HubTypeItemPreview,
  HubTypeValidForReward,
}
