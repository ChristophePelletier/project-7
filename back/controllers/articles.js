const db = require('../models')
const Article = db.article

exports.createArticle = (req, res) => {
  /*
  if (!req.body.userId) {
    console.log("on ne peut plus envoyer d'articles sans être loggé")
  }
  */
  Article.create({
    title: req.body.title,
    author: req.body.email,
    content: req.body.content,
    userId: req.body.userId,
  })
    .then((article) => {
      console.log('article bien créé')
      res.status(200)
      res.send(article.toJSON())
    })
    .catch((err) => {
      console.log('Erreur')
      res.status(500)
      res.send({ message: err.message })
    })
}

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

exports.getOneArticle = (req, res, next) => {
  console.log('getOneArticle')
  Article.findByPk(req.params.id)
    .then((article) => {
      console.log(article)
      console.log('req.params.id :', req.params.id)

      res.status(200).json(article)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

exports.getArticleComments = (req, res, next) => {
  const id = req.params.id
  Article.findOne({
    include: [
      {
        model: Commment,
        as: 'comment',
      },
    ],
    where: { id: id },
  })
    .then((comments) => {
      res.status(200).send(comments)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
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
