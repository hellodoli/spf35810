import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { locateSettingSelector } from 'modules/Form/selectors'
import { SETTING_LOCATE } from 'modules/Form/types'
import { routes } from 'utils/route-path'
import Locate from './Locate'
import Meta from './Meta'
import Order from './Order'

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
  const history = useHistory()
  const location = useLocation()
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
            {menus.map(({ id, text, path }) => {
              return (
                <button
                  key={id}
                  className={clsx(
                    'flex items-center justify-center',
                    'whitespace-nowrap',
                    'stardust-button-reset stardust-button stardust-button--secondary',
                    'first:mt-0 lg:mt-4',
                    {
                      'stardust-button--active-primary':
                        location.pathname === path,
                    },
                  )}
                  onClick={() => history.replace(path)}
                >
                  {text}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-[0_0_auto] w-full lg:w-[70%] lg:p-4 ml-auto">
          <div className="border-line py-4 px-2 mt-4 lg:mt-0 mb-4">
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
              <Route path={routes.settingOrder} component={Order} />
            </Switch>
          </div>

          <Meta locate={info.locate} />
        </div>
      </div>
    </div>
  )
}

export default Setting
