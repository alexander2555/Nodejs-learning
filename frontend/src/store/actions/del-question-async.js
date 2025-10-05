import { apiDelete } from '../../api'

export const delQuestionAsync = (payload) => async (dispatch) => {
  dispatch({ type: 'SET_PENDING' })
  try {
    await apiDelete(payload)
    dispatch({ type: 'DEL_Q', payload })
  } catch (e) {
    dispatch({ type: 'SET_ERROR', payload: e.message })
  }
}
