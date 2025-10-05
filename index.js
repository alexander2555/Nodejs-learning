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

const SEREVR_PORT = 3000
const CLIENT_PORT = 5173
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

app.get('/questions', async (req, res) => {
  try {
    const quis = await getQuis()
    console.log('Get request done!')
    res.send(quis)
  } catch (err) {
    console.warn('GET operation error!')
  }
})

app.get('/questions/:id', async (req, res) => {
  try {
    const q = await getQ(req.params.id)
    console.log('Get request done!')
    res.send(q)
  } catch (err) {
    console.warn('GET operation error!')
  }
})

app.post('/questions', async (req, res) => {
  try {
    const newQ = await addQ(req.body)
    res.send(newQ)
    console.log(newQ.id, 'added')
  } catch (err) {
    console.warn('ADD operation error!')
  }
})

app.delete('/questions/:id', async (req, res) => {
  await removeQ(req.params.id)
  res.send()
  console.log(req.params.id, 'removed')
})

app.put('/questions/:id', async (req, res) => {
  await changeQ(req.params.id, req.body)
  console.log(req.params.id, 'changed')
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
