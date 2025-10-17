const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./contants')

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10)
  await User.create({ email, password: passwordHash })
}

async function loginUser(email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const isPassCorrect = await bcrypt.compare(password, user.password)

  if (!isPassCorrect) {
    throw new Error('Wrong password')
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30min' })
}

module.exports = { addUser, loginUser }
