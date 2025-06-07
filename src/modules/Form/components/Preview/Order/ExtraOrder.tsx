import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  isHubShortSelector,
  locateSettingSelector,
} from 'modules/Form/selectors'
import { HUB_TYPE } from 'modules/Form/types/enum'
import { getExtraOrderQtt } from 'utils/preview'
interface Props {
  order: number
  totalJoinsOrder: number
  hubType: HUB_TYPE
}

const ExtraOrder = ({ order, totalJoinsOrder, hubType }: Props) => {
  const isHubShort = useSelector(isHubShortSelector)
  const loc = useSelector(locateSettingSelector)
  const eO = useMemo(
    () =>
      getExtraOrderQtt({
        order,
        hubType,
        loc,
        isHubShort,
      }),
    [order, hubType, loc, isHubShort],
  )
  const eOJoin = useMemo(
    () =>
      getExtraOrderQtt({
        order: totalJoinsOrder,
        hubType,
        isJoin: true,
        loc,
        isHubShort,
      }),
    [totalJoinsOrder, hubType, loc, isHubShort],
  )

  const renderExtraOrderFromTo = (
    ex: {
      extraOrder: number
      extraOrderFrom: number
      extraOrderTo: number
    },
    isJoin = false,
  ) => {
    if (ex.extraOrder <= 0) return null
    const text = isJoin ? 'đơn con' : 'đơn'
    const isSingle = ex.extraOrderTo === ex.extraOrderFrom

    return (
      <span className="ml-1 text-sm">
        <span>{isSingle ? `( ${text}` : `( từ ${text}`}</span>
        <strong className="mx-1">{ex.extraOrderFrom}</strong>
        {!isSingle ? (
          <>
            <span>đến {text}</span>
            <strong className="mx-1">{ex.extraOrderTo}</strong>
            <span>)</span>
          </>
        ) : (
          <span>)</span>
        )}
      </span>
    )
  }

  return (
    <ul className="p-2 border-line -mt-[1px]">
      <li>
        <span>Số đơn vượt mốc:</span>
        <strong className="ml-1">{eO.extraOrder}</strong>
        {renderExtraOrderFromTo(eO)}
      </li>
      <li>
        <span>Số đơn con (của đơn ghép) vượt mốc:</span>
        <strong className="ml-1">{eOJoin.extraOrder}</strong>
        {renderExtraOrderFromTo(eOJoin)}
      </li>
    </ul>
  )
}

export default memo(ExtraOrder)
