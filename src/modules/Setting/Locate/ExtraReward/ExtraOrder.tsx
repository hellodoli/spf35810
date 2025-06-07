import React from 'react'

import { EXTRA_ORDER, EXTRA_ORDER_WITH_HUB_SHORT } from 'modules/Form/constants'
import { SETTING_LOCATE } from 'modules/Form/types'
import Table from './Table'

interface Props {
  curLocate: SETTING_LOCATE
  isHubShort: boolean
}

const ExtraOrder = ({ curLocate, isHubShort }: Props) => {
  return (
    <Table
      curLocate={curLocate}
      extraRewardList={isHubShort ? EXTRA_ORDER_WITH_HUB_SHORT : EXTRA_ORDER}
      title="Tổng số đơn hoàn thành"
      subTitle="Nhận thêm (trên mỗi đơn)"
      unit="đơn"
    />
  )
}

export default ExtraOrder
