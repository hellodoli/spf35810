import { generateKey, getLocalStorage } from './utils'

// 1. GLOBAL__EXPAND_ALL_HUBLIST_SUMMARY
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
export { get_Global_ExpandAllHubListSummary, global_ExpandAllHubListSummary }

// 2. GLOBAL__EXTRA_CHILD_JOIN_ORDER
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
export { get_Global_ExtraChildJoinOrder, global_ExtraChildJoinOrder }
