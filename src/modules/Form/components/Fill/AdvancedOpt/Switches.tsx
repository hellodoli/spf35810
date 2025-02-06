import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  hubTimeSelector,
  hubTypeSelector,
  includeAutoCompensateSelector,
  includeSundayRewardOptSelector,
  includeWeekRewardOptSelector,
} from 'modules/Form/selectors'
import { HubAdvancedOpt } from 'modules/Form/types/hub'
import { isApplyForExtraSunday, isSuperHub } from 'utils/hub'
import SwitchItem from './SwitchItem'

const modalInfo: { [k in keyof HubAdvancedOpt]: string[] } = {
  includeWeekReward: [
    'Khi tính năng này được bật, ca hub này sẽ được tính là một ca để xét nhận thưởng tuần (nếu ca đạt hiệu suất).',
    'Ngược lại khi tắt, ca hub này sẽ không được xem là 1 ca hợp lệ cho dù hiệu suất trong ca có đạt hay không.',
    'Tài xế có thể chủ động tắt tính năng này đi nếu không muốn ca này tính vào thưởng tuần.',
  ],
  includeSundayReward: [
    'Khi tính năng này được bật, ca hub này sẽ được tính là một ca để xét nhận thưởng chủ nhật (chỉ áp dụng cho ca hub có thời gian rơi vào chủ nhật).',
    'Ngược lại khi tắt, ca hub này sẽ không được xem là 1 ca hợp lệ cho dù hiệu suất trong ca có đạt hay không.',
    'Sẽ có vài trường hợp tài xế muốn tắt tính năng này đi, ví dụ ca hub chủ nhật trong dịp tết sẽ không có thưởng chủ nhật.',
  ],
  includeAutoCompensate: [
    'Khi tính năng này được bật, ca hub này sẽ được tính là một ca để có thể xét đảm bảo thu nhập, bù thu nhập (chỉ áp dụng cho ca Hub 8 và Hub 10).',
    'Ngược lại khi tắt, ca hub này sẽ không được xem là 1 ca hợp lệ cho dù hiệu suất trong ca có đạt hay không.',
    'Sẽ có vài trường hợp tài xế muốn tắt tính năng này đi, ví dụ ca hub trong dịp tết sẽ không có bù thu nhập.',
  ],
}

const Switches = () => {
  const hubType = useSelector(hubTypeSelector)
  const hubTime = useSelector(hubTimeSelector)
  const includeWeekReward = useSelector(includeWeekRewardOptSelector)
  const includeSundayReward = useSelector(includeSundayRewardOptSelector)
  const includeAutoCompensate = useSelector(includeAutoCompensateSelector)

  const datas = useMemo(() => {
    const key = 'includeWeekReward'
    const baseDatas = [
      {
        id: 'hubAdvanced_switch_1',
        key,
        text: 'Ca thưởng tuần',
        modalInfoText: modalInfo[key],
        checked: includeWeekReward,
      },
    ]
    let datas = [...baseDatas]

    if (isApplyForExtraSunday(hubTime)) {
      const key = 'includeSundayReward'
      const sundayRewardSwitch = {
        id: 'hubAdvanced_switch_2',
        key,
        text: 'Ca thưởng chuyên cần chủ nhật',
        modalInfoText: modalInfo[key],
        checked: includeSundayReward,
      }
      datas = [...datas, sundayRewardSwitch]
    }
    if (isSuperHub(hubType)) {
      const key = 'includeAutoCompensate'
      const compensateSwitch = {
        id: 'hubAdvanced_switch_3',
        key,
        text: 'Ca đảm bảo thu nhập',
        modalInfoText: modalInfo[key],
        checked: includeAutoCompensate,
      }
      datas = [...datas, compensateSwitch]
    }
    return datas
  }, [
    hubTime,
    hubType,
    includeWeekReward,
    includeSundayReward,
    includeAutoCompensate,
  ])

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
