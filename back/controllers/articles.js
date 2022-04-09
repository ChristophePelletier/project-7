const db = require('../models')
const Article = db.article

/*
exports.createArticle = (req, res) => {
  Article.create(req.body)
    .then((article) => {
      console.log('Article créé avec succès!')
      res.status(200)
      res.send(article)
    })
    .catch((err) => {
      console.log('Erreur création article...')
      res.status(400)
      res.send({ message: err.message })
    })
}
*/
exports.createArticle = (req, res) => {
  Article.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    //
    //test
    //userId: req.body.userId,
    //
  })
    .then((article) => {
      console.log('article bien créé')
      res.status(200)
      res.send(article.toJSON())
      //res.send({ message: "L'utilisateur a été enregistré avec succès!" })
    })
    .catch((err) => {
      console.log('Erreur')
      res.status(500)
      res.send({ message: err.message })
    })
}

//delete articleObject.id
/*
  if (articleObject.userId !== req.auth.userId) {
    console.log('non autorisé')
    return res.status(401).json({
      message: 'unauthorized',
    })
  }
  */

/**
getAllArticles
*/
exports.getAllArticles = (req, res, next) => {
  Article.findAll({ limit: 55 })
    .then((articles) => {
      res.send(articles)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

/*
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


exports.updateArticle = (req, res, next) => {
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

exports.deleteArticle = (req, res, next) => {
  // ! id de la article but not id of the user --> security to adapt
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          message: 'Not Found',
        })
      }
      // ! only the user who sent the article can delete the article
      if (article.userId !== req.auth.userId) {
        console.log('nonautorisé')
        // !!!
        return res.status(401).json({
          message: 'unauthorized',
        })
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
*/
