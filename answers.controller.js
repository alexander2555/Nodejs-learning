const Answer = require('./models/Answer')

async function addA(newA) {
  return await Answer.create(newA)
}

async function getAnswers(ids = []) {
  return await Answer.find({ _id: { $in: ids } })
}

async function getA(id) {
  return await Answer.findById(id)
}

async function removeA(id) {
  await Answer.deleteOne({ _id: id })
}

async function changeA(id, content, isCorrect) {
  await Answer.updateOne({ _id: id }, { $set: { content, isCorrect } })
}

module.exports = {
  addA,
  getA,
  getAnswers,
  removeA,
  changeA,
}
