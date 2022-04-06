const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const checkDoubleEmail = require('../middlewares/checkDoubleEmail')
//
router.post('/signup', checkDoubleEmail, userCtrl.signup)
router.post('/login', userCtrl.login)
module.exports = router
