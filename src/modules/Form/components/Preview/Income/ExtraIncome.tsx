import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { hubExtraIncomeSelector } from 'modules/Form/selectors'
import { getColorPrice } from 'utils/income'
import { getFormat } from 'utils/price'

const ExtraIncome = () => {
  const f = useMemo(() => getFormat(), [])
  const hubExtraIncome = useSelector(hubExtraIncomeSelector)

  return (
    <ul className="p-2 border-line -mt-[1px]">
      <li>
        <span>Thu nhập khác:</span>
        <strong
          className="ml-1"
          style={{
            color: getColorPrice(hubExtraIncome),
          }}
        >
          {f(hubExtraIncome)}
        </strong>
      </li>
    </ul>
  )
}

export default memo(ExtraIncome)
