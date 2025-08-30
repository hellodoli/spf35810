import React from 'react'

import { WEEK_REWARD, WEEK_REWARD_REST_KEY } from 'modules/Form/constants'
import { SETTING_LOCATE } from 'modules/Form/types'
import Table from './Table'

interface Props {
  curLocate: SETTING_LOCATE
}

const getHubTimesConsume = () => {
  return Object.keys(WEEK_REWARD)
    .filter((k) => k !== WEEK_REWARD_REST_KEY)
    .map((k) => Number(k))
    .sort((a, b) => b - a)
}

const LAST_WEEK_REWARD = WEEK_REWARD[`${getHubTimesConsume()[0]}`]

const WeekReward = ({ curLocate }: Props) => {
  return (
    <Table
      curLocate={curLocate}
      extraRewardList={LAST_WEEK_REWARD}
      title="Số ca hoạt động đạt kpi/tuần"
      subTitle="Nhận thêm"
      unit="ca"
    />
  )
}

export default WeekReward
