import React, { useMemo, memo, useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'configStore'
import { HUB_TYPE } from 'modules/Form/types'
import {
  makeMyHubByHubTime,
  isExpandAllHubListSummarySelector,
  filterHubTypeHub1Selector,
  filterHubTypeHub3Selector,
  filterHubTypeHub5Selector,
  filterHubTypeHub8Selector,
  filterHubTypeHub10Selector,
} from 'modules/Form/selectors'
import * as asThunk from 'modules/Form/slices/asyncThunk'

import { routes } from 'utils/route-path'
import { getDisplayDate } from 'utils/time'

import ExpandBtn from 'components/ExpandBtn'
import HubItem from './HubItem'
import Price from './Price'

interface Props {
  date?: string
}

const HubDate = ({ date = '' }: Props) => {
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const isExpandAllHub = useSelector(isExpandAllHubListSummarySelector)

  const filter_1 = useSelector(filterHubTypeHub1Selector)
  const filter_3 = useSelector(filterHubTypeHub3Selector)
  const filter_5 = useSelector(filterHubTypeHub5Selector)
  const filter_8 = useSelector(filterHubTypeHub8Selector)
  const filter_10 = useSelector(filterHubTypeHub10Selector)

  const myHubByHubTime = useMemo(makeMyHubByHubTime, [])
  const hubsByDate = useSelector((state) => myHubByHubTime(state, +date))
  const hubs = useMemo(() => {
    return hubsByDate.filter((hub) => {
      if (
        (!filter_1 && hub.hubType === HUB_TYPE.HUB_1) ||
        (!filter_3 && hub.hubType === HUB_TYPE.HUB_3) ||
        (!filter_5 && hub.hubType === HUB_TYPE.HUB_5) ||
        (!filter_8 && hub.hubType === HUB_TYPE.HUB_8) ||
        (!filter_10 && hub.hubType === HUB_TYPE.HUB_10)
      )
        return false
      return true
    })
  }, [hubsByDate, filter_1, filter_3, filter_5, filter_8, filter_10])

  const [toggle, setToggle] = useState(isExpandAllHub)

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

  const toggleDetail = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [])

  useEffect(() => {
    setToggle(isExpandAllHub)
  }, [isExpandAllHub])

  if (!hubs.length) {
    return <div className="text-center p-4 my-8">Không có ca hub nào.</div>
  }
  return (
    <div className="hub-date mb-6 last:mb-0 p-2 border-line" data-date={date}>
      <div className="date mb-2 text-base">
        <strong>{getDisplayDate(new Date(+date))}</strong>
        <ExpandBtn
          isDetail={toggle}
          toggleDetail={toggleDetail}
          textHide="(Ẩn)"
          textShow="(Xem thống kê ngày)"
        />
      </div>

      {toggle && (
        <div className="mb-2">
          <Price hubs={hubs} />
        </div>
      )}

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
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(HubDate)
