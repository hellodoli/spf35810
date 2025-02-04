import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ExpandBtn from 'components/Buttons/ExpandBtn'
import {
  displayMyHubTypeSelector,
  rangeTimeEndSelector,
  rangeTimeStartSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { HUB_DISPLAY } from 'modules/Form/types'
import { getRangeTimeMyHubs } from 'utils/hub'
import { getDisplayDate } from 'utils/time'

const unknowTimeMark = '---'

const DisplayTemplate = ({
  startString = '',
  endString = '',
  children,
}: {
  startString?: string
  endString?: string
  children?: React.ReactNode
}) => {
  if (startString === endString) {
    return (
      <div>
        Bạn đang xem dữ liệu ca hub ngày
        <strong className="ml-1">{startString}</strong>.{}
      </div>
    )
  }
  return (
    <div>
      Bạn đang xem dữ liệu ca hub từ
      <strong className="mx-1">{startString}</strong>
      đến ngày<strong className="ml-1">{endString}</strong>.{children || null}
    </div>
  )
}

const DateSelectNote = () => {
  const dispatch = useDispatch()
  const displayMyHubType = useSelector(displayMyHubTypeSelector)
  const start = useSelector(rangeTimeStartSelector)
  const end = useSelector(rangeTimeEndSelector)
  const range = getRangeTimeMyHubs(displayMyHubType)
  const isCustom = displayMyHubType === HUB_DISPLAY.D_CUSTOM

  const resetRangeTime = useCallback(() => {
    dispatch(actions.resetRangeTime())
  }, [])

  if (isCustom) {
    const startString = start ? getDisplayDate(new Date(start)) : unknowTimeMark
    const endString = end ? getDisplayDate(new Date(end)) : unknowTimeMark
    return (
      <div className="hub-DateSelectNote">
        <DisplayTemplate startString={startString} endString={endString}>
          {start && end ? (
            <div className="mt-2 italic text-xs">
              <ExpandBtn
                isDetail={true}
                toggleDetail={resetRangeTime}
                isMarginLeft={false}
                textHide="(Bấm vào đây để chọn lại)"
              />
            </div>
          ) : null}
        </DisplayTemplate>
        {!start && !end ? (
          <div className="mt-2 text-xs italic">
            <span className="italic">
              (*Hướng dẫn:
              <strong>Hãy chọn 1 khoảng thời gian muốn xem trên lịch</strong>)
            </span>
          </div>
        ) : null}
      </div>
    )
  }
  if (range.start && range.end) {
    const startString = getDisplayDate(new Date(range.start))
    const endString = getDisplayDate(new Date(range.end))
    return <DisplayTemplate startString={startString} endString={endString} />
  }
  return null
}

export default DateSelectNote
