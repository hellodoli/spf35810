import React, { useCallback, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isOpenDbSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { FORM_ACTION, Hub } from 'modules/Form/types'
import { routes } from 'utils/route-path'

import { selectHubById } from 'db'
import Fill from './Fill'

const Update = () => {
  const dispatch = useDispatch()
  const params = useParams<{ id?: string }>()
  const isOpenDb = useSelector(isOpenDbSelector)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Hub | null>(null)

  const fetchData = useCallback(async (hubId: string) => {
    dispatch(actions.openIsOpenPreview())
    try {
      const response = await selectHubById(hubId)
      const hub = response?.data
      if (hub) {
        dispatch(
          actions.changeHubDetail({
            hub,
          }),
        )
        setData(hub)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const hubId = params.id
    if (isOpenDb && hubId) fetchData(hubId)
  }, [isOpenDb, params?.id])

  if (isLoading) {
    /**
     * add some loading here later.
     * note: add loading component.
     */
    return <div>...Loading</div>
  }
  if (!data) return <Redirect to={routes.notFoundHub} />
  return <Fill type={FORM_ACTION.EDIT} hubId={data.id} />
}

export default Update
