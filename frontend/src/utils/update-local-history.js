import { getLocalHistory } from './get-local-history'

export const updateLocalHistory = (newResult = {}) => {
  const localHistory = getLocalHistory('testHistory')

  localStorage.setItem(
    'testHistory',
    JSON.stringify({
      ...localHistory,
      ...newResult,
    })
  )
}
