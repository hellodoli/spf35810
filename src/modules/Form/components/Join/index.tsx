import React, { memo, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { getJoinLabel } from 'utils/join'
import type { JoinOrder } from 'modules/Form/types'
import { actions } from 'modules/Form/slices'

import FormItem from 'components/FormItem'
import Order from './Order'
import Price from './Price'

import './style.scss'

interface Props {
  joinOrder: JoinOrder
}

const Join = (props: Props) => {
  const { joinOrder: join } = props
  const dispatch = useDispatch()
  const labelPrice = getJoinLabel(join.type, true)
  const memoJoin = useMemo(() => join, []) // remember first render join.
  console.log('re-render [Join]', { type: join.type, join, memoJoin })
  const joinId = join.key

  const deleteJoin = () => {
    dispatch(
      actions.deleteJoin({
        joinId,
      }),
    )
  }

  return (
    <div className="join-item border-line p-1 pt-6 relative">
      {/* Delete this join */}
      <span
        className="delete-join-button absolute right-2 top-2 rounded-full w-[18px] h-[18px] flex items-center justify-center cursor-pointer"
        style={{ border: '1px solid rgba(85, 85, 85, 0.65)' }}
        onClick={deleteJoin}
      >
        <span className="text-xs">X</span>
      </span>
      {/* Loại đơn */}
      <FormItem
        pb={0}
        mt={0}
        labelWidth="30%"
        center={true}
        isWrapLabel={false}
        label="Loại ghép:"
      >
        <button
          className={clsx(
            'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
            'stardust-button--active',
          )}
          disabled={true}
        >
          {join.type} đơn
        </button>
      </FormItem>
      {/* Số đơn */}
      <FormItem
        label="Số lượng:"
        pb={0}
        mt={10}
        subLabel="đơn"
        subLabelWidth="80px"
        labelWidth="30%"
        center={true}
        isWrapLabel={false}
      >
        <Order joinId={joinId} initValue={join.order} />
      </FormItem>
      {/* Giá đơn */}
      <FormItem
        label={labelPrice}
        pb={0}
        mt={10}
        subLabel="(VND)"
        subLabelWidth="80px"
        labelWidth="30%"
        center={true}
        isWrapLabel={false}
      >
        <Price
          joinId={joinId}
          joinType={join.type}
          initValue={memoJoin.price}
        />
      </FormItem>
    </div>
  )
}

export default memo(Join)
