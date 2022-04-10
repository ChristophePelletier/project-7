const express = require('express')
const cors = require('cors')
const app = express()
const { Sequelize } = require('sequelize')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const commentRoutes = require('./routes/comment')
let corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors())
app.use(express.json())

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

db.sequelize.sync({ force: false }).then(() => {
  console.log('Data base ok')
})
app.use('/api/auth', userRoutes)
app.use('/api', articleRoutes)
app.use('/api', commentRoutes)
app.listen(process.env.PORT || 3000)

/*
app.get('/test', (req, res) => {
  console.log('test')
  res.send({
    message: 'test',
  })
})
*/
