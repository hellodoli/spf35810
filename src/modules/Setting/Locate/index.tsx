import React from 'react'

import { SETTING_LOCATE } from 'modules/Form/types'
import ExtraOrder from './ExtraOrder'
import { locatesArr as locates } from './Item'
import SundayReward from './SundayReward'

import ChooseHubBtn from '../ChooseHubBtn'

const Locate = ({
  locate,
  onChangeLocate,
}: {
  locate: SETTING_LOCATE
  onChangeLocate: (locate: SETTING_LOCATE) => void
}) => {
  return (
    <div className="locate-setting">
      <div className="mt-4 first:mt-0">
        <div className="flex flex-wrap gap-2">
          {locates.map(({ text, id, value }) => {
            return (
              <ChooseHubBtn
                key={id}
                text={text}
                value={value}
                isActive={value === locate}
                onChangeLocate={onChangeLocate}
              />
            )
          })}
        </div>
      </div>

      {/* Sunday reward */}
      <div className="mt-6 first:mt-0">
        <div className="mb-1">
          <em className="link cursor-pointer select-none !no-underline">
            *Tiền thưởng chuyên cần chủ nhật (thay đổi tùy vào khu vực)
          </em>
        </div>
        <SundayReward curLocate={locate} />
      </div>

      {/* Extra order */}
      <div className="mt-6 first:mt-0">
        <div className="mb-1">
          <em className="link cursor-pointer select-none !no-underline">
            *Tiền thưởng vượt mốc đơn (thay đổi tùy vào khu vực)
          </em>
        </div>
        <ExtraOrder curLocate={locate} />
      </div>
    </div>
  )
}

export default Locate
