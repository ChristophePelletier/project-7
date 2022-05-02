const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const checkDoubleEmail = require('../middlewares/checkDoubleEmail')
const checkDoubleEmailAdmin = require('../middlewares/checkDoubleEmailAdmin')
//const checkSignup = require('../middlewares/checkSignup')
const authPolicy = require('../middlewares/authPolicy')
const auth = require('../middlewares/auth')
//
router.post('/signup', authPolicy, checkDoubleEmail, userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/signupadmin', auth, checkDoubleEmailAdmin, userCtrl.signupAdmin)
router.get('/users', auth, userCtrl.getAllUsers)
router.delete('/user/:id', auth, userCtrl.deleteOneUser)
router.delete('/oneuser/:id', auth, userCtrl.delOneUser)
router.get('/user/:id', auth, userCtrl.getOneUser)
module.exports = router
