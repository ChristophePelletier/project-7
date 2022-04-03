const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())
app.get('/test', (req, res) => {
  console.log('test')
  res.send({
    message: 'test',
  })
})

app.post('/signup', (req, res) => {
  console.log('req.body : ', req.body)
  res.send({
    message: `Bonjour bonjour ${req.body.name}, ${req.body.email} utilisateur enregistré, votre mot de passe : ${req.body.password}`,
  })
})

app.listen(process.env.PORT || 3000)
