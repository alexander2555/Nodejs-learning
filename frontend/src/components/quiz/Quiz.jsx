import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizAsync, updQuestion } from '../../store/actions'
import { selectIsPending, selectQuestions } from '../../store/selectors'
import { Loading, Controls, Button, Radio } from '../../components'
import { updateLocalHistory } from '../../utils'
import styles from './Quiz.module.sass'

const Quiz = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  // Селекторы
  const questions = useSelector(selectQuestions)
  const isPending = useSelector(selectIsPending)

  // Локальные систояния страницы Теста
  const [qIndex, setQIndex] = useState(0)
  const isLastQuestion = qIndex + 1 == questions.length
  const qContent = questions[qIndex]?.content
  const qAnswers = questions[qIndex]?.answers

  // По нажатию чекбокса ответа - диспатч обновления вопроса -
  // устанавливатся свойтво checked объекта данного ответа (true),
  // checked остальных ответов снимаются (false)
  const answerTheQuestion = (id) => {
    dispatch(
      updQuestion({
        ...questions[qIndex],
        answers: qAnswers.map((a) =>
          a.id === id ? { ...a, checked: true } : { ...a, checked: false }
        ),
      })
    )
  }
  // Обработчики кнопок Следующий, Предыдущий
  const toPrevQuestion = () => {
    if (qIndex > 0) setQIndex(qIndex - 1)
  }
  const toNextQuestion = () => {
    if (!isLastQuestion) setQIndex(qIndex + 1)
  }
  // По нажатию кнопки Завершить -
  // 1. формируется запись в истории тестирования:
  // [timestamp]:
  //   [
  //     { [id]: isCorrect }
  //     ...
  //   ]
  // 2. добавляется в localStorage
  // 3. редирект на страницу результата
  const finishTest = () => {
    const nowTimestamp = new Date().getTime()

    const testHistoryItem = {
      [nowTimestamp]: questions.map((q) => ({
        [q.id]: q.answers.every((a) => a.isCorrect === a.checked),
      })),
    }

    updateLocalHistory(testHistoryItem)

    nav('/result')
  }

  // Загрузка вопросов с сервера
  useEffect(() => {
    dispatch(fetchQuizAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // По завершении загрузки выбрать первый вопрос
  useEffect(() => {
    if (!isPending && questions.length) setQIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  if (isPending) return <Loading />

  const nextButtonText = isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'
  const nextButtonHandler = isLastQuestion ? finishTest : toNextQuestion

  return (
    <>
      <h2>Тест</h2>
      <span className={styles.pagination}>
        Вопрос&nbsp;{qIndex + 1}&nbsp;из&nbsp;{questions.length}
      </span>
      <hr />
      <h3>{qContent}</h3>
      <hr />
      <strong>Варианты ответов:</strong>
      {qAnswers?.length ? (
        <ul className={styles['answer-select-list']}>
          {qAnswers.map((a) => (
            <li key={a.id} className={styles['answer-select-row']}>
              <Radio
                className={styles['answer-select-rb']}
                checked={a.checked || false}
                value={a.Id}
                onChange={() => answerTheQuestion(a.id)}
                title="Выбрать вариант ответа"
                option={a.content}
                name="answer-select"
              ></Radio>
            </li>
          ))}
        </ul>
      ) : (
        <span>Варианты ответов отсутствуют</span>
      )}

      <Controls bottom={true}>
        <Button
          onClick={toPrevQuestion}
          title="Предыдущий вопрос"
          disabled={qIndex < 1}
        >
          Предыдущий вопрос
        </Button>
        <Button
          onClick={nextButtonHandler}
          title={nextButtonText}
          disabled={qAnswers?.every((a) => !a.checked)}
        >
          {nextButtonText}
        </Button>
      </Controls>
    </>
  )
}

export default Quiz
