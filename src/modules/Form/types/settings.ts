import { HUB_TYPE, SETTING_LOCATE } from './enum'
import { JoinOrder } from './join'

export type HubOrderCompensateNumber = {
  [key in HUB_TYPE]: number
}

export type OrderExtraRewardArr = [number, number | null, number]

export interface ExtraIncomeLabel {
  id: string
  color: string
  text: string
  des?: string
}

export type ExtraIncomeLabelList = {
  [key: string]: ExtraIncomeLabel
}

export interface Settings {
  ORDER_PRICE: {
    MIN: number
    MAX: number
    STEP: number
    DEFAULT: number
  }
  ORDER_QUANTITY: {
    MIN: number
    MAX: number
    INIT: number
  }
  JOIN_2: {
    PRICE: number
  }
  JOIN_3: {
    PRICE: number
  }
  JOIN_4: {
    PRICE: number
  }
  JOIN_5: {
    PRICE: number
  }
  LOCATE: SETTING_LOCATE
  ORDER_COMPENSATE_NUMBER: HubOrderCompensateNumber
  QUICK_ADD_JOINS: JoinOrder[]
  QUICK_EXTRA_INCOME_LABELS: ExtraIncomeLabelList
  HUB_SHORT_PRICE: number
}

export interface IncomeSetting {
  SHOW_DETAIL_WITH_ORDER: boolean
  SHOW_EXTRA_JOIN_ORDER_PRICE: boolean
  SHOW_INCOME_DROP_BY_JOIN_ORDER: boolean
  SHOW_EXTRA_ORDER_PRICE: boolean
}

export type FilterHubTypeSetting = {
  [key in HUB_TYPE]: boolean
}

export type ExtraRewardList = {
  [key in SETTING_LOCATE]: {
    [key in HUB_TYPE]: OrderExtraRewardArr[]
  }
}

export type RewardList = {
  [key in HUB_TYPE]: OrderExtraRewardArr[]
}

export type ExtraOrderSundayList = {
  [key in SETTING_LOCATE]: OrderExtraRewardArr[]
}
