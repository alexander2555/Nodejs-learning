const path = require('path')
const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cors = require('cors')
const {
  getQ,
  getQuis,
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

app.get(ENDPOINT, async (req, res) => {
  try {
    const quis = await getQuis()
    res.send(quis)
    console.log('[GET] All questions sent!')
  } catch (err) {
    console.warn('[GET] request error!')
  }
})

app.get(ENDPOINT + '/:id', async (req, res) => {
  try {
    const qId = req.params.id
    const q = await getQ(qId)
    q.answers = await getAnswers(q.answers)
    res.send(q)
    console.log(
      `[GET] question ${q._id} with ${q.answers.length} answer(s) sent!`
    )
  } catch (err) {
    console.warn('[GET] Q request error!')
  }
})

app.post(ENDPOINT, async (req, res) => {
  try {
    const newQ = await addQ(req.body)

    res.send(newQ)

    console.log(`[ADD] New question ${newQ.id} added`)
  } catch (err) {
    console.warn('[ADD] request error!')
  }
})

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
    console.warn('[DEL] request error!')
  }
})

app.put(ENDPOINT + '/:id', async (req, res) => {
  try {
    const qId = req.params.id
    const newQ = req.body
    const oldQ = await getQ(qId)
    const oldAnswersIds = oldQ.answers
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
        const newAnswer = newAnswers.find((a) => a._id === aId)
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
    console.warn('[PUT] request error!')
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
// .finally(() => {})
