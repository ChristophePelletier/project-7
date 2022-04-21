const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const checkDoubleEmail = require('../middlewares/checkDoubleEmail')
const authPolicy = require('../middlewares/authPolicy')
//
router.post('/signup', authPolicy, checkDoubleEmail, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/users', userCtrl.getAllUsers)
module.exports = router
