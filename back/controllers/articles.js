const db = require('../models')
const Article = db.article

exports.createArticle = (req, res) => {
  console.log('***req.body :***', req.body)
  console.log('***req.file :***', req.file)
  /*
  if (!req.body.userId) {
    console.log("on ne peut plus envoyer d'articles sans être loggé")
  }
  */
  if (req.file) {
    Article.create({
      title: req.body.title,
      author: req.body.email,
      firstName: req.body.firstName,
      content: req.body.content,
      userId: req.body.userId,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
  } else {
    Article.create({
      title: req.body.title,
      author: req.body.email,
      firstName: req.body.firstName,
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
}

exports.getAllArticles = (req, res, next) => {
  Article.findAll({ limit: 15, order: [['createdAt', 'DESC']] })
    .then((articles) => {
      res.send(articles)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

exports.getRecentArticles = (req, res, next) => {
  Article.findAll({
    order: [['createdAt', 'DESC']],
  })
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
      console.log('article dans get One :', article)
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
