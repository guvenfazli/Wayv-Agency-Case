const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
router.get('/campaigns', userController.getCampaigns)

module.exports = router
