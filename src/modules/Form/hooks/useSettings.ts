import { useSelector } from 'react-redux'
import { settingsSelector } from 'modules/Form/selectors'

export const useSettings = () => {
  const settings = useSelector(settingsSelector)
  return {
    settings,
  }
}
