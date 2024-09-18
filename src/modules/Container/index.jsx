import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom'

import { openDb } from 'db'

import { useSlice } from 'modules/Form/slices/useSlice'
import { actions } from 'modules/Form/slices'
import { isCalPathName, routes } from 'utils/route-path'

import { Fill, FillCal } from 'modules/Form/components/Fill'
import Update from 'modules/Form/components/Update'

import BackToHome from 'modules/BackToHome'
import Menu from 'modules/Menu'
import MyHub from 'modules/MyHub'

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
  console.log('re-render <Container>')
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
        <Route path={routes.notFoundHub} component={NotFoundHub} />
        <Route component={BackToHome} />
      </Switch>
    </>
  )
}

export default Container
