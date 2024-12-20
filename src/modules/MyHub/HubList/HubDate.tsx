import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppDispatch } from 'configStore'

import { ReactComponent as TrashIcon } from 'assets/icons/trash-alt.svg'
import ExpandBtn from 'components/ExpandBtn'
import {
  filterHubTypeSelector,
  isExpandAllHubListSummarySelector,
  makeMyHubByHubTime,
} from 'modules/Form/selectors'
import * as asThunk from 'modules/Form/slices/asyncThunk'
import { getFilter_Hubs } from 'utils/income'
import { routes } from 'utils/route-path'
import { getDisplayDate } from 'utils/time'
import HubItem from './HubItem'
import Price from './Price'

interface Props {
  date?: string
}

const HubDate = ({ date = '' }: Props) => {
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()

  const isExpandAllHub = useSelector(isExpandAllHubListSummarySelector)
  const filters = useSelector(filterHubTypeSelector)

  const myHubByHubTime = useMemo(makeMyHubByHubTime, [])
  const hubsByDate = useSelector((state) => myHubByHubTime(state, +date))

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

  const [toggle, setToggle] = useState(isExpandAllHub)

  const onClickHubItem = useCallback((hubId: string) => {
    history.push(`${routes.hub}/${hubId}`)
  }, [])

  const onHandleDeleteHubByDate = useCallback(() => {
    dispatch(
      asThunk.deleteHubByDate({
        date,
      }),
    )
  }, [date])

  const deleteHubDate = () => {
    if (window.confirm) {
      const text = `Bạn có muốn xóa toàn bộ ca hub ngày ${displayDate} ?`
      const confirm = window.confirm(text)
      if (confirm) {
        onHandleDeleteHubByDate()
      }
    }
  }

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

  return (
    <div className="hub-date mb-6 last:mb-0 p-2 border-line" data-date={date}>
      <div className="date mb-2 text-base flex items-center">
        <strong>{displayDate}</strong>
        {hasData && (
          <>
            <ExpandBtn
              isDetail={toggle}
              toggleDetail={toggleDetail}
              textHide="(Ẩn)"
              textShow="(Xem thống kê ngày)"
            />
            <span
              className="ml-auto cursor-pointer p-1"
              onClick={deleteHubDate}
            >
              <TrashIcon fill="rgba(0, 0, 0, 0.8)" width={14} height={14} />
            </span>
          </>
        )}
      </div>

      {!hasData && (
        <div className="text-center p-4 my-2">Không có ca hub nào.</div>
      )}

      {toggle && hasData && (
        <div className="mb-2">
          <Price hubs={hubs} unixDate={+date} />
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
