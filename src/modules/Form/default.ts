import { SETTING_LOCATE } from './types'
import { getLocalStorage } from 'utils/storages'

function generateKey<T>({
  first,
  content,
  defaultValue,
}: {
  first: string
  content: string
  defaultValue: T
}) {
  const key = `${first}__${content}`
  const lsKey = `${key}__LS_KEY`
  return {
    key,
    lsKey,
    defaultValue,
  }
}

// 1. SETTINGS_DEFAULT__LOCATE
const settingsDefault_Locate = generateKey({
  first: 'SETTINGS_DEFAULT',
  content: 'LOCATE',
  defaultValue: SETTING_LOCATE.TPHCM,
})
const get_SettingsDefault_Locate = () => {
  const locate = getLocalStorage(settingsDefault_Locate.lsKey)
  if (locate && locate in SETTING_LOCATE) return locate as SETTING_LOCATE
  return settingsDefault_Locate.defaultValue
}
export { settingsDefault_Locate, get_SettingsDefault_Locate }

// 2. GLOBAL__EXPAND_ALL_HUBLIST_SUMMARY
const global_ExpandAllHubListSummary = generateKey({
  first: 'GLOBAL',
  content: 'EXPAND_ALL_HUBLIST_SUMMARY',
  defaultValue: true,
})
const get_Global_ExpandAllHubListSummary = () => {
  const { lsKey, defaultValue } = global_ExpandAllHubListSummary
  const expandAllHublistSummary = getLocalStorage(lsKey)
  if (expandAllHublistSummary === 'true' || expandAllHublistSummary === 'false')
    return expandAllHublistSummary === 'true' ? true : false
  return defaultValue
}
export { global_ExpandAllHubListSummary, get_Global_ExpandAllHubListSummary }

// 3. GLOBAL__EXTRA_CHILD_JOIN_ORDER
const global_ExtraChildJoinOrder = generateKey({
  first: 'GLOBAL',
  content: 'EXTRA_CHILD_JOIN_ORDER',
  defaultValue: true,
})
const get_Global_ExtraChildJoinOrder = () => {
  const { lsKey, defaultValue } = global_ExtraChildJoinOrder
  const extraChildJoinOrder = getLocalStorage(lsKey)
  if (extraChildJoinOrder === 'true' || extraChildJoinOrder === 'false')
    return extraChildJoinOrder === 'true' ? true : false
  return defaultValue
}
export { global_ExtraChildJoinOrder, get_Global_ExtraChildJoinOrder }
