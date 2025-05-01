const supabase = require('../database/supabaseClient')
const { throwError } = require('../utils/throwError')
const bcrypt = require('bcryptjs')

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
}