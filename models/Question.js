const mongoose = require('mongoose')

const QSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
    },
    answers: {
      type: Array,
      required: true,
    },
  },
  { collection: 'Questions' }
)

const Question = mongoose.model('Question', QSchema)

module.exports = Question
