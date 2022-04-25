const bcrypt = require('bcrypt')
//const configDb = require('../config/configDb')
const db = require('../models')
const jwt = require('jsonwebtoken')

const User = db.user
const dotenv = require('dotenv')
const { user } = require('../models')
dotenv.config()

exports.signup = (req, res) => {
  //console.log('User :', User)
  console.log('firstName', req.body.firstName)
  // Enregistrer l'utilisateur dans la base de données
  User.create({
    email: req.body.email,
    secondName: req.body.secondName,
    firstName: req.body.firstName,
    password: bcrypt.hashSync(req.body.password, 8),
    admin: false,
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
            secondName: user.secondName,
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

exports.getAllUsers = (req, res, next) => {
  User.findAll({ order: [['createdAt', 'DESC']] })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

exports.deleteOneUser = (req, res, next) => {
  User.findByPk(req.params.id)

    .then((user) => {
      if (user.userId !== req.auth.userId) {
        console.log('non autorisé')
        return res.status(401).json({
          message: 'unauthorized',
        })
      }
      User.destroy({ where: { userId: user.userId } })
      console.log('ok')
      res.status(200).send({
        resp: `<p>Suppression du compte ok</p>`,
      })
      //return res.status(200).json({ ok: 'suppression du compte utilisateur' })
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

exports.delOneUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      User.destroy({ where: { userId: user.userId } })
      console.log('id :', id)
      console.log('user.userId :', user.userId)
      console.log('ok')
      res.status(200).send({
        resp: `<p>Suppression du compte ok</p>`,
      })
      //return res.status(200).json({ ok: 'suppression du compte utilisateur' })
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

exports.getOneUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      //console.log('article dans get One :', article)
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

exports.signupAdmin = (req, res) => {
  //console.log('User :', User)
  console.log('firstName', req.body.firstName)
  // Enregistrer l'utilisateur dans la base de données
  User.create({
    email: req.body.email,
    secondName: req.body.secondName,
    firstName: req.body.firstName,
    password: bcrypt.hashSync(req.body.password, 8),
    admin: req.body.admin,
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
