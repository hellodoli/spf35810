import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

import { openDb } from 'db'
import BackToHome from 'modules/BackToHome'
import { Fill, FillCal } from 'modules/Form/components/Fill'
import Update from 'modules/Form/components/Update'
import { actions } from 'modules/Form/slices'
import { useSlice } from 'modules/Form/slices/useSlice'
import Menu from 'modules/Menu'
import MyHub from 'modules/MyHub'
import Setting from 'modules/Setting'
import { isCalPathName, routes } from 'utils/route-path'

openDb()

const NotFoundHub = () => {
  return <BackToHome text="Ooop! Không tìm thấy ca hub." notFoundHub={true} />
}

const Watcher = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(
      actions.changeIsCalMode({
        isCalMode: isCalPathName(location.pathname),
      }),
    )
  }, [location.pathname])
}

const Container = () => {
  useSlice()
  return (
    <>
      <Watcher />
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path={routes.add} component={Fill} />
        <Route path={routes.detailHub} component={Update} />
        <Route path={routes.cal} component={FillCal} />
        <Route path={routes.myHub} component={MyHub} />
        <Route path={routes.setting} component={Setting} />
        <Route path={routes.notFoundHub} component={NotFoundHub} />
        <Route component={BackToHome} />
      </Switch>
    </>
  )
}

export default Container
