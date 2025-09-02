import React from 'react'

import { WEEK_REWARD } from 'modules/Form/constants'
import { SETTING_LOCATE } from 'modules/Form/types'
import { getLastHubTimesConsume } from 'utils/hub'
import Table from './Table'

interface Props {
  curLocate: SETTING_LOCATE
}

const rewardList = WEEK_REWARD[getLastHubTimesConsume()]

const WeekReward = ({ curLocate }: Props) => {
  return (
    <Table
      curLocate={curLocate}
      extraRewardList={rewardList}
      title="Số ca hoạt động đạt kpi/tuần"
      subTitle="Nhận thêm"
      unit="ca"
    />
  )
}

export default WeekReward
