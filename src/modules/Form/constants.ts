import { combineWithUniqId, generate_HUB_SHIFT } from 'utils/hub'
import {
  get_SettingsDefault_Locate,
  get_SettingsDefault_QuickAddJoins,
} from './default'
import {
  ExtraOrderSundayList,
  ExtraRewardList,
  FilterHubTypeSetting,
  HUB_TYPE,
  HubColorsFilter,
  IncomeSetting,
  JoinOrder,
  OrderExtraRewardArr,
  RewardList,
  SETTING_LOCATE,
  Settings,
} from './types'

export const INCOME_SETTING: IncomeSetting = {
  SHOW_EXTRA_JOIN_ORDER_PRICE: true,
  SHOW_EXTRA_ORDER_PRICE: true,
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
    PRICE: 31135,
  },
  JOIN_4: {
    PRICE: 40000,
  },
  JOIN_5: {
    PRICE: 50000,
  },
  ORDER_COMPENSATE_NUMBER: {
    [HUB_TYPE.HUB_10]: 30,
    [HUB_TYPE.HUB_8]: 25,
    [HUB_TYPE.HUB_1]: 0,
    [HUB_TYPE.HUB_3]: 0,
    [HUB_TYPE.HUB_5]: 0,
  },
  // !IMPORTANT: values maybe change by user
  LOCATE: get_SettingsDefault_Locate(),
  QUICK_ADD_JOINS: get_SettingsDefault_QuickAddJoins(),
}
export const JOIN_2_DEFAULT: JoinOrder = {
  key: 'order_join_2_default_key',
  type: 2,
  order: 0,
  price: SETTINGS_DEFAULT.JOIN_2.PRICE,
}
export const JOIN_3_DEFAULT: JoinOrder = {
  key: 'order_join_3_default_key',
  type: 3,
  order: 0,
  price: SETTINGS_DEFAULT.JOIN_3.PRICE,
}

export const HUB_SHIFT = generate_HUB_SHIFT()

export const EXTRA_ORDER: ExtraRewardList = {
  [SETTING_LOCATE.TPHCM]: {
    [HUB_TYPE.HUB_10]: [[31, null, 6000]],
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
    [HUB_TYPE.HUB_1]: [],
  },
  [SETTING_LOCATE.HANOI]: {
    [HUB_TYPE.HUB_10]: [
      [31, 35, 6000],
      [35, null, 8000],
    ],
    [HUB_TYPE.HUB_8]: [
      [26, 29, 4000],
      [30, null, 8000],
    ],
    [HUB_TYPE.HUB_5]: [
      [14, 24, 4000],
      [25, null, 6000],
    ],
    [HUB_TYPE.HUB_3]: [
      [7, 14, 2000],
      [15, null, 3000],
    ],
    [HUB_TYPE.HUB_1]: [],
  },
  [SETTING_LOCATE.HAIPHONG]: {
    [HUB_TYPE.HUB_10]: [
      [10, 12, 500],
      [13, 16, 1000],
      [17, null, 1500],
    ],
    [HUB_TYPE.HUB_8]: [
      [10, 12, 500],
      [13, 16, 1000],
      [17, null, 1500],
    ],
    [HUB_TYPE.HUB_5]: [
      [10, 12, 500],
      [13, 16, 1000],
      [17, null, 1500],
    ],
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  },
  [SETTING_LOCATE.OTHER]: {
    [HUB_TYPE.HUB_10]: [],
    [HUB_TYPE.HUB_8]: [],
    [HUB_TYPE.HUB_5]: [],
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  },
}
export const EXTRA_JOIN_ORDER: RewardList = {
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
  [HUB_TYPE.HUB_1]: [],
}

const EXTRA_SUNDAY_ORDER_NO_REWARD: OrderExtraRewardArr[] = [
  [20, 29, 0],
  [30, 39, 0],
  [40, 49, 0],
  [50, null, 0],
]
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
  [SETTING_LOCATE.HAIPHONG]: [...EXTRA_SUNDAY_ORDER_NO_REWARD],
  [SETTING_LOCATE.OTHER]: [...EXTRA_SUNDAY_ORDER_NO_REWARD],
}

export const WEEK_REWARD: ExtraRewardList = {
  [SETTING_LOCATE.TPHCM]: {
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
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  },
  [SETTING_LOCATE.HANOI]: {
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
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  },
  [SETTING_LOCATE.HAIPHONG]: {
    [HUB_TYPE.HUB_10]: [
      [4, 4, 80000],
      [6, null, 200000],
    ],
    [HUB_TYPE.HUB_8]: [
      [4, 4, 80000],
      [6, null, 200000],
    ],
    [HUB_TYPE.HUB_5]: [
      [6, 6, 80000],
      [9, null, 200000],
    ],
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  },
  [SETTING_LOCATE.OTHER]: {
    [HUB_TYPE.HUB_10]: [],
    [HUB_TYPE.HUB_8]: [],
    [HUB_TYPE.HUB_5]: [],
    [HUB_TYPE.HUB_3]: [],
    [HUB_TYPE.HUB_1]: [],
  },
}

export const HUB_COLORS: HubColorsFilter = {
  [HUB_TYPE.HUB_10]: '#BD10E0',
  [HUB_TYPE.HUB_8]: '#4a90e2',
  [HUB_TYPE.HUB_5]: '#ee4d2d',
  [HUB_TYPE.HUB_3]: '#9b9b9b',
  [HUB_TYPE.HUB_1]: '#9b9b9b',
}

export const ELE_CLASSNAMES = {
  HUB_PREVIEW: combineWithUniqId('hub-preview'),
  TOGGLE_HUB_PREVIEW_BUTTON: combineWithUniqId('toggle_hub_preview_button'),
}
