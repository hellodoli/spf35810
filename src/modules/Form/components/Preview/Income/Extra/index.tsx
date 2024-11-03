import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import {
  orderSelector,
  joinsSelector,
  isShowExtraJoinOrderPriceSelector,
  isHubWellDoneSelector,
} from 'modules/Form/selectors'
import { getTotalOrderOfJoins } from 'utils/join'

import { ReactComponent as CircleExclamation } from 'assets/icons/circle-exclamation.svg'

import ExtraPrice from './ExtraPrice'

const ExtraOrderPrice = () => {
  const order = useSelector(orderSelector)
  return (
    <ExtraPrice order={order} title="Thu nhập đơn vượt mốc:" isJoin={false} />
  )
}

const ExtraJoinOrderPrice = () => {
  const joins = useSelector(joinsSelector)
  const isShowExtraJoinOrderPrice = useSelector(
    isShowExtraJoinOrderPriceSelector,
  )
  const totalOrderOfJoins = useMemo(() => getTotalOrderOfJoins(joins), [joins])
  if (!isShowExtraJoinOrderPrice) return null
  return (
    <ExtraPrice
      order={totalOrderOfJoins}
      title="Thu nhập đơn ghép vượt mốc:"
      isJoin={true}
    />
  )
}

const ExtraContainer = ({ children }: { children: React.ReactNode }) => {
  const isHubWellDone = useSelector(isHubWellDoneSelector)
  return (
    <ul
      className={clsx('p-2 border-line -mt-[1px]', {
        'opacity-50': !isHubWellDone,
        'select-none': !isHubWellDone,
      })}
    >
      {!isHubWellDone && (
        <li>
          <span className="inline-flex italic text-color-error text-sm">
            <CircleExclamation
              fill="var(--nc-error)"
              className="mt-1 mr-1 flex-none"
              width={12}
              height={12}
            />
            Bạn sẽ không nhận được thu nhập dưới đây do không đạt hiệu suất.
          </span>
        </li>
      )}
      {children}
    </ul>
  )
}

export { ExtraOrderPrice, ExtraJoinOrderPrice, ExtraContainer }
