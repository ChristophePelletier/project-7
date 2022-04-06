const db = require('../models')
const User = db.user

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      console.log('email déjà utilisé')
      res.status(400).send({
        message: 'Email déjà utilisé',
      })
      return
    }
    next()
  })
}
