import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { joinsSelector } from 'modules/Form/selectors'

import Join from '../Join'

const ListJoin = () => {
  const joins = useSelector(joinsSelector)
  return (
    <div className="joins-list">
      {joins.map((join) => (
        <Join key={join.key} joinOrder={join} />
      ))}
    </div>
  )
}

export default memo(ListJoin)
