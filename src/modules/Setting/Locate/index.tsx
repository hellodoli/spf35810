import React, { useState } from 'react'

import Switch from 'components/Switch'
import { SETTING_LOCATE } from 'modules/Form/types'
import ExtraJoinsOrder from './ExtraJoinsOrder'
import { ExtraOrder, WeekReward } from './ExtraReward'
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
  const [isHubShort, setIsHubShort] = useState(false)
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

      {/* Week Reward */}
      <Container text="*Tiền thưởng tuần (thay đổi tùy vào khu vực)">
        <WeekReward curLocate={locate} />
      </Container>

      {/* Sunday Reward */}
      <Container text="*Tiền thưởng chuyên cần chủ nhật (thay đổi tùy vào khu vực)">
        <SundayReward curLocate={locate} />
      </Container>

      {/* Extra Order */}
      <Container
        text="*Tiền thưởng đơn vượt mốc (thay đổi tùy vào khu vực)"
        renderTitle={() => (
          <div className="flex flex-col gap-1">
            <em className="link cursor-pointer select-none !no-underline">
              *Tiền thưởng đơn vượt mốc (thay đổi tùy vào khu vực)
            </em>
            <div className="mb-1 lg:w-fit w-full mr-auto text-xs p-1">
              <Switch
                text="Hub giao gần"
                labelClassName="prose-spf prose-slate dark:prose-dark font-bold mr-2"
                checked={isHubShort}
                onChangeChecked={(checked) => setIsHubShort(checked)}
              />
            </div>
          </div>
        )}
      >
        <ExtraOrder curLocate={locate} isHubShort={isHubShort} />
      </Container>

      {/* Extra Join Order */}
      <Container text="*Tiền thưởng đơn ghép vượt mốc">
        <ExtraJoinsOrder curLocate={locate} />
      </Container>
    </div>
  )
}

export default Locate
