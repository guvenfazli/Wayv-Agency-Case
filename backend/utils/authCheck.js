const { throwError } = require('./throwError')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies['jwt']
    const resolvedCookie = jwt.verify(cookie, process.env.JWT_SECRET)
    
    if (!resolvedCookie) throwError(401, "Please log in first!")
    next()

  } catch (err) {
    next(err)
  }
}