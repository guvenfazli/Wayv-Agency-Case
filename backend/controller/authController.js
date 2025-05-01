const supabase = require('../database/supabaseClient')
const { throwError } = require('../utils/throwError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()


exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body
  const errors = validationResult(req)
  const { data, error } = await supabase.from('admin').select('*').eq('email', email)
  const foundAdmin = data[0]
  
  try {

    if (!errors.isEmpty()) throwError(410, errors.array()[0].msg)
    if (error || !foundAdmin) throwError(404, 'No admin found')

    const correctPassword = await bcrypt.compare(password, foundAdmin.password)

    if (!correctPassword) throwError(410, 'Incorrect Credentials!')

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true
    })

    return res.json({ message: 'Success!' })

  } catch (err) {
    next(err)
  }
}