import { apiGet } from '../../api'

export const fetchQuizAsync = () => async (dispatch) => {
  dispatch({ type: 'SET_PENDING' })
  try {
    const resp = await apiGet()
    const data = await resp.json()

    const quiz = await Promise.all(
      data.map(async (q) => {
        const question = await apiGet(q.id).then((r) => r.json())
        return question
      })
    )

    dispatch({
      type: 'LOAD_SUCCESS',
      payload: quiz,
    })
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message })
  }
}
