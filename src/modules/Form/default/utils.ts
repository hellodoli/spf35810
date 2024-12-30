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

export { generateKey, getLocalStorage }
