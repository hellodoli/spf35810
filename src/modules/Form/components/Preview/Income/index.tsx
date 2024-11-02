import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IncomeSetting } from 'modules/Form/types'
import { joinsSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

import { CheckBox } from 'modules/Form/components/Input'
import SingleOrder from './SingleOrder'
import JoinOrder from './JoinOrder'
import { ExtraJoinOrderPrice, ExtraOrderPrice, ExtraContainer } from './Extra'
import Total from './Total'

const Income = () => {
  const dispatch = useDispatch()
  const joins = useSelector(joinsSelector)
  const onChangeChecked = useCallback(
    (key: keyof IncomeSetting, isChecked: boolean) => {
      dispatch(
        actions.changeIncomeSetting({
          key,
          setting: isChecked,
        }),
      )
    },
    [],
  )
  return (
    <div className="order-preview text-base p-2">
      <div className="p-2 border-line">
        <h2 className="text-2xl mb-1">💰💰💰💰💰</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <CheckBox
            label="Thu nhập đơn ghép vượt mốc"
            checked={true}
            onChangeChecked={(isChecked) =>
              onChangeChecked('SHOW_EXTRA_JOIN_ORDER_PRICE', isChecked)
            }
          />
          <CheckBox
            label="Chi tiết với số đơn"
            checked={true}
            onChangeChecked={(isChecked) =>
              onChangeChecked('SHOW_DETAIL_WITH_ORDER', isChecked)
            }
          />
        </div>
      </div>

      <Total />

      <ul className="p-2 border-line -mt-[1px]">
        {/* Thu nhập đơn lẻ */}
        <SingleOrder />
        {/* Thu nhập đơn ghép */}
        <JoinOrder joins={joins} />
      </ul>

      <ExtraContainer>
        <ExtraOrderPrice />
        <ExtraJoinOrderPrice />
      </ExtraContainer>
    </div>
  )
}

export default memo(Income)
