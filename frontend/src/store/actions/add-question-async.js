import { apiPost } from '../../api'

export const addQuestionAsync =
  (questionData) =>
  async (dispatch, getState, { navigate }) => {
    dispatch({ type: 'SET_PENDING' })
    try {
      const resp = await apiPost(questionData)
      const newQuestion = await resp.json()

      dispatch({ type: 'ADD_Q', payload: newQuestion })

      navigate(`/question/${newQuestion._id}`)
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: e.message })
    }
  }
