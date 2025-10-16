const mongoose = require('mongoose')
const validator = require('validator')

const RecordSchema = mongoose.Schema({
  timestamp: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
})

const Record = mongoose.model('Record', RecordSchema)

module.exports = Record
