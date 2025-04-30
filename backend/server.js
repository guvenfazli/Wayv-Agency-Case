const express = require('express')
const app = express()
const PORT = 8080
const supabase = require('./database/supabaseClient')



app.listen(PORT, () => {
  console.log("Server is up and running")
})