import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as CircleExclamation } from 'assets/icons/circle-exclamation.svg'
import {
  isHubWellDoneSelector,
  isShowExtraJoinOrderPriceSelector,
  isShowExtraOrderPriceSelector,
  joinsSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { getTotalOrderOfJoins } from 'utils/join'
import ExtraPrice from './ExtraPrice'

const ExtraOrderPrice = () => {
  const order = useSelector(orderSelector)
  const isShowExtraOrderPrice = useSelector(isShowExtraOrderPriceSelector)
  if (!isShowExtraOrderPrice) return null
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
      className={clsx('p-2 border-line -mt-[1px]', 'empty:hidden', {
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

export { ExtraContainer, ExtraJoinOrderPrice, ExtraOrderPrice }
