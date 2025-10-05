import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestionsAsync } from '../../store/actions'
import { selectQuestions } from '../../store/selectors'
import styles from './Question.module.sass'

const Question = () => {
  const dispatch = useDispatch()
  const questions = useSelector(selectQuestions)
  const id = useParams().id
  const content = questions[0]?.content || ''

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchQuestionsAsync(id))
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Edit Question</h2>
      {id}&nbsp;
      {content}
    </div>
  )
}

export default Question
