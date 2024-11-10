import { HUB_TYPE } from './enum'

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
}

export interface IncomeSetting {
  SHOW_DETAIL_WITH_ORDER: boolean
  SHOW_EXTRA_JOIN_ORDER_PRICE: boolean
}

export type FilterHubTypeSetting = {
  [key in HUB_TYPE]: boolean
}