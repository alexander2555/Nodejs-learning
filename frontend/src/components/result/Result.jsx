import { useEffect, useState } from 'react'
import { Button, Controls } from '../../components'
import { getLocalHistory } from '../../utils'
import styles from './Result.module.sass'

const Result = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswers, setTotalAnswers] = useState(0)

  // Получение последнего результата теста из localStorage
  useEffect(() => {
    const answers = Object.values(getLocalHistory()).at(-1)
    setTotalAnswers(answers.length)
    setCorrectAnswers(
      answers.reduce((correct, answer) => {
        return Object.values(answer)[0] ? ++correct : correct
      }, 0)
    )
  }, [])

  return (
    <>
      <h2>Ваш результат:</h2>
      <div
        className={
          styles.result +
          ' ' +
          (correctAnswers > totalAnswers / 2 ? styles.good : styles.bad)
        }
      >
        {correctAnswers}&nbsp;из&nbsp;{totalAnswers}
      </div>
      <Controls>
        <Button to="/">На главную</Button>
        <Button to="/quiz">Пройти еще раз</Button>
      </Controls>
    </>
  )
}

export default Result
