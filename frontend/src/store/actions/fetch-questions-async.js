import { apiGet } from '../../api'

export const fetchQuestionsAsync = (id) => async (dispatch) => {
  dispatch({ type: 'SET_PENDING' })
  try {
    const resp = await apiGet(id)
    const data = await resp.json()

    dispatch({
      type: 'LOAD_SUCCESS',
      payload: Array.isArray(data) ? data : [data],
    })
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message })
  }
}
