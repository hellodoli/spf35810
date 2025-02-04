import { SETTING_LOCATE, Settings } from 'modules/Form/types'

import { generateKey, getLocalStorage, getLSBoolValue } from '../utils'

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
export { get_SettingsDefault_Locate, settingsDefault_Locate }

// 2. SETTINGS_DEFAULT__QUICK_ADD_JOINS
const quickAddJoins_defaultValue: Settings['QUICK_ADD_JOINS'] = [
  { key: `quickAddBtns_2_20090`, type: 2, order: 1, price: 20090 },
  { key: `quickAddBtns_3_31135`, type: 3, order: 1, price: 31135 },
]
const settingsDefault_QuickAddJoins = generateKey({
  first: 'SETTINGS_DEFAULT',
  content: 'QUICK_ADD_JOINS',
  defaultValue: quickAddJoins_defaultValue,
})
const get_SettingsDefault_QuickAddJoins = () => {
  const isValidQuickAddJoins = (quickAddJoins: unknown) => {
    if (
      Array.isArray(quickAddJoins) &&
      quickAddJoins.length &&
      quickAddJoins.every((join) => {
        if (
          typeof join?.key === 'string' &&
          typeof join?.type === 'number' &&
          typeof join?.order === 'number' &&
          typeof join?.price === 'number'
        )
          return true
        return false
      })
    )
      return true
    return false
  }
  const { lsKey, defaultValue } = settingsDefault_QuickAddJoins
  const quickAddJoinsStr = getLocalStorage(lsKey) || ''
  try {
    const quickAddJoins = JSON.parse(quickAddJoinsStr)
    if (isValidQuickAddJoins(quickAddJoins))
      return quickAddJoins as Settings['QUICK_ADD_JOINS']
    return defaultValue
  } catch (error) {
    return defaultValue
  }
}

export { get_SettingsDefault_QuickAddJoins, settingsDefault_QuickAddJoins }

// 3. SETTINGS_DEFAULT__PLAIN_UI
/**
 * LATER: move this block to `default/global`
 */
const settingsDefault_PlainUI = generateKey({
  first: 'SETTINGS_DEFAULT',
  content: 'PLAIN_UI',
  defaultValue: false,
})
const get_SettingsDefault_PlainUI = () => {
  return getLSBoolValue(
    settingsDefault_PlainUI.lsKey,
    settingsDefault_PlainUI.defaultValue,
  )
}
export { get_SettingsDefault_PlainUI, settingsDefault_PlainUI }
