import { ENDPOINT } from '../constants'

export const apiPut = ({ id, content, answers }) =>
  fetch(ENDPOINT.URL_QUESTIONS + '/' + id, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ content, answers }),
  })
