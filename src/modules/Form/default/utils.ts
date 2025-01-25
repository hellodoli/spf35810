import { getLocalStorage } from 'utils/storages'

function generateKey<T>({
  first,
  content,
  defaultValue,
}: {
  first: string
  content: string
  defaultValue: T
}) {
  const key = `${first}__${content}`
  const lsKey = `${key}__LS_KEY`
  return {
    key,
    lsKey,
    defaultValue,
  }
}

function getLSBoolValue(lsKey: string, defaultValue: boolean) {
  const lsValue = getLocalStorage(lsKey)
  if (lsValue === 'true' || lsValue === 'false')
    return lsValue === 'true' ? true : false
  return defaultValue
}

export { generateKey, getLocalStorage, getLSBoolValue }
