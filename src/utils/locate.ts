import { WEEK_REWARD, WEEK_REWARD_REST_KEY } from 'modules/Form/constants'
import {
  RewardListConsume,
  RewardListConsumeWithoutLocate,
} from 'modules/Form/types'

export const getHubTimesConsume = (
  {
    list = WEEK_REWARD,
    restKey = WEEK_REWARD_REST_KEY,
  }: {
    list: RewardListConsume | RewardListConsumeWithoutLocate
    restKey: string
  } = {
    list: WEEK_REWARD,
    restKey: WEEK_REWARD_REST_KEY,
  },
) => {
  return Object.keys(list)
    .filter((k) => k !== restKey)
    .map((k) => Number(k))
    .sort((a, b) => b - a)
}
export const getLastHubTimesConsume = (
  {
    list = WEEK_REWARD,
    restKey = WEEK_REWARD_REST_KEY,
  }: {
    list: RewardListConsume | RewardListConsumeWithoutLocate
    restKey: string
  } = {
    list: WEEK_REWARD,
    restKey: WEEK_REWARD_REST_KEY,
  },
) => {
  const hubTimesConsume = getHubTimesConsume({ list, restKey })
  return hubTimesConsume[0]
}
