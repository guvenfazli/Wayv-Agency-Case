const express = require('express')
const app = express()
const PORT = 8080
const supabase = require('./database/supabaseClient')
const cors = require('cors')


/* Route Imports */
const userRoute = require('./routes/userRoutes')

/* Middlewares */

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

/* Routes */

app.use('/', userRoute)




/* Error Handler */

app.use((error, req, res, next) => {
  const message = error.message
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({ message, statusCode })
})

app.listen(PORT, () => {
  console.log("Server is up and running")
})