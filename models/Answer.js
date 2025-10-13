const mongoose = require('mongoose')

const ASchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { collection: 'Answers' }
)

const Answer = mongoose.model('Answer', ASchema)

module.exports = Answer
