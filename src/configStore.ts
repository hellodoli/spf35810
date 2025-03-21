import { configureStore, StoreEnhancer } from '@reduxjs/toolkit'
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'

import { createReducer } from './reducers'

const reduxSagaMonitorOptions = {}
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
const { run: runSaga } = sagaMiddleware

const enhancers = [
  createInjectorsEnhancer({
    createReducer,
    runSaga,
  }),
] as StoreEnhancer[]

const store = configureStore({
  reducer: createReducer(),
  // middleware: []
  enhancers,
})

export type AppDispatch = typeof store.dispatch
export default store
