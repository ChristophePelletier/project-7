const cors = require('cors')
const express = require('express')

const app = express()
const Sequelize = require('sequelize')
app.use(cors())
app.use(express.json())

const db = require('./models')
const PORT = process.env.PORT || 3000

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT)
    console.log(`Serveur en fonction sur le port : ${PORT}.`)
  })
  .catch((err) => console.error('erreur connexion bdd via sequelize', err))

app.post('/signup', (req, res) => {
  console.log('req.body : ', req.body)
  res.send({
    message: `Bonjour bonjour ${req.body.name}, ${req.body.email} utilisateur enregistré, votre mot de passe : ${req.body.password}`,
  })
})

/*
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur en fonction sur le port : ${PORT}.`)
})
*/

//Data base connection
//require('./database/connection')
//Sequelize refers to the library itself while sequelize refers to an instance of Sequelize, which represents a connection to one database

//OK
/*
const sequelize = new Sequelize('test', 'Christophe_Pelletier', '87420_Mysql', {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => console.log('OK Database connected OK'))
  .catch((err) => console.log('Error: ' + err))
*/

/*
app.get('/test', (req, res) => {
  console.log('test')
  res.send({
    message: 'test',
  })
})
*/

/*
//app.listen(process.env.PORT || 3000)
*/
