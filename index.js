const path = require('path')
const express = require('express')
const chalk = require('chalk')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const { loginUser } = require('./user.controller')
const { getRecords, addRecord } = require('./records.controller')
const auth = require('./middleware/auth')

const SEREVR_PORT = 3000
const APP_RECORD_TITLE = 'Запись к врачу'
const APP_RECORDS_TITLE = 'Заявки с формы'

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
    title: APP_RECORD_TITLE,
    error: undefined,
  })
})
app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password)

    res.cookie('token', token)

    res.redirect('/records')
  } catch (err) {
    res.render('login', {
      title: APP_RECORD_TITLE,
      error: err.message,
    })
  }
})

// Контроллеры формы записи к врачу (заявки)
app.get('/', async (req, res) => {
  res.render('record', {
    title: APP_RECORD_TITLE,
    record: null,
    success: undefined,
    error: undefined,
  })
})
app.post('/', async (req, res) => {
  const { name, phone, problem } = req.body
  const timestamp = Date.now()
  try {
    await addRecord(timestamp, name, phone, problem)
    console.warn('ADD operation success:', { timestamp, name, phone, problem })
    res.render('record', {
      title: 'Ваша заявка',
      record: { timestamp, name, phone, problem },
      success: 'Заявка создана!',
      error: undefined,
    })
  } catch (err) {
    console.warn('ADD operation error:', err.message)
    if (err.code === 11000) {
      res.render('record', {
        title: APP_RECORD_TITLE,
        record: null,
        success: undefined,
        error: 'Заявка с таким номером телефона уже существует!',
      })
    }
    res.render('record', {
      title: APP_RECORD_TITLE,
      record: null,
      success: undefined,
      error: err.message,
    })
  }
})

app.use(auth)

// Контроллер вывода таблицы заявок
app.get('/records', async (req, res) => {
  res.render('records', {
    title: APP_RECORDS_TITLE,
    records: (await getRecords()) || [],
  })
})

app.get('/logout', (req, res) => {
  res.cookie('token', '')

  res.redirect('/login')
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
