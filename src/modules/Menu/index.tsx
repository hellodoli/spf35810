import React from 'react'
import { useHistory } from 'react-router-dom'
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
    id: 4,
    text: 'Thống kê nâng cao (sắp ra mắt)',
    path: '',
    disabled: true,
  },
]

const Menu = () => {
  const history = useHistory()
  const onClick = (path: string) => {
    history.push(path)
  }
  return (
    <div className="flex items-center justify-center w-full h-[100vh] overflow-hidden">
      <div className="inline-flex flex-col justify-center gap-4">
        {menus.map((item) => {
          return (
            <button
              key={item.id}
              className="stardust-button-reset stardust-button stardust-button--primary stardust-button--wide"
              onClick={() => onClick(item.path)}
              disabled={item.disabled}
            >
              <span>{item.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Menu
