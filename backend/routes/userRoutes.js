const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const { body } = require('express-validator')
router.post('/login', [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 1 })
    .withMessage('Email must be at least 2 characters long')
    .isEmail()
    .withMessage('Please provide a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long')
], authController.userLogin)

router.get('/campaigns', userController.getCampaigns)


module.exports = router
