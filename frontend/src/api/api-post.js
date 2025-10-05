import { ENDPOINT } from '../constants'

export const apiPost = (newItem = {}) =>
  fetch(ENDPOINT.URL_QUESTIONS, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(newItem),
  })
