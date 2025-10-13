import { apiPut } from '../../api'

export const updQuestionAsync =
  (quaestionData) =>
  async (dispatch, getState, { navigate }) => {
    dispatch({ type: 'SET_PENDING' })
    try {
      // const resp =
      await apiPut(quaestionData)
      // const updQuestion = await resp.json()
      /** NOTE
       * updQuestion.answers - это массив id, а не сами ответы!!!
       * updQuestion - БЕЗ id
       */
      // dispatch({ type: 'UPD_Q', payload: updQuestion })

      navigate(`/questions`)
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: e.message })
    }
  }
