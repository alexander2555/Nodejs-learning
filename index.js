const path = require('path')
const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cors = require('cors')
const {
  getQ,
  getQuestions,
  addQ,
  removeQ,
  changeQ,
} = require('./questions.controller')
const { getAnswers, addA, changeA, removeA } = require('./answers.controller')

const SEREVR_PORT = 3000
const CLIENT_PORT = 5173
const ENDPOINT = '/questions'
const DB_CONNECT =
  'mongodb+srv://alexander7555_db_user:mqXni6f3FbfwYCZn@cluster0.mgwe7yy.mongodb.net/Quiz?retryWrites=true&w=majority&appName=Cluster0'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:' + CLIENT_PORT,
    credentials: true,
  })
)
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

/** Create
 * [POST]
 */
app.post(ENDPOINT, async (req, res) => {
  try {
    // Создание объекта вопроса в коллекции и получения его id
    const { _id: id, content, answers } = await addQ(req.body)

    res.send({ id, content, answers })

    console.log(`[POST] New empty question ${id} added`)
  } catch (err) {
    console.warn('[POST] request error:', err)
  }
})
/** Read
 * [GET] - получение всего списка вопросов
 */
app.get(ENDPOINT, async (req, res) => {
  try {
    const questions = await getQuestions()
    // отправка массива вопросов из коллекции Questions с заменой _id на id
    res.send(
      questions.map(({ _id: id, content, answers }) => ({
        id,
        content,
        answers,
      }))
    )
    console.log('[GET] All questions sent!')
  } catch (err) {
    console.warn('[GET] request error!')
  }
})
/**
 * [GET] - получение вопроса по id
 */
app.get(ENDPOINT + '/:id', async (req, res) => {
  try {
    const qId = req.params.id
    // получение из коллекции вопроса по id
    const { _id: id, content, answers: answersIds } = await getQ(qId)
    // получение вариантов ответов для данного вопроса
    const answers = await getAnswers(answersIds)
    /** отправка объекта вопроса с массивом вариантов ответов:
     * {
     *  id,
     *  content,
     *  answers:
     *  [
     *    { id, content, isCorrect },
     *    ...
     *  ]
     * }
     */
    res.send({
      id,
      content,
      answers: answers.map(({ _id: id, content, isCorrect }) => ({
        id,
        content,
        isCorrect,
      })),
    })
    console.log(
      `[GET] One question ${qId} with ${answers.length} answer(s) sent!`
    )
  } catch (err) {
    console.warn('[GET] One question request error:', err)
  }
})
/** Update
 * [PUT]
 */
app.put(ENDPOINT + '/:id', async (req, res) => {
  try {
    const qId = req.params.id
    const newQ = req.body
    // Получение объекта редактируеиого вопроса
    const oldQ = await getQ(qId)
    const oldAnswersIds = oldQ.answers
    // Массив обновлённых вариантов ответов
    const newAnswers = newQ.answers
    const updAnswersIds = []
    // Добавление новых ответов в коллекцию Answers и получение их id
    const addedAnswers = newQ.answers.filter((a) => a.isNew)
    const addedAnswersIds = (
      await addA(
        addedAnswers.map((a) => ({
          content: a.content,
          isCorrect: a.isCorrect,
        }))
      )
    ).map((a) => a.id)
    // Обновление существующих ответов
    await Promise.all(
      oldAnswersIds.map((aId) => {
        const newAnswer = newAnswers.find((a) => a.id === aId)
        if (newAnswer) updAnswersIds.push(aId)
        return newAnswer
          ? changeA(aId, newAnswer.content, newAnswer.isCorrect)
          : removeA(aId)
      })
    )
    // Обновление вопроса в БД
    const updatedQ = {
      ...req.body,
      id: qId,
      answers: [...updAnswersIds, ...addedAnswersIds],
    }
    await changeQ(updatedQ)

    res.send(updatedQ)

    console.log(`[PUT] Question ${qId} changed`)
  } catch (err) {
    console.warn('[PUT] request error:', err)
  }
})
/** Delete
 * [DELETE]
 */
app.delete(ENDPOINT + '/:id', async (req, res) => {
  try {
    const qId = req.params.id
    const q = await getQ(qId)
    // Удаление ответов
    await Promise.all(q.answers.map((a) => removeA(a)))
    // Удаление вопроса
    await removeQ(qId)

    res.send()

    console.log(
      `[DEL] Question ${qId} with ${q.answers.length} answers removed`
    )
  } catch (err) {
    console.warn('[DEL] request error:', err)
  }
})

mongoose
  .connect(DB_CONNECT)
  .then(async () => {
    console.log(chalk.green(`App connected to Quiz DB with Mongodb`))

    app.listen(SEREVR_PORT, () => {
      console.log(chalk.blue(`Server start on localhost:${SEREVR_PORT}`))
    })
  })
  .catch(async (err) => {
    console.log(chalk.red(err))
    await mongoose.disconnect()
    console.log(chalk.red('DB disconnected'))
  })
