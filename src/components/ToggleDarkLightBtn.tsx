import React, { useState } from 'react'
import clsx from 'clsx'

import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg'
import { ReactComponent as SunIcon } from 'assets/icons/sun.svg'
import { COLOR_THEME } from 'modules/Form/types/enum'
import { getTheme, toggleTheme } from 'utils/theme'

const ToggleDarkLightBtn = () => {
  const [theme, setTheme] = useState(() => getTheme())

  const toggle = () => {
    toggleTheme((nextTheme) => {
      setTheme(nextTheme)
    })
  }

  return (
    <button
      className={clsx(
        'stardust-button-reset stardust-button stardust-button--secondary',
        'flex items-center justify-center',
        'prose-spf prose-slate dark:prose-dark',
      )}
      onClick={toggle}
    >
      {theme === COLOR_THEME.LIGHT ? (
        <SunIcon width={12} height={12} fill="currentColor" />
      ) : (
        <MoonIcon width={12} height={12} fill="currentColor" />
      )}
      <span className="ml-1">
        {theme === COLOR_THEME.LIGHT ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}

export default ToggleDarkLightBtn
