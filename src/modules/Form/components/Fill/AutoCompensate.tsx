import React, { memo, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as Shield } from 'assets/icons/shield-halved.svg'
import FormItem from 'components/FormItem'
import {
  hubExtraIncomeSelector,
  hubShortPriceSelector,
  hubTypeSelector,
  includeAutoCompensateSelector,
  isHubShortSelector,
  isHubWellDoneSelector,
  joinsSelector,
  locateSettingSelector,
  orderCompensateSelector,
  orderPriceDefaultSelector,
  orderSelector,
} from 'modules/Form/selectors'
import { isSuperHub } from 'utils/hub'
import { getCompensate_Hub } from 'utils/income'

const Compensate = () => {
  const loc = useSelector(locateSettingSelector)
  const orderPrice = useSelector(orderPriceDefaultSelector)
  const hubType = useSelector(hubTypeSelector)
  const joins = useSelector(joinsSelector)
  const order = useSelector(orderSelector)
  const orderCompensate = useSelector((state) =>
    orderCompensateSelector(state, hubType),
  )
  const isHubWellDone = useSelector(isHubWellDoneSelector)
  const includeAutoCompensate = useSelector(includeAutoCompensateSelector)
  const extraIncomePrice = useSelector(hubExtraIncomeSelector)

  const isHubShort = useSelector(isHubShortSelector)
  const hubShortPrice = useSelector(hubShortPriceSelector)

  const compensateHub = getCompensate_Hub({
    hubType,
    joins,
    order,
    orderPrice,
    extraIncomePrice,
    orderCompensate,
    isHubWellDone,
    includeAutoCompensate,
    loc,
    hubShortPrice,
    isHubShort,
  })

  const isAutoCompensate = compensateHub.isCompensate

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
        className={clsx(
          'stardust-button-reset stardust-button stardust-button--ghost',
          'flex items-center',
          'select-none !p-0',
        )}
      >
        <span
          className={clsx(
            'prose-spf prose-slate dark:prose-dark',
            'flex items-center',
          )}
        >
          <span
            className="mr-1"
            style={{ color: isAutoCompensate ? 'var(--nc-primary)' : '' }}
          >
            {isAutoCompensate ? 'ON' : 'OFF'}:
          </span>
          <Shield
            width={14}
            height={14}
            fill={isAutoCompensate ? 'var(--nc-primary)' : 'currentColor'}
          />
        </span>
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
