import { SETTING_LOCATE } from 'modules/Form/types'

import { generateKey, getLocalStorage } from '../utils'

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
