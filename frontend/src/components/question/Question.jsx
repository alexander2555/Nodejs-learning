import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestionsAsync, updQuestionAsync } from '../../store/actions'
import { selectQuestions, selectIsPending } from '../../store/selectors'
import {
  Loading,
  Button,
  Input,
  Textarea,
  Controls,
  Checkbox,
} from '../../components'
import { getUniqId } from '../../utils'
import { FaChevronLeft, FaEraser, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import styles from './Question.module.sass'

const Question = () => {
  const dispatch = useDispatch()

  // Реф для установки фокуса
  const inputRef = useRef()

  // Селекторы
  const isPending = useSelector(selectIsPending)
  const questions = useSelector(selectQuestions)

  const id = useParams().id

  // Локальные состояния
  const [changed, setChanged] = useState(false)
  const [questionInputValue, setQuestionInputValue] = useState('')
  const [answers, setAnswers] = useState([])

  /// Обработчики кнопок
  const clearContent = () => {
    setQuestionInputValue('')
    inputRef.current.focus()
  }
  const editContent = (content) => {
    setQuestionInputValue(content)
    setChanged(true)
  }
  const changeAnswer = (id, data) => {
    setAnswers(answers.map((a) => (a._id === id ? { ...a, ...data } : a)))
    setChanged(true)
  }
  const addAnswer = () => {
    setAnswers([
      { _id: getUniqId(), content: '', isCorrect: false, isNew: true },
      ...answers,
    ])
  }
  const delAnswer = (id) => {
    setAnswers(answers.filter((a) => a._id !== id))
    setChanged(true)
  }
  // Сохранение вопроса на сервере
  const updateQuestion = () => {
    dispatch(updQuestionAsync({ id, content: questionInputValue, answers }))
    setChanged(false)
  }

  // Получение данных вопроса с сервера
  useEffect(() => {
    dispatch(fetchQuestionsAsync(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ввод данных в локальное состояние, рендер
  useEffect(() => {
    const question = questions.find((q) => q._id === id)
    setQuestionInputValue(question?.content || '')
    setAnswers(question?.answers || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions])

  if (isPending) return <Loading />

  return (
    <>
      <h2>Редактировать вопрос</h2>
      <div className={styles['question-row']} data-id={id}>
        <Input
          type="text"
          value={questionInputValue}
          onChange={({ target }) => editContent(target.value)}
          placeholder="Текст вопроса"
          className={styles['question-input']}
          name="question-content"
          ref={inputRef}
        />
        <Button onClick={clearContent} icon={true} title="Очистить сщдержание">
          <FaEraser />
        </Button>
      </div>

      <h3>Ответы</h3>
      <hr />
      <Button onClick={addAnswer} icon={true} title="Добавить ответ">
        <FaPlus />
      </Button>
      {answers.length ? (
        <>
          <div className={styles['answers-list']}>
            <ul>
              {answers.map(({ _id, content, isCorrect, isNew }) => (
                <li
                  key={_id}
                  className={styles['answer-row']}
                  data-correct={isCorrect}
                >
                  <Textarea
                    rows={3}
                    value={content}
                    onChange={({ target }) =>
                      changeAnswer(_id, { content: target.value })
                    }
                    name="answer-content"
                    tag={isNew ? 'new' : ''}
                  ></Textarea>
                  <div className={styles['answer-controls']}>
                    <Checkbox
                      checked={isCorrect}
                      onChange={() =>
                        changeAnswer(_id, { isCorrect: !isCorrect })
                      }
                      title="Корректность ответа"
                      name="answer-correct"
                    />
                    <Button
                      onClick={() => delAnswer(_id)}
                      icon={true}
                      title="Удалить ответ"
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <span>Список ответов пуст</span>
      )}

      <Controls bottom={true}>
        <Button navigate={-1} icon={true} title="Назад">
          <FaChevronLeft />
        </Button>
        <Button
          onClick={updateQuestion}
          title="Сохранить вопрос"
          disabled={
            !changed || !questionInputValue || answers.some((a) => !a.content)
          }
        >
          Сохранить
        </Button>
      </Controls>
    </>
  )
}

export default Question
