const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const db = require('../models')
const User = db.user

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Email déjà utilisé',
      })
      return
    }
    next()
  })
}
