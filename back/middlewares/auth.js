const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const db = require('../models')
const User = db.user

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('RANDOM_TOKEN_SECRET')[1]
    jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    //console.log(decodedToken)
    //const userId = decodedToken.userId
    //console.log('decodedToken.userId', decodedToken.userId)
    //console.log('userId', userId)
    // prevent delete object from someone else
    //req.userId = userId;
    // we add to the request object the userId --> for the delete function
    //req.auth = { userId }
    //req.userId=userId;
    //req.auth = { userId: userId }
    //
    next()
  } catch {
    console.log('erreur')
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
  }
}
