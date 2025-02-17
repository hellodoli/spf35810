import React from 'react'

import { EXTRA_ORDER } from 'modules/Form/constants'
import { SETTING_LOCATE } from 'modules/Form/types'
import Table from './Table'

interface Props {
  curLocate: SETTING_LOCATE
}

const ExtraOrder = ({ curLocate }: Props) => {
  return (
    <Table
      curLocate={curLocate}
      extraRewardList={EXTRA_ORDER}
      title="Tổng số đơn hoàn thành"
      subTitle="Nhận thêm (trên mỗi đơn)"
      unit="đơn"
    />
  )
}

export default ExtraOrder
