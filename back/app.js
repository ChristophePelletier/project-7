//
//ENVIRONMENT VARIABLES
//
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const { Sequelize } = require('sequelize')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const commentRoutes = require('./routes/comment')
//var bodyParser = require('body-parser')
app.use(cors())
app.use(express.static('images'))
app.use(express.json())
///https://expressjs.com/fr/starter/static-files.html

//app.use(bodyParser.urlencoded({ extended: true }))
//Data base connection
//require('./database/connection')
//Sequelize refers to the library itself while sequelize refers to an instance of Sequelize, which represents a connection to one database
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
app.post('/signup', (req, res) => {
  console.log('req.body : ', req.body)
  res.send({
    message: `Bonjour bonjour ${req.body.name}, ${req.body.email} utilisateur enregistré, votre mot de passe : ${req.body.password}`,
  })
})
const db = require('./models')
// for images -> gets the path of the files --> for the middleware for the images
const path = require('path')
db.sequelize.sync({ force: false }).then(() => {
  console.log('Data base ok')
})
app.use('/api/auth', userRoutes)
app.use('/api', articleRoutes)
app.use('/api', commentRoutes)
app.listen(process.env.PORT || 3000)
app.use('/images', express.static(path.join(__dirname, 'images')))
//app.listen(3000)
/*
app.get('/test', (req, res) => {
  console.log('test')
  res.send({
    message: 'test',
  })
})
*/
