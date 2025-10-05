export const delQuestion = (id) => ({
  type: 'DEL_Q',
  payload: id,
})

export const updQuestion = (data) => ({
  type: 'UPD_Q',
  payload: data,
})

export const addQuestion = (data) => ({
  type: 'ADD_Q',
  payload: data,
})
