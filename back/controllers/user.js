const bcrypt = require('bcrypt')
const config = require('../config/config')
const db = require('../models')
const jwt = require('jsonwebtoken')
//

const User = db.user
/*
const handleErrors = (err) => {
	console.log(err.message, err.code)
}
*/
const dotenv = require('dotenv')
dotenv.config()
// SIGNUP
// POST : /api/auth/signup
// request email password
// response message
// crypt the password
// new instance of the object User -> new User
// save the new User in the data base
exports.signup = (req, res) => {
  // Enregistrer l'utilisateur dans la base de données
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "L'utilisateur a été enregistré avec succès!" })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

// http://localhost:3000/api/auth/signup
// test postman ok --> JSON
// {"email":"bbb@aaa.fr","password":"bbb"}

//LOGIN
// POST : /api/auth/login
//request email password
// response userId
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
            id: user.id,
            // jwt -> sign function : --> 3 arguments
            // 1: datas to endode in the token (payload)
            // 2 : secret key
            // 3 : time
            token: jwt.sign({ id: user.id }, 'RANDOM_TOKEN_SECRET', {
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

// http://localhost:3000/api/auth/login
// test postman ok --> JSON
// {"email":"test@test.fr","password":"test"}
