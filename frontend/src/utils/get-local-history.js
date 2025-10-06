export const getLocalHistory = () =>
  JSON.parse(localStorage.getItem('testHistory')) ?? []
