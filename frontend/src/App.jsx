import { Route, Routes, useNavigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { createAppStore } from './store/createStore'
import { Provider } from 'react-redux'
import styles from './App.module.sass'

const Quiz = lazy(() => import('./components/quiz/Quiz'))
const Questions = lazy(() => import('./components/questions/Questions'))
const Question = lazy(() => import('./components/question/Question'))

export const App = () => {
  const nav = useNavigate()
  const store = createAppStore(nav)

  return (
    <Provider store={store}>
      <header className={styles.header}>
        <h1>Quiz Application</h1>
      </header>
      <main className={styles.content}>
        <Routes>
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Quiz />
              </Suspense>
            }
            path="/quiz"
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Questions />
              </Suspense>
            }
            path="/"
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Question />
              </Suspense>
            }
            path="/question/:id"
          />
        </Routes>
      </main>
    </Provider>
  )
}
