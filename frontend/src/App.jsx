import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from './store/createStore'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Loading } from './components'
import styles from './App.module.sass'

const Quiz = lazy(() => import('./components/quiz/Quiz'))
const Questions = lazy(() => import('./components/questions/Questions'))
const Question = lazy(() => import('./components/question/Question'))
const MainPage = lazy(() => import('./components/main-page/MainPage'))
const Result = lazy(() => import('./components/result/Result'))

export const App = () => {
  const nav = useNavigate()
  const store = createAppStore(nav)

  return (
    <Provider store={store}>
      <header className={styles.header}>
        <h1>
          <Link to="/" className="link" title="Главная">
            Quiz Application
          </Link>
        </h1>
      </header>
      <main className={styles.content}>
        <Routes>
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <Quiz />
              </Suspense>
            }
            path="/quiz"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <MainPage />
              </Suspense>
            }
            path="/"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <Questions />
              </Suspense>
            }
            path="/questions"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <Question />
              </Suspense>
            }
            path="/question/:id"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <Result />
              </Suspense>
            }
            path="/result"
          />
        </Routes>
      </main>
    </Provider>
  )
}
