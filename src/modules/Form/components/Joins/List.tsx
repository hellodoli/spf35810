import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import Switch from 'components/Switch'
import {
  get_SettingsDefault_PlainUI,
  settingsDefault_PlainUI,
} from 'modules/Form/default'
import { joinsSelector } from 'modules/Form/selectors'
import { setLocalStorage } from 'utils/storages'

import Join from '../Join'

const plainUIDefault = get_SettingsDefault_PlainUI()

const ListJoin = () => {
  const joins = useSelector(joinsSelector)
  const [isPlainUI, setIsPlainUI] = useState(plainUIDefault)

  const onChangeChecked = useCallback((nextIsPlainUI: boolean) => {
    setIsPlainUI(nextIsPlainUI)
    setLocalStorage(settingsDefault_PlainUI.lsKey, `${nextIsPlainUI}`)
  }, [])

  return (
    <>
      {!!joins.length && (
        <div className="mb-1 lg:w-fit w-full mr-auto text-xs border-line p-1">
          <Switch
            text="Giao diện đơn giản: "
            labelClassName="prose-spf prose-slate dark:prose-dark font-bold mr-2"
            checked={plainUIDefault}
            onChangeChecked={onChangeChecked}
          />
        </div>
      )}
      <div className="joins-list mb-4 empty:mb-0">
        {joins.map((join) => (
          <Join key={join.key} joinOrder={join} isPlainUI={isPlainUI} />
        ))}
      </div>
    </>
  )
}

export default memo(ListJoin)
