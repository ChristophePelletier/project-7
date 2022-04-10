const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log('req.headers :', req.headers)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    console.log('decodedToken :', decodedToken)
    console.log('token :', token)
    next()
  } catch {
    console.log('erreur : il faut être connecté pour consulter les articles')
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
  }
}
