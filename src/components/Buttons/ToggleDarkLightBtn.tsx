import React, { useMemo, useState } from 'react'
import clsx from 'clsx'

import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg'
import { ReactComponent as SunIcon } from 'assets/icons/sun.svg'
import { COLOR_THEME } from 'modules/Form/types/enum'
import { getTheme, toggleTheme } from 'utils/theme'

const ToggleDarkLightBtn = ({ iconOnly = false }: { iconOnly?: boolean }) => {
  const [theme, setTheme] = useState(() => getTheme())

  const t = useMemo(() => {
    const isDark = theme === COLOR_THEME.DARK
    return {
      icon: isDark ? MoonIcon : SunIcon,
      text: isDark ? 'Dark' : 'Light',
    }
  }, [theme])

  const afterToggleCallback = (nextTheme: COLOR_THEME) => {
    setTheme(nextTheme)
  }

  const toggle = () => {
    toggleTheme(afterToggleCallback)
  }

  const Icon = t.icon

  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary',
        'flex items-center justify-center',
        'prose-spf prose-slate dark:prose-dark',
      )}
      onClick={toggle}
    >
      <Icon width={12} height={12} fill="currentColor" />
      {!iconOnly && <span className="ml-1">{t.text}</span>}
    </button>
  )
}

export default ToggleDarkLightBtn
