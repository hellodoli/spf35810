import { actions } from 'modules/Form/slices'
import { getHubsByHubTime } from 'modules/Form/slices/asyncThunk'

import store from '../configStore'
import { RootState } from '../types'

export const getDispatch = () => store.dispatch

export const getState = (): RootState => store.getState() as RootState

export const dispatchChangeIsOpenDb = (isOpenDb: boolean) => {
  const dispatch = getDispatch()
  if (dispatch) {
    dispatch(
      actions.changeIsOpenDb({
        isOpenDb,
      }),
    )
  }
}

export const dispatchGetHubsByHubTime = () => {
  const dispatch = getDispatch()
  const state = getState()
  const hubTime = state.form?.hubTime
  if (dispatch && hubTime) {
    dispatch(getHubsByHubTime(hubTime))
  }
}
