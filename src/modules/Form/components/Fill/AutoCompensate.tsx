import React, { memo, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { ReactComponent as Shield } from 'assets/icons/shield-halved.svg'
import FormItem from 'components/FormItem'
import {
  hubTypeSelector,
  isHubWellDoneSelector,
  orderCompensateSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { canCompensate, isSuperHub } from 'utils/hub'

const Compensate = () => {
  const hubType = useSelector(hubTypeSelector)
  const order = useSelector(orderSelector)
  const orderCompensate = useSelector((state) =>
    orderCompensateSelector(state, hubType),
  )
  const isHubWellDone = useSelector(isHubWellDoneSelector)

  const isAutoCompensate = canCompensate({
    hubType,
    isHubWellDone,
    order,
    orderCompensate,
  })
  const statusColor = isAutoCompensate
    ? 'var(--nc-primary)'
    : 'var(--nc-util-disabled)'

  const cache = useRef({
    remind: false,
    prevIsAutoCompensate: isAutoCompensate,
  })

  useEffect(() => {
    if (isAutoCompensate) cache.current.remind = false
  }, [isAutoCompensate])

  useEffect(() => {
    if (isHubWellDone && order >= orderCompensate && !cache.current.remind) {
      let remindText = `Bạn đã vượt mức đơn đảm bảo thu nhập. (>= ${orderCompensate})\n`
      remindText += `ShopeeFood sẽ không bù đơn cho ca hub (${hubType}) của bạn.\n`
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      remindText += `Chế độ bù đơn sẽ tự động tắt.`
      // alert(remindText)
      cache.current.remind = true
    }
  }, [isHubWellDone, order, orderCompensate])

  useEffect(() => {
    cache.current.prevIsAutoCompensate = isAutoCompensate
  }, [isAutoCompensate])

  return (
    <FormItem center={true} label="Chế độ bù đơn:">
      <button
        className="flex items-center stardust-button-reset stardust-button stardust-button--ghost select-none !p-0"
        style={{ color: statusColor }}
      >
        <span className="mr-1">{isAutoCompensate ? 'ON' : 'OFF'}:</span>
        <Shield width={14} height={14} fill={statusColor} />
      </button>
    </FormItem>
  )
}
const MemoCompensate = memo(Compensate)

const AutoCompensate = () => {
  const hubType = useSelector(hubTypeSelector)
  if (isSuperHub(hubType)) return <MemoCompensate />
  return null
}

export default AutoCompensate
