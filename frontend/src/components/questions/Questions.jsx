import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addQuestionAsync,
  fetchQuestionsAsync,
  delQuestionAsync,
} from '../../store/actions'
import { selectQuestions } from '../../store/selectors'
import { FaRegTrashAlt } from 'react-icons/fa'
import styles from './Questions.module.sass'

const Questions = () => {
  const dispatch = useDispatch()

  const questions = useSelector(selectQuestions)

  const [loading, setLoading] = useState(false)

  const onQuestionDelete = (id) => {
    dispatch(delQuestionAsync(id))
  }

  const onQuestionAdd = () => {
    const q = {
      content: 'Mock Question',
      answers: [],
    }
    dispatch(addQuestionAsync(q))
  }

  useEffect(() => {
    dispatch(fetchQuestionsAsync())
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Questions list</h2>
      <button onClick={onQuestionAdd} title="Add new question">
        +
      </button>
      {questions.map(({ _id, content, answers }) => (
        <div key={_id}>
          <h3>Question:</h3>
          {content}
          <br />
          <span>answers:</span>
          <ul>
            {answers.map((a) => (
              <li>{a}</li>
            ))}
          </ul>
          <button onClick={() => onQuestionDelete(_id)}>
            <FaRegTrashAlt />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Questions
