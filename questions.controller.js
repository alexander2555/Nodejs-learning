const Question = require('./models/Question')

async function addQ(newQ) {
  return await Question.create(newQ)
}

async function getQuis() {
  return await Question.find()
}

async function getQ(id) {
  return await Question.findById(id)
}

async function removeQ(id) {
  await Question.deleteOne({ _id: id })
}

async function changeQ({ id, content, answers }) {
  await Question.updateOne({ _id: id }, { $set: { content, answers } })
}

module.exports = {
  addQ,
  getQ,
  getQuis,
  removeQ,
  changeQ,
}
