const cors = require('cors')
const express = require('express')

const app = express()
const { Sequelize } = require('sequelize')
app.use(cors())
app.use(express.json())
app.get('/test', (req, res) => {
  console.log('test')
  res.send({
    message: 'test',
  })
})
const sequelize = new Sequelize('test', 'Christophe_Pelletier', '87420_Mysql', {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => console.log('OK Database connected OK'))
  .catch((err) => console.log('Error: ' + err))

app.post('/signup', (req, res) => {
  console.log('req.body : ', req.body)
  res.send({
    message: `Bonjour bonjour ${req.body.name}, ${req.body.email} utilisateur enregistré, votre mot de passe : ${req.body.password}`,
  })
})

app.listen(process.env.PORT || 3000)
