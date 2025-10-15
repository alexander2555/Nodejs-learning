const Note = require('./models/Note')

async function addNote(title, owner) {
  await Note.create({ title, owner })
}

async function getNotes() {
  return await Note.find()
}

async function removeNote(id, owner) {
  await Note.deleteOne({ _id: id, owner })
}

async function changeNote(id, title, owner) {
  const result = await Note.updateOne({ _id: id, owner }, { title })

  if (result.matchedCount === 0) {
    throw new Error('Nothing notes for update!')
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  changeNote,
}
