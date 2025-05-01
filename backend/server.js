const express = require('express')
const app = express()
const PORT = 8080
const supabase = require('./database/supabaseClient')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const multer = require('multer')



/* Route Imports */
const userRoute = require('./routes/userRoutes')

/* Middlewares */

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(cookieparser())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('campaignBanner'))
app.use(bodyParser.json()) // application/json


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