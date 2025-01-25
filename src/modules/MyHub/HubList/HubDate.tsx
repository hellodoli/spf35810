import React, { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppDispatch } from 'configStore'

import {
  filterHubTypeSelector,
  isExpandAllHubSelector,
  locateSettingSelector,
  makeMyHubByHubTime,
} from 'modules/Form/selectors'
import * as asThunk from 'modules/Form/slices/asyncThunk'
import { getFilter_Hubs } from 'utils/income'
import { routes } from 'utils/route-path'
import { getDisplayDate } from 'utils/time'
import HubItem from './HubItem'
import Meta from './Meta'
import Price from './Price'

interface Props {
  date?: string
}

const HubDate = ({ date = '' }: Props) => {
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()

  const loc = useSelector(locateSettingSelector)
  const filters = useSelector(filterHubTypeSelector)
  const myHubByHubTime = useMemo(makeMyHubByHubTime, [])
  const hubsByDate = useSelector((state) => myHubByHubTime(state, +date))
  const isExpandAllHub = useSelector(isExpandAllHubSelector)

  const [toggle, setToggle] = useState(isExpandAllHub)
  const [isOpenViewDetailIncome, setIsOpenViewDetailIncome] = useState(false)

  const hubs = useMemo(
    () =>
      getFilter_Hubs({
        hubs: hubsByDate,
        filters,
      }),
    [hubsByDate, filters],
  )
  const displayDate = useMemo(
    () => getDisplayDate(new Date(+date), true),
    [date],
  )
  const hasData = !!hubs.length

  const onClickHubItem = useCallback((hubId: string) => {
    history.push(`${routes.hub}/${hubId}`)
  }, [])

  const onHandleDeleteHub = useCallback(
    (hubId: string) => {
      dispatch(
        asThunk.deleteHubById({
          id: hubId,
          date,
        }),
      )
    },
    [date],
  )

  return (
    <div className="hub-date mb-6 last:mb-0 p-2 border-line" data-date={date}>
      <div className="date mb-2 text-base flex items-center">
        <strong>{displayDate}</strong>
        {hasData && (
          <Meta
            date={date}
            toggle={toggle}
            setToggle={setToggle}
            isOpenViewDetailIncome={isOpenViewDetailIncome}
            setIsOpenViewDetailIncome={setIsOpenViewDetailIncome}
          />
        )}
      </div>

      {!hasData && (
        <div className="text-center p-4 my-2">Không có ca hub nào.</div>
      )}

      {toggle && hasData && (
        <div className="mb-2">
          <Price
            hubs={hubs}
            unixDate={+date}
            isOpenViewDetailIncome={isOpenViewDetailIncome}
          />
        </div>
      )}

      {hasData && (
        <div className="py-2">
          <div className="flex flex-wrap -m-1">
            {hubs.map((hub) => {
              return (
                <HubItem
                  key={hub.id}
                  id={hub.id}
                  hubShift={hub.hubShift}
                  hubType={hub.hubType}
                  hubTime={hub.hubTime}
                  onClick={onClickHubItem}
                  onHandleDeleteHub={onHandleDeleteHub}
                  isHubWellDone={hub.isHubWellDone}
                  isAutoCompensate={hub.isAutoCompensate}
                  joins={hub.joins}
                  loc={loc}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(HubDate)
