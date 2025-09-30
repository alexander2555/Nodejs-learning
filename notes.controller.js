const fs = require('fs/promises')
const path = require('path')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes() // Buffer.from(buffer).toString(('utf-8')) // require('./db.json')

  const note = {
    title,
    id: Date.now().toString(),
  }
  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
  const notes = JSON.parse(await fs.readFile(notesPath, { encoding: 'utf-8' }))

  return Array.isArray(notes) ? notes : []
}

module.exports = {
  addNote,
  getNotes,
}
