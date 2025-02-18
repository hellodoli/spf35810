import React, { memo, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import FormItem from 'components/FormItem'
import { actions } from 'modules/Form/slices'
import type { JoinOrder } from 'modules/Form/types'
import { getJoinLabel } from 'utils/join'
import Order from './Order'
import Price from './Price'

import './style.scss'

const formItemStaticProps = {
  pb: 0,
  labelWidth: '30%',
  isWrapLabel: false,
}

interface GetFormItemProps {
  label?: string
  isFirstRow?: boolean
  subLabel?: string
  subLabelWidth?: string
}

interface Props {
  joinOrder: JoinOrder
  isPlainUI?: boolean
}

const Join = ({ joinOrder: join, isPlainUI = true }: Props) => {
  const dispatch = useDispatch()
  const labelPrice = getJoinLabel(join.type, true)
  const memoJoin = useMemo(() => join, []) // remember first render join.
  console.log('re-render [Join]', { type: join.type, join, memoJoin })
  const joinId = join.key

  const getFormItemProps = useCallback(
    ({
      label = '',
      isFirstRow = false,
      subLabel = '',
      subLabelWidth = '80px',
    }: GetFormItemProps) => {
      return {
        ...formItemStaticProps,
        mt: isPlainUI || isFirstRow ? 0 : 10,
        label: isPlainUI ? '' : label,
        isHiddenLabel: isPlainUI,
        center: !isPlainUI,
        className: isPlainUI
          ? !isFirstRow
            ? 'flex flex-1'
            : 'flex flex-none'
          : '',
        subLabel: isPlainUI ? '' : subLabel,
        subLabelWidth: isPlainUI ? '' : subLabelWidth,
      }
    },
    [isPlainUI],
  )

  const deleteJoin = () => {
    dispatch(
      actions.deleteJoin({
        joinId,
      }),
    )
  }

  return (
    <div
      className={clsx('join-item', 'border-line p-1 pt-6 relative', {
        'md:flex md:flex-col': !isPlainUI,
        'flex gap-2 lg:gap-1 pr-8': isPlainUI,
      })}
    >
      {/* Delete this join */}
      <span
        className={clsx(
          'dark:text-white',
          'delete-join-button',
          'absolute right-2 top-2',
          'rounded-full w-[18px] h-[18px] flex items-center justify-center',
          'cursor-pointer',
        )}
        style={{ border: '1px solid rgba(85, 85, 85, 0.65)' }}
        onClick={deleteJoin}
      >
        <span className="text-xs">X</span>
      </span>
      {/* Loại đơn */}
      <FormItem
        {...getFormItemProps({
          isFirstRow: true,
          label: 'Loại ghép:',
        })}
      >
        <button
          className={clsx(
            'stardust-button-reset stardust-button stardust-button--secondary rounded-2xl',
            'stardust-button--active',
            {
              'h-8': isPlainUI,
            },
          )}
          disabled={true}
        >
          {join.type} đơn
        </button>
      </FormItem>
      {/* Số đơn */}
      <FormItem
        {...getFormItemProps({
          label: 'Số lượng:',
          subLabel: 'đơn',
          subLabelWidth: '80px',
        })}
      >
        <Order joinId={joinId} initValue={join.order} isPlainUI={isPlainUI} />
      </FormItem>
      {/* Giá đơn */}
      <FormItem
        {...getFormItemProps({
          label: labelPrice,
          subLabel: '(VND)',
          subLabelWidth: '80px',
        })}
      >
        <Price
          joinId={joinId}
          joinType={join.type}
          initValue={memoJoin.price}
          isPlainUI={isPlainUI}
        />
      </FormItem>
    </div>
  )
}

export default memo(Join)
