import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { createThunkMiddleware } from './middleware'
import { questionsReducer } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createAppStore = (navigate) => {
  const store = createStore(
    questionsReducer,
    composeEnhancers(applyMiddleware(createThunkMiddleware({ navigate })))
  )

  return store
}
