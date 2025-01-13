import React from 'react'

import { SETTING_LOCATE } from 'modules/Form/types'
import ExtraJoinsOrder from './ExtraJoinsOrder'
import ExtraOrder from './ExtraOrder'
import { locatesArr as locates } from './Item'
import SundayReward from './SundayReward'

import ChooseHubBtn from '../ChooseHubBtn'

const Container = ({
  children,
  text = '',
  renderTitle: renderTitleProp,
}: {
  children: React.ReactNode
  text?: string
  renderTitle?: () => React.ReactNode
}) => {
  const renderTitle = () => {
    if (renderTitleProp) return renderTitleProp()
    return (
      <em className="link cursor-pointer select-none !no-underline">{text}</em>
    )
  }
  return (
    <div className="mt-6 first:mt-0">
      <div className="mb-1">{renderTitle()}</div>
      {children}
    </div>
  )
}

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
      <Container text="*Tiền thưởng chuyên cần chủ nhật (thay đổi tùy vào khu vực)">
        <SundayReward curLocate={locate} />
      </Container>

      {/* Extra order */}
      <Container text="*Tiền thưởng đơn vượt mốc (thay đổi tùy vào khu vực)">
        <ExtraOrder curLocate={locate} />
      </Container>

      <Container text="*Tiền thưởng đơn ghép vượt mốc">
        <ExtraJoinsOrder curLocate={locate} />
      </Container>
    </div>
  )
}

export default Locate
