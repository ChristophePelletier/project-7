const db = require('../models')
const User = db.user

module.exports = (req, res, next) => {
  if (!req.body.firstName || !req.body.secondName)
    console.log('formulaire non comlet')
  res.status(400).send({
    error: `<p>Erreur : remplir nom et prénom</p>`,
  })
  return
}
