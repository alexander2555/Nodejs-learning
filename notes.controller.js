const Note = require('./models/Note')

async function addNote(title) {
  await Note.create({ title })
}

async function getNotes() {
  return await Note.find()
}

async function removeNote(id) {
  await Note.deleteOne({ _id: id })
}

async function changeNote(id, title) {
  await Note.updateOne({ _id: id }, { title })
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  changeNote,
}
