import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addQuestionAsync,
  fetchQuestionsAsync,
  delQuestionAsync,
} from '../../store/actions'
import { selectIsPending, selectQuestions } from '../../store/selectors'
import { Loading, Button } from '../../components'
import { FaRegTrashAlt, FaPlus, FaEdit } from 'react-icons/fa'
import styles from './Questions.module.sass'

const initQ = {
  content: 'Новый вопрос',
  answers: [],
}

const Questions = () => {
  const dispatch = useDispatch()
  // Селекторы
  const questions = useSelector(selectQuestions)
  const isPending = useSelector(selectIsPending)

  // Обработчики кнопок
  const questionDelete = (id) => {
    dispatch(delQuestionAsync(id))
  }
  const questionAdd = () => {
    dispatch(addQuestionAsync(initQ))
  }

  // Загрузка вопросов с сервера
  useEffect(() => {
    dispatch(fetchQuestionsAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isPending) return <Loading />

  return (
    <>
      <h2>Список вопросов</h2>
      <Button onClick={questionAdd} icon={true} title="Добавить вопрос">
        <FaPlus />
      </Button>
      <ol>
        {questions.map(({ id, content, answers }) => (
          <li key={id}>
            <div className={styles.row}>
              <div
                className={styles['item-content']}
                data-answers={answers.length}
              >
                {content}
              </div>
              <Button
                to={'/question/' + id}
                icon={true}
                title="Редактировать вопрос"
              >
                <FaEdit />
              </Button>
              <Button
                onClick={() => questionDelete(id)}
                icon={true}
                title="Удалить вопрос"
              >
                <FaRegTrashAlt />
              </Button>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

export default Questions
