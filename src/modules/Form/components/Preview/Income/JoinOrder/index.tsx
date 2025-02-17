import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { ExpandBtn } from 'components/Buttons'
import { joinsSelector } from 'modules/Form/selectors'
import { getPriceJoinOrder } from 'utils/price'
import { getFormat } from 'utils/price'
import JoinOrderList from './JoinOrderList'

const f = getFormat()

const JoinOrderComp = () => {
  const joins = useSelector(joinsSelector)
  const [isDetail, setIsDetail] = useState(false)
  const priceJO = useMemo(() => getPriceJoinOrder({ joins }), [joins])

  const renderDetailJoinOrderPrice = () => {
    if (!isDetail || priceJO <= 0) return null
    return <JoinOrderList joins={joins} />
  }

  const toggleDetail = useCallback(() => {
    setIsDetail((open) => !open)
  }, [])

  return (
    <li>
      <span>Thu nhập đơn ghép:</span>
      <strong className="ml-1">{f(priceJO)}</strong>
      {/* Chi Tiết Thu Nhập đơn ghép */}
      {priceJO > 0 && (
        <ExpandBtn isDetail={isDetail} toggleDetail={toggleDetail} />
      )}
      {renderDetailJoinOrderPrice()}
    </li>
  )
}

export default memo(JoinOrderComp)
