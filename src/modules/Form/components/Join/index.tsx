import React, { memo, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getJoinLabel } from 'utils/join'
import type { JoinOrder } from 'modules/Form/types'
import { actions } from 'modules/Form/slices'

import FormItem from '../FormItem'
import Order from './Order'
import Price from './Price'

import './style.scss'

interface Props {
  joinOrder: JoinOrder
}

const Join = (props: Props) => {
  const { joinOrder: join } = props
  const dispatch = useDispatch()
  const labelOrder = getJoinLabel(join.type)
  const labelPrice = getJoinLabel(join.type, true)
  const memoJoin = useMemo(() => join, []) // remember first render join.
  console.log('re-render [Join]', { type: join.type, join, memoJoin })

  const deleteJoin = () => {
    dispatch(
      actions.deleteJoin({
        joinId: join.key,
      }),
    )
  }

  return (
    <div className="join-item border-line p-1 relative">
      {/* Delete this join */}
      <span
        className="delete-join-button absolute right-2 top-2 rounded-full w-[18px] h-[18px] flex items-center justify-center cursor-pointer"
        style={{ border: '1px solid rgba(85, 85, 85, 0.65)' }}
        onClick={deleteJoin}
      >
        <span className="text-xs">X</span>
      </span>
      {/* Số đơn */}
      <FormItem
        label={labelOrder}
        pb={0}
        mt={10}
        subLabel="đơn"
        subLabelWidth="80px"
        labelWidth="30%"
        center={true}
        isWrapLabel={false}
      >
        <Order joinId={join.key} initValue={memoJoin.order} />
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
          joinId={join.key}
          joinType={join.type}
          initValue={memoJoin.price}
        />
      </FormItem>
    </div>
  )
}

export default memo(Join)
