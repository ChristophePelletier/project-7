const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const db = require('../models')
const User = db.user

module.exports = (req, res, next) => {
  try {
    //we get the authorization in the req.headers and get the token
    // array [bearer token(crypted)] --> we get the token
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    //
    //jwt.verify(token, process.env.RTS)
    //if error --> catch
    // OK : we pass it in env variable
    const userId = decodedToken.id
    console.log('decodedToken.id', decodedToken.id)
    console.log('userId', userId)
    const admin = decodedToken.admin
    console.log('admin', admin)
    // prevent delete object from someone else
    req.userId = userId
    req.admin = admin
    // we add to the request object the userId --> for the delete function
    req.auth = { userId: userId, admin }
    console.log('req.auth', req.auth)
    //req.userId=userId;
    //req.auth = { userId: userId }
    //
    if (req.body.userId && req.body.userId !== userId) {
      /*
			//exception
			//Throwing your own errors (exceptions)
			Instead of waiting for one error to occur before control is automatically transferred from the try block to the catch block, 
			--> you can also explicitly throw your own exceptions to force that to happen on demand.
			--> This is great for creating your own definitions of what an error is and when control should be transferred to catch.
			*/
      throw 'User ID not valid'
    } else {
      console.log('Middleware auth : token ok')

      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
  }
}
