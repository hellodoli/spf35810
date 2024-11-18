import React, { memo } from 'react'

import SingleOrder from './SingleOrder'
import JoinOrder from './JoinOrder'
import { ExtraJoinOrderPrice, ExtraOrderPrice, ExtraContainer } from './Extra'
import Total from './Total'
import JoinsPay from './JoinsPay'

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

      {/* Thu nhập tăng/giảm do đơn ghép */}
      <JoinsPay />
    </>
  )
}

export default memo(Main)
