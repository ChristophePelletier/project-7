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
	res.send({
		message: `Bonjour ${req.body.name}, ${req.body.email} utilisateur enregistré`,
	})
})

app.listen(process.env.PORT || 3000)


