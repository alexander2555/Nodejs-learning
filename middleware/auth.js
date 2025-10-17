const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../contants')

function auth(req, res, next) {
  const token = req.cookies.token

  try {
    const verifyResult = jwt.verify(token, JWT_SECRET)

    req.user = {
      email: verifyResult.email,
    }
    console.log(req.user)

    next()
  } catch (err) {
    console.log('Auth unsuccessfull:', err.message)
    res.redirect('/login')
  }
}

module.exports = auth
