import React from 'react'

import { SETTING_LOCATE } from 'modules/Form/types'
import LocateInfoView, { locatesArr as locates } from './LocateInfoView'

import ChooseHubBtn from '../ChooseHubBtn'

const Locate = ({
  locate,
  onChangeLocate,
}: {
  locate: SETTING_LOCATE
  onChangeLocate: (locate: SETTING_LOCATE) => void
}) => {
  return (
    <div className="locate-setting mt-4 lg:mt-0">
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
      <div className="mt-4 first:mt-0">
        <em className="link cursor-pointer select-none !no-underline">
          *Tiền thưởng sẽ thay đổi tùy vào khu vực
        </em>
        <div className="link cursor-pointer select-none !no-underline mt-4 mb-1">
          (Tiền thưởng chuyên cần chủ nhật)
        </div>
        <LocateInfoView curLocate={locate} />
      </div>
    </div>
  )
}

export default Locate
