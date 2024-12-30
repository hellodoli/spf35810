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
      <div className="mt-4 first:mt-0">
        <div className="mb-1">
          <em className="link cursor-pointer select-none !no-underline">
            *Tiền thưởng chuyên cần chủ nhật (thay đổi tùy vào khu vực)
          </em>
        </div>
        <LocateInfoView curLocate={locate} />
      </div>
    </div>
  )
}

export default Locate
