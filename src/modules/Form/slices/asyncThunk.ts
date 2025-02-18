import { toast } from 'react-hot-toast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import * as db from 'db'
import {
  FORM_ACTION,
  Hub,
  HUB_DISPLAY,
  ResponseDataAsyncThunk,
  ResponseHubsAsyncThunk,
} from 'modules/Form/types'
import { RootState } from 'types'
import {
  getHubExtraIncome,
  getIncludeAutoCompensate,
  getRangeTimeMyHubs,
} from 'utils/hub'
import { getCompensate_Hub } from 'utils/income'
import { getNoEmptyJoins } from 'utils/join'

import { actions } from './'

function showLogToast({
  isSuccess,
  successText = 'Thành công',
  errorText = 'Thất bại',
}: {
  isSuccess: boolean
  successText?: string
  errorText?: string
}) {
  if (isSuccess) {
    toast.success(successText)
  } else {
    toast.error(errorText)
  }
}

const getHubsByHubTime = createAsyncThunk<ResponseHubsAsyncThunk<Hub>, number>(
  'form/getHubsByHubTime',
  async (hubTime) => {
    const response = await db.selectHubsByHubTime(hubTime)
    return response as ResponseHubsAsyncThunk<Hub>
  },
)

interface AddHubAsThunkProps {
  type?: FORM_ACTION
  hubId?: string
}
const modifyHub = createAsyncThunk(
  'form/addHub',
  async (
    { type = FORM_ACTION.ADD, hubId = '' }: AddHubAsThunkProps,
    { getState, dispatch },
  ) => {
    const state = getState() as RootState
    if (state?.form) {
      const {
        hubType,
        hubShift,
        hubTime,
        order,
        isHubWellDone,
        settings,
        hubAdvancedOpt,
        extraIncomeArr,
      } = state.form
      const joins = getNoEmptyJoins([...Object.values(state.form.joins)])
      const orderCompensate = settings['ORDER_COMPENSATE_NUMBER'][hubType]
      const extraIncome = getHubExtraIncome(extraIncomeArr)
      const includeAutoCompensate = getIncludeAutoCompensate(
        hubAdvancedOpt.includeAutoCompensate,
      )
      const orderPrice = settings['ORDER_PRICE']['DEFAULT']
      const loc = settings['LOCATE']

      const compensateHub = getCompensate_Hub({
        hubType,
        joins,
        order,
        orderPrice,
        orderCompensate,
        extraIncomePrice: extraIncome,
        isHubWellDone,
        includeAutoCompensate,
        loc,
      })
      const isAutoCompensate = compensateHub.isCompensate
      const hub: Hub = {
        id: hubId,
        hubType,
        hubShift,
        hubTime,
        order,
        isHubWellDone,
        joins,
        isAutoCompensate,
        hubAdvancedOpt,
        extraIncomeArr,
      }
      console.log('modifyHub: ', { form: state.form, hub, type, joins })
      const response =
        type === FORM_ACTION.ADD
          ? ((await db.addHub({
              hub: { ...hub, id: uuidv4() },
              blob: undefined,
            })) as ResponseHubsAsyncThunk<Hub>)
          : ((await db.updateHub({
              hub,
              blob: undefined,
            })) as ResponseHubsAsyncThunk<Hub>)

      const { isSuccess } = response
      if (isSuccess) {
        const hubTime = state.form.hubTime
        if (type === FORM_ACTION.ADD) {
          dispatch(getHubsByHubTime(hubTime))
          dispatch(actions.changeHubShift({ shift: '' }))
          toast.success('Thêm ca hub thành công')
        } else if (type === FORM_ACTION.EDIT) {
          dispatch(getHubsByHubTime(hubTime))
          toast.success('Cập nhật ca hub thành công')
        }
      } else {
        toast.error('Thêm ca hub thất bại. Hãy thử lại sau nhé.')
      }
      return null
    }
    return null
  },
)

const getMyHubs = createAsyncThunk<
  ResponseHubsAsyncThunk<Hub>,
  {
    start?: number
    end?: number
    type: HUB_DISPLAY
  }
>('form/getMyHubs', async (params) => {
  const { start = 0, end = 0, type } = params
  const autoRangeTime = getRangeTimeMyHubs(type)
  const response = await db.selectHubsByRangeTime(
    start || autoRangeTime.start,
    end || autoRangeTime.end,
  )
  return response as ResponseHubsAsyncThunk<Hub>
})

interface DeleteHubByIdData {
  hubId: string
  date: string
}
interface DeleteHubByIdProps {
  id: string
  date: string
}
const deleteHubById = createAsyncThunk<
  ResponseDataAsyncThunk<DeleteHubByIdData>,
  DeleteHubByIdProps
>('form/deleteHubById', async (params) => {
  const { id, date } = params
  const response = await db.deleteHubById(id, date)
  const { isSuccess } = response
  // log toast
  showLogToast({
    isSuccess,
    errorText: 'Xóa ca hub thất bại',
    successText: 'Xóa ca hub thành công',
  })
  return response as ResponseDataAsyncThunk<DeleteHubByIdData>
})

interface DeleteHubByDateData {
  date: string
  ids: string[]
}
interface DeleteHubByDateProps {
  date: string
}
const deleteHubByDate = createAsyncThunk<
  ResponseDataAsyncThunk<DeleteHubByDateData>,
  DeleteHubByDateProps
>('form/deleteHubByDate', async (params, { getState }) => {
  const { date } = params
  const state = getState() as RootState
  const hubsByDate = state.form?.myHubs?.[date]
  if (hubsByDate) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialValue: Promise<any>[] = []
    const hubs = [...Object.values(hubsByDate)]
    const ids = hubs.map((hub) => hub.id)
    const promises = ids.reduce((promiseArr, id) => {
      const promise = db.deleteHubById(id, date)
      promiseArr.push(promise)
      return promiseArr
    }, initialValue)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responses = await Promise.all(promises)
    // log toast
    showLogToast({
      isSuccess: true,
      successText: 'Xóa ca hub thành công',
    })
    return {
      data: { date, ids },
      isError: false,
      isSuccess: true,
    } as ResponseDataAsyncThunk<DeleteHubByDateData>
  }
  // FAILED: dont have date in data
  return {
    data: { date, ids: [] },
    isError: true,
    isSuccess: false,
  } as ResponseDataAsyncThunk<DeleteHubByDateData>
})

export {
  deleteHubByDate,
  deleteHubById,
  getHubsByHubTime,
  getMyHubs,
  modifyHub,
}
