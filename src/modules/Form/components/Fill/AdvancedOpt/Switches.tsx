import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  hubTimeSelector,
  includeSundayRewardOptSelector,
  includeWeekRewardOptSelector,
} from 'modules/Form/selectors'
import { HubAdvancedOpt } from 'modules/Form/types/hub'
import { isApplyForExtraSunday } from 'utils/hub'
import SwitchItem from './SwitchItem'

const Switches = () => {
  const hubTime = useSelector(hubTimeSelector)
  const includeWeekReward = useSelector(includeWeekRewardOptSelector)
  const includeSundayReward = useSelector(includeSundayRewardOptSelector)

  const datas = useMemo(() => {
    const isSunday = isApplyForExtraSunday(hubTime)
    const switcheDatas = [
      {
        id: 'hubAdvanced_switch_1',
        key: 'includeWeekReward',
        text: 'Ca thưởng tuần',
        modalInfoText: [
          'Khi tính năng này được bật, ca hub này sẽ được tính là một ca để xét nhận thưởng tuần (nếu ca đạt hiệu suất).',
          'Ngược lại khi tắt, ca hub này sẽ không được xem là 1 ca hợp lệ cho dù hiệu suất trong ca có đạt hay không.',
          'Tài xế có thể chủ động tắt tính năng này đi nếu không muốn ca này tính vào thưởng tuần.',
        ],
        checked: includeWeekReward,
      },
    ]
    if (isSunday) {
      return [
        ...switcheDatas,
        {
          id: 'hubAdvanced_switch_2',
          key: 'includeSundayReward',
          text: 'Ca thưởng chuyên cần chủ nhật',
          modalInfoText: [
            'Khi tính năng này được bật, ca hub này sẽ được tính là một ca để xét nhận thưởng chủ nhật (chỉ áp dụng cho ca hub có thời gian rơi vào chủ nhật).',
            'Ngược lại khi tắt, ca hub này sẽ không được xem là 1 ca hợp lệ cho dù hiệu suất trong ca có đạt hay không.',
            'Sẽ có vài trường hợp tài xế muốn tắt tính năng này đi, ví dụ ca hub chủ nhật trong dịp tết sẽ không có thưởng chủ nhật.',
          ],
          checked: includeSundayReward,
        },
      ]
    }
    return switcheDatas
  }, [includeWeekReward, includeSundayReward, hubTime])

  return (
    <div className="w-full mt-3">
      {datas.map(({ id, text, checked, modalInfoText, key }) => {
        return (
          <div className="mb-2 last:mb-0" key={id}>
            <SwitchItem
              text={text}
              checked={checked}
              modalInfoText={modalInfoText}
              updateKey={key as keyof HubAdvancedOpt}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Switches
