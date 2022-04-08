const db = require('../models')
const Article = db.article

exports.createArticle = (req, res, next) => {
  // get the object
  const articleObject = JSON.parse(req.body.article)
  delete articleObject.id
  //correction security problem
  //without this condition we can create a article with a user id we choose
  //-> we check that the user Id in the object is the same as the id in the token
  // for memory : req.auth.userId -> decodedToken.userId
  if (articleObject.userId !== req.auth.userId) {
    console.log('non autorisé')
    return res.status(401).json({
      message: 'unauthorized',
    })
  }
  //
  const article = new Article({
    ...articleObject,
    // image URL http or https + host of the server + /images/ + filename
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  })
  article
    .save()
    //save returns a promise --> then ... catch
    .then(() => res.status(201).json({ message: 'Article enregistrée' }))
    // !!response to the front necessary else the request would expire
    .catch((error) => res.status(400).json({ error: error }))
}

/**
getAllArticles
*/
exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then((articles) => {
      res.status(200).json(articles)
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

/**
getOneArticle
*/
exports.getOneArticle = (req, res, next) => {
  Article.findOne({
    _id: req.params.id,
  })
    .then((article) => {
      res.status(200).json(article)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

/**
 updateArticle
 */
exports.updateArticle = (req, res, next) => {
  //
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (req.file && article.userId == req.auth.userId) {
        console.log('req.body : !!!', req.body)
        const filename = article.imageUrl.split('/images')[1]
        //we choose to first delete the former file in the image directory
        fs.unlink(`images/${filename}`, () => {
          //
          Article.updateOne(
            //object of comparaison
            { _id: req.params.id },
            //new object
            {
              ...JSON.parse(req.body.article),
              //test test  :
              _id: req.params.id,

              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
            }
          )
            .then(() => res.status(200).json({ message: 'Article modifiée' }))
            .catch((error) => res.status(400).json({ error }))
          //
        })
      } else if (!req.file && article.userId == req.auth.userId) {
        console.log('req.body : !!!', req.body)
        //
        Article.updateOne(
          //object of comparaison
          { _id: req.params.id },
          //new object
          { ...req.body }
        )
          .then(() => res.status(200).json({ message: 'Article modifiée' }))
          .catch((error) => res.status(400).json({ error }))
      }
    })
    //
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
  //
}

/**
 deleteArticle
 */
exports.deleteArticle = (req, res, next) => {
  // ! id de la article but not id of the user --> security to adapt
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          message: 'Not Found',
        })
        /*
				res.status(404).json({
					error: new Error('no article'),
				})
				*/
      }
      // ! only the user who sent the article can delete the article
      if (article.userId !== req.auth.userId) {
        console.log('nonautorisé')
        // !!!
        return res.status(401).json({
          message: 'unauthorized',
        })
        /*
				return res.status(401).json({
					error:
						'requête non autorisée : seul le créateur de la article peut la supprimer',
				})
				*/
      }
      //

      //
      console.log('article.userId :', article.userId)
      console.log('req.auth.userId :', req.auth.userId)
      const filename = article.imageUrl.split('/images/')[1]
      // we split before and after "images" and get the second part
      //
      //fs.unlink(path, callback) ---->  callback function(error)
      //err == null if the file has correctly been deleted
      //second argument of unlink : the callback
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Article supprimée !' }))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}
