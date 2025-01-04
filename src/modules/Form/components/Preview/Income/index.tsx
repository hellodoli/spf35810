import React, { memo } from 'react'

import Main from './Main'
import SettingHeader from './SettingHeader'

const Income = () => {
  return (
    <div className="order-preview text-base p-2">
      <SettingHeader />
      <Main />
    </div>
  )
}

export default memo(Income)
