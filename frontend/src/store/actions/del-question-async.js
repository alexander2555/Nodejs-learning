import { apiDelete } from '../../api'

export const delQuestionAsync = (id) => async (dispatch) => {
  dispatch({ type: 'SET_PENDING' })
  try {
    await apiDelete(id)

    dispatch({ type: 'DEL_Q', payload: id })
  } catch (e) {
    dispatch({ type: 'SET_ERROR', payload: e.message })
  }
}
