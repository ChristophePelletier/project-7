const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const checkDoubleEmail = require('../middlewares/checkDoubleEmail')
const checkSignup = require('../middlewares/checkSignup')
const authPolicy = require('../middlewares/authPolicy')
const auth = require('../middlewares/auth')
//
router.post(
  '/signup',
  authPolicy,
  checkSignup,
  checkDoubleEmail,
  userCtrl.signup
)
router.post('/login', userCtrl.login)
router.get('/users', userCtrl.getAllUsers)
router.delete('/user/:id', auth, userCtrl.deleteOneUser)
router.delete('/oneuser/:id', userCtrl.delOneUser)
router.get('/user/:id', userCtrl.getOneUser)
module.exports = router
