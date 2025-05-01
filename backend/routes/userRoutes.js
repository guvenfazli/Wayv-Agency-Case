const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const { body } = require('express-validator')



router.get('/campaigns', userController.getCampaigns)

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

router.post('/createCampaign', [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1 })
    .withMessage('Title must be at least 2 characters long'),
  body('brand')
    .notEmpty()
    .withMessage('Brand is required')
    .isLength({ min: 1 })
    .withMessage('Brand is missing!'),
  body('start_date')
    .notEmpty()
    .withMessage('Start Date is required'),
  body('end_date')
    .notEmpty()
    .withMessage('End Date is required'),
  body('image_url')
    .notEmpty()
    .withMessage('Image is missing!')
    .isLength({ min: 1 })
    .withMessage('Images is missing!'),
  body('description')
    .notEmpty()
    .withMessage('Descripion is missing!')
    .isLength({ min: 10 })
    .withMessage('Descripion should be minimum 10 characters!'),
], userController.createCampaign)


module.exports = router
