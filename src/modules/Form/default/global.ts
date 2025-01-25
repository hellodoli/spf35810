import { generateKey, getLSBoolValue } from './utils'

// 1. GLOBAL__EXPAND_ALL_HUBLIST_SUMMARY
const global_ExpandAllHubListSummary = generateKey({
  first: 'GLOBAL',
  content: 'EXPAND_ALL_HUBLIST_SUMMARY',
  defaultValue: true,
})
const get_Global_ExpandAllHubListSummary = () => {
  const { lsKey, defaultValue } = global_ExpandAllHubListSummary
  return getLSBoolValue(lsKey, defaultValue)
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
  return getLSBoolValue(lsKey, defaultValue)
}
export { get_Global_ExtraChildJoinOrder, global_ExtraChildJoinOrder }

// 3. GLOBAL__EXPAND_WEEK_REWARD
const global_ExpandWeekReward = generateKey({
  first: 'GLOBAL',
  content: 'EXPAND_WEEK_REWARD',
  defaultValue: true,
})
const get_Global_ExpandWeekReward = () => {
  const { lsKey, defaultValue } = global_ExpandWeekReward
  return getLSBoolValue(lsKey, defaultValue)
}
export { get_Global_ExpandWeekReward, global_ExpandWeekReward }
