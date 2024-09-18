import React from 'react'
import { useDispatch } from 'react-redux'
import { actions } from 'modules/Form/slices'

const ExpandTotalPrice = () => {
  const dispatch = useDispatch()
  const showIsExpand = () => {
    dispatch(actions.showIsExpandAllHubListSummary())
  }
  const hideIsExpand = () => {
    dispatch(actions.hideIsExpandAllHubListSummary())
  }
  return (
    <div className="button-group flex items-stretch">
      <button
        className="stardust-button-reset stardust-button stardust-button--secondary"
        onClick={showIsExpand}
      >
        Hiện tất cả thống kê
      </button>
      <button
        className="stardust-button-reset stardust-button stardust-button--secondary"
        onClick={hideIsExpand}
      >
        Ẩn tất cả thống kê
      </button>
    </div>
  )
}

export default ExpandTotalPrice
