const path = require('path')
const express = require('express')
const chalk = require('chalk')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const {
  addNote,
  getNotes,
  removeNote,
  changeNote,
} = require('./notes.controller')
const { addUser, loginUser } = require('./user.controller')
const { getRecords, addRecord } = require('./records.controller')
const auth = require('./middleware/auth')

const SEREVR_PORT = 3000
const APP_TITLE = 'Express Notes Application'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/login', async (req, res) => {
  res.render('login', {
    title: APP_TITLE,
    error: undefined,
  })
})
app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password)

    res.cookie('token', token)

    res.redirect('/')
  } catch (err) {
    res.render('login', {
      title: APP_TITLE,
      error: err.message,
    })
  }
})

app.get('/register', async (req, res) => {
  res.render('register', {
    title: APP_TITLE,
    error: undefined,
  })
})
app.post('/register', async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password)
    res.redirect('/login')
  } catch (err) {
    if (err.caode === 11000) {
      res.render('register', {
        title: APP_TITLE,
        error: 'User is already exists!',
      })
    }
    res.render('register', {
      title: APP_TITLE,
      error: err.message,
    })
  }
})

app.use(auth)

app.get('/logout', (req, res) => {
  res.cookie('token', '')

  res.redirect('/login')
})

/** [Task] 6.1. Record Form */
const APP_RECORD_TITLE = 'Запись'
// Контроллеры формы записи к врачу (заявки)
app.get('/', async (req, res) => {
  res.render('record', {
    title: APP_RECORD_TITLE,
    records: await getRecords(),
    success: undefined,
    error: undefined,
  })
})
app.post('/', async (req, res) => {
  try {
    await addRecord(req.body.name, req.body.phone, req.body.problem)
    res.render('record', {
      title: APP_RECORD_TITLE,
      success: 'Заявка создана!',
      error: undefined,
    })
  } catch (err) {
    console.warn('ADD operation error:', err)
    res.render('record', {
      title: APP_RECORD_TITLE,
      success: undefined,
      error: 'Ошибка создания заявки:' + err.message,
    })
  }
})
// Контроллер вывода таблицы заявок
app.get('/records', async (req, res) => {
  res.render('records', {
    title: APP_RECORD_TITLE,
    records: await getRecords(),
  })
})
/** [/task] */

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
