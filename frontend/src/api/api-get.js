import { ENDPOINT } from '../constants'

export const apiGet = (id) =>
  fetch(ENDPOINT.URL_QUESTIONS + (id ? '/' + id : ''))
