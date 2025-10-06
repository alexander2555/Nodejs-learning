import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestionsAsync } from '../../store/actions'
import { selectQuestions, selectIsPending } from '../../store/selectors'
import {
  Loading,
  Button,
  Input,
  Textarea,
  Controls,
  Checkbox,
} from '../../components'
import { FaChevronLeft, FaEraser, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import styles from './Question.module.sass'

const Question = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  // Селекторы
  const isPending = useSelector(selectIsPending)
  const question = useSelector(selectQuestions)

  const id = useParams().id

  // Локальные состояния
  const [changed, setChanged] = useState(false)
  const [questionInputValue, setQuestionInputValue] = useState('')
  const [answers, setAnswers] = useState([])

  // Обработчики кнопок
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

  // Получение данных вопроса с сервера
  useEffect(() => {
    dispatch(fetchQuestionsAsync(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ввод данных в локальное состояние, рендер
  useEffect(() => {
    setQuestionInputValue(question?.content || '')
    setAnswers(question?.answers || [])
  }, [question])

  if (isPending) {
    return <Loading />
  }

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
      <Button onClick={() => {}} icon={true} title="Добавить ответ">
        <FaPlus />
      </Button>
      {answers.length ? (
        <>
          <div className={styles['answers-list']}>
            <ul>
              {answers.map(({ _id, content, isCorrect }) => (
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
                  ></Textarea>
                  <div className={styles['answer-controls']}>
                    <Checkbox
                      checked={isCorrect}
                      onChange={() =>
                        changeAnswer(_id, { isCorrect: !isCorrect })
                      }
                      name="answer-correct"
                    />
                    <Button
                      onClick={() => {}}
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
          onClick={() => {}}
          title="Сохранить вопрос"
          disabled={!changed || !questionInputValue}
        >
          Сохранить
        </Button>
      </Controls>
    </>
  )
}

export default Question
