import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { joinsSelector } from 'modules/Form/selectors'

import Join from '../Join'

const ListJoin = () => {
  const joins = useSelector(joinsSelector)
  return (
    <div className="joins-list mb-4 empty:mb-0">
      {joins.map((join) => (
        <Join key={join.key} joinOrder={join} />
      ))}
    </div>
  )
}

export default memo(ListJoin)
