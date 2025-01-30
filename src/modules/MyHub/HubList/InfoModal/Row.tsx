import React, { memo } from 'react'

const Row = ({
  fill = 'var(--nc-primary)',
  text = '',
  icon: Icon,
}: {
  fill?: string
  text?: string
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
}) => {
  return (
    <div className="flex mt-1 first:mt-0">
      <Icon width={14} height={14} fill={fill} className="flex-none" />
      <span className="ml-1 mr-2">:</span>
      <span className="italic">{text}</span>
    </div>
  )
}

export default memo(Row)
