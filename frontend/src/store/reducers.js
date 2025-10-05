const initState = {
  questions: [],
  error: null,
  isPending: false,
}

export const questionsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case 'DEL_Q':
      return {
        ...state,
        questions: state.questions.filter((q) => q._id !== payload),
        isPending: false,
      }
    case 'ADD_Q':
      return {
        ...state,
        questions: [...state.questions, payload],
        isPending: false,
      }
    case 'UPD_Q':
      return {
        ...state,
        posts: state.questions.map((q) =>
          q._id === payload._id ? payload : q
        ),
        isPending: false,
      }
    case 'SET_PENDING':
      return { ...state, isPending: true }
    case 'LOAD_SUCCESS':
      return { ...state, questions: payload, isPending: false }
    case 'SET_ERROR':
      return { ...state, error: payload, isPending: false }
    default:
      return state
  }
}
