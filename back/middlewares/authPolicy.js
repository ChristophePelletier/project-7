const Joi = require('joi')

module.exports = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9@$!%*#?&^_-]{4,20}$')),
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
          error: `<p>Le mot de passe doit contenir entre 4 et 20 caractères</p>`,
        })
        break

      default:
        next() /*
        res.status(400).send({
          error: 'Information d'identification invalide',
        })*/
    }
  } else {
    next()
  }
}
