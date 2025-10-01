const path = require('path')
const express = require('express')
const chalk = require('chalk')
const { addNote, getNotes, removeNote } = require('./notes.controller')

const SEREVR_PORT = 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express',
    notes: await getNotes(),
    created: false,
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express',
    notes: await getNotes(),
    created: true,
  })
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  console.log(req.params.id, 'removed')
  res.render('index', {
    title: 'Express',
    notes: await getNotes(),
    created: false,
  })
})

/** HTTP Example

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'))
    res.writeHead(200, {
      'content-type': 'text/html',
    })

    res.end(content)
  } else if (req.method === 'POST') {
    const body = []

    res.writeHead(200, {
      'content-type': 'text/plain',
    })

    req.on('data', (data) => {
      body.push(Buffer.from(data))
    })

    req.on('end', () => {
      const title = body.toString().split('=')[1]
      addNote(title)
      res.end('Post success! Title=' + title)
    })
  }
})
  server.listen(SEREVR_PORT, () => {
  console.log(chalk.blue('Server start...'))
})

*/

app.listen(SEREVR_PORT, () => {
  console.log(chalk.blue('Server start on localhost:', SEREVR_PORT))
})
