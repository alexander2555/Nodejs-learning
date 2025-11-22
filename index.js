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

app.get('/', async (req, res) => {
  res.render('index', {
    title: APP_TITLE,
    notes: await getNotes(),
    alert: false,
  })
})

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email)
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
  await changeNote(req.params.id, req.body.title, req.user.email)
  console.log(req.params.id, 'changed')
  res.render('index', {
    title: APP_TITLE,
    notes: await getNotes(),
    alert: 'Note change complete!',
  })
})

mongoose
  .connect(
    process.env.DB_CONNECTION_STRING
  )
  .then(() => {
    console.log(chalk.green(`App connected with Mongodb notes DB`))

    app.listen(SEREVR_PORT, () => {
      console.log(chalk.blue(`Server start on localhost:${SEREVR_PORT}`))
    })
  })
