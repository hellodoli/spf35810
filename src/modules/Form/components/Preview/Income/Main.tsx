import React, { memo } from 'react'

import { ExtraContainer, ExtraJoinOrderPrice, ExtraOrderPrice } from './Extra'
import ExtraIncome from './ExtraIncome'
import JoinOrder from './JoinOrder'
import JoinsPay from './JoinsPay'
import SingleOrder from './SingleOrder'
import Total from './Total'

const Main = () => {
  return (
    <>
      {/* Tổng thu nhập */}
      <Total />

      <ul className="p-2 border-line -mt-[1px]">
        {/* Thu nhập đơn lẻ */}
        <SingleOrder />
        {/* Thu nhập đơn ghép */}
        <JoinOrder />
      </ul>

      <ExtraContainer>
        {/* Thu nhập đơn vượt mốc */}
        <ExtraOrderPrice />
        {/* Thu nhập đơn ghép vượt mốc */}
        <ExtraJoinOrderPrice />
      </ExtraContainer>

      {/* Thu nhập khác */}
      <ExtraIncome />

      {/* Thu nhập tăng/giảm do đơn ghép */}
      <JoinsPay />
    </>
  )
}

export default memo(Main)
