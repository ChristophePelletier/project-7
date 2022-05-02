const Joi = require('joi')

module.exports = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{5,12}$')),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).send({
          error: 'Entrer une adresse mail valide',
        })
        break
      case 'password':
        res.status(400).send({
          error: `<p>Le mot de passe ne rentre pas dans nos règles de sécurité informatique.</p> <p>Le mot de passe doit contenir uniquement minuscules, majuscules et nombres.</p><p>Le mot de passe doit contenir entre 5 et 12 caractères</p>`,
        })
        break

      default:
        next()
    }
  } else {
    next()
  }
}
