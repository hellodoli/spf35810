import React, { memo } from 'react'

import { ReactComponent as CalendarXmark } from 'assets/icons/calendar-xmark.svg'
import { ReactComponent as Dolly } from 'assets/icons/dolly.svg'
import { ReactComponent as Envira } from 'assets/icons/envira.svg'
import { ReactComponent as Shield } from 'assets/icons/shield-halved.svg'
import { HUB_COLORS } from 'modules/Form/constants'
import { HUB_TYPE, JoinOrder, SETTING_LOCATE } from 'modules/Form/types'
import { getTotalOrderOfJoins } from 'utils/join'
import { getPriceExtraOrder } from 'utils/price'
import { getDisplayDate } from 'utils/time'

interface Props {
  id: string
  hubShift: string
  hubType: HUB_TYPE
  hubTime: number
  isDisabledClicked?: boolean
  onClick?: (hubId: string) => void
  onHandleDeleteHub?: (hubId: string) => void
  isHubWellDone: boolean
  isAutoCompensate?: boolean
  joins: JoinOrder[]
  loc: SETTING_LOCATE
  isIncludeWeekReward: boolean
  isHubShort: boolean
}

const HubItem = ({
  id,
  hubShift,
  hubType,
  hubTime,
  isDisabledClicked = false,
  onClick,
  onHandleDeleteHub,
  isHubWellDone,
  isAutoCompensate = false,
  joins,
  loc,
  isIncludeWeekReward,
  isHubShort,
}: Props) => {
  const [start, end] = hubShift.split('_')
  const label = `${start} - ${end}`
  const statusColor = HUB_COLORS[hubType]

  const iconProps = {
    width: 14,
    height: 14,
    fill: statusColor,
    className: 'mr-2',
  }

  const extraJoinOrder = getPriceExtraOrder({
    hubType,
    order: getTotalOrderOfJoins(joins),
    isJoin: true,
    loc,
    isHubShort,
  })

  const onHandleClick = () => {
    if (isDisabledClicked) return
    onClick?.(id)
  }

  const onClickDeleteHub = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    if (window.confirm) {
      const text = `Bạn có muốn xóa ca hub ${hubType} [${label}] ngày ${getDisplayDate(new Date(hubTime))} ?`
      const confirm = window.confirm(text)
      if (confirm) {
        onHandleDeleteHub?.(id)
      }
    }
  }

  return (
    <div className="flex-[0_0_auto] p-1 lg:w-1/3">
      <div
        className="hub-item flex items-center cursor-pointer p-2 rounded-lg border-line h-[40px] stardust-button-reset stardust-button stardust-button--secondary"
        style={{
          borderStyle: isHubWellDone ? 'solid' : 'dashed',
          borderColor: statusColor,
        }}
        onClick={onHandleClick}
      >
        {extraJoinOrder.totalOrderCount > 0 && !isAutoCompensate && (
          <Envira {...iconProps} />
        )}
        {isAutoCompensate && <Shield {...iconProps} />}
        {!isIncludeWeekReward && <CalendarXmark {...iconProps} />}
        {isHubShort && <Dolly {...iconProps} />}

        <span className="leading-normal">{label}</span>
        <span
          className="lg:hidden delete-button ml-2 lg:ml-auto rounded-full w-[16px] h-[16px] flex items-center justify-center cursor-pointer border-line p-1 text-xs select-none"
          onClick={onClickDeleteHub}
        >
          x
        </span>
      </div>
    </div>
  )
}

export default memo(HubItem)
