import React, { useMemo, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'configStore'
import { HUB_TYPE } from 'modules/Form/types/enum'
import { HUB_COLORS } from 'modules/Form/constants'
import { makeFilterHubType } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'

const FilterItem = ({
  color = '',
  hubType,
  onChangeFilter,
}: {
  color?: string
  hubType: HUB_TYPE
  onChangeFilter: (hubType: HUB_TYPE) => void
}) => {
  const filterHubTypee = useMemo(() => makeFilterHubType, [])
  const hubTypeRedux = useSelector((state) => filterHubTypee(state, hubType))
  return (
    <button
      className="stardust-button-reset stardust-button stardust-button--secondary"
      style={{
        borderColor: 'transparent',
        color: hubTypeRedux ? '#fff' : '#555555',
        background: hubTypeRedux ? color : '#fff',
      }}
      onClick={() => onChangeFilter(hubType)}
    >
      {hubType}
    </button>
  )
}
const FilterItemMemo = memo(FilterItem)

const FilterHub = () => {
  const dispatch: AppDispatch = useDispatch()
  const hubColors = useMemo(() => Object.values(HUB_COLORS), [])
  const hubColorKeys = useMemo(() => Object.keys(HUB_COLORS), []) as HUB_TYPE[]

  const onChangeFilter = useCallback((hubType: HUB_TYPE) => {
    dispatch(
      actions.changeToggleFilterHubType({
        hubType,
      }),
    )
  }, [])

  return (
    <div className="button-group no-margin-x">
      {hubColors.map((color, index) => {
        const hubType = hubColorKeys[index]
        const key = `${hubType}-${color}`
        return (
          <FilterItemMemo
            key={key}
            color={color}
            hubType={hubType}
            onChangeFilter={onChangeFilter}
          />
        )
      })}
    </div>
  )
}

export default FilterHub
