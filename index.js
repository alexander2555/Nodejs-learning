const path = require('path')
const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const {
  addNote,
  getNotes,
  removeNote,
  changeNote,
} = require('./notes.controller')

const SEREVR_PORT = 3000
const APP_TITLE = 'Express Notes Application'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.get('/', async (req, res) => {
  res.render('index', {
    title: APP_TITLE,
    notes: await getNotes(),
    alert: false,
  })
})

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title)
    res.render('index', {
      title: APP_TITLE,
      notes: await getNotes(),
      alert: 'Note cteate complete!',
    })
  } catch (err) {
    console.warn('ADD operation error!')
    res.render('index', {
      title: APP_TITLE,
      notes: await getNotes(),
      alert: 'Note cteate error!',
    })
  }
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  console.log(req.params.id, 'removed')
  res.render('index', {
    title: APP_TITLE,
    notes: await getNotes(),
    alert: 'Note delete complete!',
  })
})

app.put('/:id', async (req, res) => {
  await changeNote(req.params.id, req.body.title)
  console.log(req.params.id, 'changed')
  res.render('index', {
    title: APP_TITLE,
    notes: await getNotes(),
    alert: 'Note change complete!',
  })
})

mongoose
  .connect(
    'mongodb+srv://alexander7555_db_user:mqXni6f3FbfwYCZn@cluster0.mgwe7yy.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log(chalk.green(`App connected with Mongodb notes DB`))

    app.listen(SEREVR_PORT, () => {
      console.log(chalk.blue(`Server start on localhost:${SEREVR_PORT}`))
    })
  })
