import { v4 as uuidv4 } from 'uuid'

import { generate_HUB_SHIFT } from 'utils/hub'
import { get_SettingsDefault_Locate } from './default'
import {
  ExtraOrderList,
  ExtraOrderSundayList,
  FilterHubTypeSetting,
  HUB_TYPE,
  HubColorsFilter,
  IncomeSetting,
  JoinOrder,
  SETTING_LOCATE,
  Settings,
  WeekRewardList,
} from './types'

export const INCOME_SETTING: IncomeSetting = {
  SHOW_EXTRA_JOIN_ORDER_PRICE: true,
  SHOW_DETAIL_WITH_ORDER: true,
  SHOW_INCOME_DROP_BY_JOIN_ORDER: true,
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
    INIT: 0,
  },
  JOIN_2: {
    PRICE: 20090,
  },
  JOIN_3: {
    PRICE: 31200,
  },
  JOIN_4: {
    PRICE: 40000,
  },
  JOIN_5: {
    PRICE: 50000,
  },
  LOCATE: get_SettingsDefault_Locate(),
  ORDER_COMPENSATE_NUMBER: {
    [HUB_TYPE.HUB_10]: 30,
    [HUB_TYPE.HUB_8]: 25,
    [HUB_TYPE.HUB_1]: 0,
    [HUB_TYPE.HUB_3]: 0,
    [HUB_TYPE.HUB_5]: 0,
  },
}
export const JOIN_2_DEFAULT: JoinOrder = {
  key: `order_join_2_default_key_${uuidv4()}`,
  type: 2,
  order: 0,
  price: SETTINGS_DEFAULT.JOIN_2.PRICE,
}
export const JOIN_3_DEFAULT: JoinOrder = {
  key: `order_join_3_default_key_${uuidv4()}`,
  type: 3,
  order: 0,
  price: SETTINGS_DEFAULT.JOIN_3.PRICE,
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
    [18, 22, 4000],
    [23, null, 6000],
  ],
  [HUB_TYPE.HUB_8]: [
    [15, 19, 4000],
    [20, null, 6000],
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
export const EXTRA_SUNDAY_ORDER: ExtraOrderSundayList = {
  [SETTING_LOCATE.TPHCM]: [
    [20, 29, 25000],
    [30, 39, 40000],
    [40, 49, 60000],
    [50, null, 80000],
  ],
  [SETTING_LOCATE.HANOI]: [
    [20, 29, 35000],
    [30, 39, 50000],
    [40, 49, 70000],
    [50, null, 90000],
  ],
  [SETTING_LOCATE.OTHER]: [
    [20, 29, 0],
    [30, 39, 0],
    [40, 49, 0],
    [50, null, 0],
  ],
}

export const WEEK_REWARD: WeekRewardList = {
  [HUB_TYPE.HUB_10]: [
    [4, 4, 100000],
    [5, 5, 150000],
    [6, null, 300000],
  ],
  [HUB_TYPE.HUB_8]: [
    [4, 4, 100000],
    [5, 5, 150000],
    [6, null, 300000],
  ],
  [HUB_TYPE.HUB_5]: [
    [6, 6, 150000],
    [9, 9, 300000],
    [12, null, 500000],
  ],
}

export const HUB_COLORS: HubColorsFilter = {
  [HUB_TYPE.HUB_10]: '#BD10E0',
  [HUB_TYPE.HUB_8]: '#4a90e2',
  [HUB_TYPE.HUB_5]: '#ee4d2d',
  [HUB_TYPE.HUB_3]: '#9b9b9b',
  [HUB_TYPE.HUB_1]: '#9b9b9b',
}

export const IS_HUB_WELL_DONE_DEFAULT = true
