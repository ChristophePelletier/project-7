const bcrypt = require('bcrypt')
//const configDb = require('../config/configDb')
const db = require('../models')
const jwt = require('jsonwebtoken')

const User = db.user
const dotenv = require('dotenv')
dotenv.config()

exports.signup = (req, res) => {
  //console.log('User :', User)
  console.log('firstName', req.body.firstName)
  // Enregistrer l'utilisateur dans la base de données
  User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      console.log("L'utilisateur a été enregistré avec succès!")
      res.status(200)
      res.send(user.toJSON())
      //res.send({ message: "L'utilisateur a été enregistré avec succès!" })
    })
    .catch((err) => {
      console.log('Erreur')
      res.status(500)
      res.send({ message: err.message })
    })
}

///problem--> errors not catched

exports.login = (req, res, next) => {
  console.log(' login req : ', User, req.body)
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' })
      }
      bcrypt
        // compare the req.body.password and the user.password in the data base
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log('erreur')
            return res
              .status(401)
              .json({ error: 'Le mot de passe saisi est incorrect' })
          }
          res.status(200).json({
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            password: user.password,
            admin: user.admin,
            // jwt -> sign function : --> 3 arguments
            // 1: datas to endode in the token (payload)
            // 2 : secret key
            // 3 : time
            token: jwt.sign({ id: user.userId }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '12h',
            }),
            // OK Request headers : Bearer user._id crypted
          })
        })
        .catch((error) => res.status(500).json({ error }))
      // for connexion problem
    })
    .catch((error) => res.status(500).json({ error }))
}
