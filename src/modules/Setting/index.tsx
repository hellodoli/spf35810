import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import clsx from 'clsx'

import { locateSettingSelector } from 'modules/Form/selectors'
import { SETTING_LOCATE } from 'modules/Form/types'
import { routes } from 'utils/route-path'
import Locate from './Locate'
import Meta from './Meta'

const menus = [
  {
    id: 1,
    text: 'Vị trí',
    path: routes.settingLocate,
  },
  {
    id: 2,
    text: 'Đơn',
    path: routes.settingOrder,
  },
]

const Setting = () => {
  const curLocate = useSelector(locateSettingSelector)

  const [info, setInfo] = useState({
    locate: curLocate,
    isDirty: false,
  })

  const onChangeLocate = useCallback((locate: SETTING_LOCATE) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      locate,
      isDirty: true,
    }))
  }, [])

  return (
    <div className="flex-[0_0_auto] p-4 transition-all w-full">
      <div className="lg:flex overflow-hidden">
        <div className="flex-[0_0_auto] w-full lg:w-[30%] lg:p-4 overflow-hidden">
          <div className="flex lg:flex-col lg:gap-0 gap-2">
            {menus.map(({ id, path, text }) => {
              return (
                <NavLink
                  key={id}
                  to={path}
                  className={clsx(
                    'flex items-center justify-center',
                    'whitespace-nowrap',
                    'stardust-button-reset stardust-button stardust-button--secondary',
                    'first:mt-0 lg:mt-4',
                  )}
                  activeClassName="stardust-button--active-primary"
                >
                  {text}
                </NavLink>
              )
            })}
          </div>
        </div>

        <div className="flex-[0_0_auto] w-full lg:w-[70%] lg:p-4 ml-auto">
          <Switch>
            <Route
              path={routes.settingLocate}
              render={(props) => (
                <Locate
                  {...props}
                  locate={info.locate}
                  onChangeLocate={onChangeLocate}
                />
              )}
            />
          </Switch>

          <Meta locate={info.locate} />
        </div>
      </div>
    </div>
  )
}

export default Setting
