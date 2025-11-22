const Record = require('./models/Record')

async function addRecord(timestamp, name, phone, problem) {
  await Record.create({ timestamp, name, phone, problem })
}

async function getRecords() {
  return await Record.find()
}

module.exports = {
  addRecord,
  getRecords,
}
