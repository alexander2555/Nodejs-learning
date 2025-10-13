import { ENDPOINT } from '../constants'

export const apiDelete = (id) =>
  fetch(ENDPOINT.URL_QUESTIONS + '/' + id, {
    method: 'DELETE',
  })
