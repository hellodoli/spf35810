import {
  JoinOrder,
  Settings,
  IncomeSetting,
  HUB_TYPE,
  ExtraOrderList,
  FilterHubTypeSetting,
  HubColorsFilter,
} from './types'
import { generate_HUB_SHIFT } from 'utils/hub'

export const INCOME_SETTING: IncomeSetting = {
  SHOW_EXTRA_JOIN_ORDER_PRICE: true,
  SHOW_DETAIL_WITH_ORDER: true,
}
export const FILTER_HUBTYPE_MY_HUB_DEFAULT: FilterHubTypeSetting = {
  [HUB_TYPE.HUB_10]: true,
  [HUB_TYPE.HUB_8]: true,
  [HUB_TYPE.HUB_5]: true,
  [HUB_TYPE.HUB_3]: true,
  [HUB_TYPE.HUB_1]: true,
}
export const SETTINGS_DEFAULT: Settings = {
  ORDER_PRICE: {
    MIN: 0,
    MAX: 100000,
    STEP: 100,
    DEFAULT: 13500,
  },
  ORDER_QUANTITY: {
    MIN: 0,
    MAX: 100,
    INIT: 10,
  },
  JOIN_2: {
    PRICE: 20900,
  },
  JOIN_3: {
    PRICE: 30000,
  },
  JOIN_4: {
    PRICE: 40000,
  },
  JOIN_5: {
    PRICE: 50000,
  },
}
export const JOIN_2_DEFAULT: JoinOrder = {
  key: 'order_join_2_default_key',
  type: 2,
  order: 0,
  price: SETTINGS_DEFAULT.JOIN_2.PRICE,
}

export const HUB_SHIFT = generate_HUB_SHIFT()

export const EXTRA_ORDER: ExtraOrderList = {
  [HUB_TYPE.HUB_10]: [
    [0, 0, 0],
    [31, null, 6000],
  ],
  [HUB_TYPE.HUB_8]: [
    [26, 30, 4000],
    [31, null, 6000],
  ],
  [HUB_TYPE.HUB_5]: [
    [14, 24, 4000],
    [25, null, 6000],
  ],
  [HUB_TYPE.HUB_3]: [
    [7, 14, 2000],
    [15, null, 3000],
  ],
  [HUB_TYPE.HUB_1]: [
    [0, 0, 0],
    [0, 0, 0],
  ],
}
export const EXTRA_CHILD_JOIN_ORDER: ExtraOrderList = {
  [HUB_TYPE.HUB_10]: [
    [0, 0, 0],
    [0, null, 0],
  ],
  [HUB_TYPE.HUB_8]: [
    [0, 0, 0],
    [0, null, 0],
  ],
  [HUB_TYPE.HUB_5]: [
    [9, 13, 3000],
    [14, null, 5000],
  ],
  [HUB_TYPE.HUB_3]: [
    [5, 8, 2000],
    [9, null, 4000],
  ],
  [HUB_TYPE.HUB_1]: [
    [0, 0, 0],
    [0, 0, 0],
  ],
}

export const HUB_COLORS: HubColorsFilter = {
  [HUB_TYPE.HUB_10]: '#BD10E0',
  [HUB_TYPE.HUB_8]: '#4a90e2',
  [HUB_TYPE.HUB_5]: '#ee4d2d',
  [HUB_TYPE.HUB_3]: '#9b9b9b',
  [HUB_TYPE.HUB_1]: '#9b9b9b',
}
