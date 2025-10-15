const Record = require('./models/Record')

async function addRecord(name, phone, problem) {
  await Record.create({ name, phone, problem })
}

async function getRecords() {
  return await Record.find()
}

module.exports = {
  addRecord,
  getRecords,
}
