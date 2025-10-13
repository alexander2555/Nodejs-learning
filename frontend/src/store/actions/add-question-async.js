import { apiPost } from '../../api'

export const addQuestionAsync =
  (questionData) =>
  async (dispatch, getState, { navigate }) => {
    dispatch({ type: 'SET_PENDING' })
    try {
      const resp = await apiPost(questionData)
      const newQuestion = await resp.json()
      // Добавление созданного вопроса в стор
      dispatch({ type: 'ADD_Q', payload: newQuestion })
      // Редирект на него по его id
      navigate(`/question/${newQuestion.id}`)
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: e.message })
    }
  }
