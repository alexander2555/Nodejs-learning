export const setLocalHistory = (newHistory = []) =>
  localStorage.setItem('testHistory', JSON.stringify(newHistory))
