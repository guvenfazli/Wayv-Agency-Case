const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')

router.post('/login', authController.userLogin)

router.get('/campaigns', userController.getCampaigns)


module.exports = router
