import { COLOR_THEME } from 'modules/Form/types/enum'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  STORAGE_KEYS,
} from './storages'

const setDark = () => {
  document.documentElement.classList.add('dark')
  setLocalStorage(STORAGE_KEYS.COLOR_THEME, COLOR_THEME.DARK)
}
const setLight = () => {
  document.documentElement.classList.remove('dark')
  setLocalStorage(STORAGE_KEYS.COLOR_THEME, COLOR_THEME.LIGHT)
}
const toggleDarkMode = (isDark: boolean) => {
  if (isDark) setLight()
  else setDark()
}

export const getTheme = () => {
  const theme = getLocalStorage(STORAGE_KEYS.COLOR_THEME)
  if (
    !theme ||
    (theme && theme !== COLOR_THEME.DARK && theme !== COLOR_THEME.LIGHT)
  ) {
    removeLocalStorage(STORAGE_KEYS.COLOR_THEME)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? COLOR_THEME.DARK
      : COLOR_THEME.LIGHT
  }
  return theme as COLOR_THEME
}

export const toggleTheme = (callback?: (nextTheme: COLOR_THEME) => void) => {
  const theme = getLocalStorage(STORAGE_KEYS.COLOR_THEME)
  const isDark = !theme
    ? document.documentElement.classList.contains('dark')
    : theme === COLOR_THEME.DARK
  const nextTheme = isDark ? COLOR_THEME.LIGHT : COLOR_THEME.DARK
  toggleDarkMode(isDark)
  callback?.(nextTheme)
}
