import React from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as GearIcon } from 'assets/icons/gear.svg'
import { ToggleDarkLightBtn } from 'components/Buttons'
import { routes } from 'utils/route-path'

const menus = [
  {
    id: 1,
    text: 'Thêm ca hub',
    path: routes.add,
  },
  {
    id: 2,
    text: 'Máy tính',
    path: routes.cal,
  },
  {
    id: 3,
    text: 'Hub của tôi',
    path: routes.myHub,
  },
  {
    id: 5,
    text: '',
    path: routes.settingLocate,
  },
]

const Menu = () => {
  const history = useHistory()

  const onClick = (path: string) => {
    history.push(path)
  }

  const renderLabel = (text: string, path: string) => {
    if (path === routes.settingLocate)
      return (
        <span>
          <GearIcon width={16} height={16} fill="#fff" />
        </span>
      )
    return <span>{text}</span>
  }

  return (
    <div className="flex items-center justify-center w-full h-[100vh] overflow-hidden">
      <div className="inline-flex flex-col justify-center gap-4">
        {menus.map(({ id, path, text }) => {
          return (
            <button
              key={id}
              className="flex items-center justify-center stardust-button-reset stardust-button stardust-button--primary stardust-button--wide whitespace-nowrap"
              onClick={() => onClick(path)}
            >
              {renderLabel(text, path)}
            </button>
          )
        })}
      </div>
      <div className="absolute bottom-12 left-auto right-auto">
        <ToggleDarkLightBtn />
      </div>
    </div>
  )
}

export default Menu
