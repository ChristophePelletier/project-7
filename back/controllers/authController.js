const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
//
const db = require('models')
const User = db.user

// SIGNUP
// POST : /api/auth/signup
// request email password
// response message
// crypt the password
// new instance of the object User -> new User
exports.signup = (req, res) => {
  // Enregistrer l'utilisateur dans la base de données
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.email,
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
  console.log(' login req : ', req.body)
  User.findOne({ email: req.body.email })
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
            userId: user._id,
            // jwt -> sign function : --> 3 arguments
            // 1: datas to endode in the token (payload)
            // 2 : secret key
            // 3 : time
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
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

exports.checkDuplicateEmail = (req, res, next) => {
  console.log(' signup req : ', req.body)
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Nom d'utilisateur est déjà utilisé",
      })
      return
    }
    next()
  })
}
