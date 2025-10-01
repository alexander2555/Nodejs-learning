const fs = require('fs/promises')
const path = require('path')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()

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

async function removeNote(id) {
  const notes = await getNotes()

  await fs.writeFile(
    notesPath,
    JSON.stringify(notes.filter((n) => n.id !== id))
  )
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
}
