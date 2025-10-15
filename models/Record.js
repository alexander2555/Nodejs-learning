const mongoose = require('mongoose')
const validator = require('validator')

const RecordSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isMobilePhone,
      message: 'Номер телефона некорректен!',
    },
  },
  problem: {
    type: String,
    required: true,
  },
})

const Record = mongoose.model('Record', RecordSchema)

module.exports = Record
