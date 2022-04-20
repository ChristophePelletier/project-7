const { article } = require('../models')
const db = require('../models')
const Article = db.article

exports.createArticle = (req, res) => {
  console.log('***req :***', req)
  console.log('***req.body :***', req.body)
  let parsed = JSON.stringify(req.body)
  console.log('parsed', parsed)
  console.log('***req.file :***', req.file)
  console.log('req.body', req.body)
  console.log('req.body.article', req.body.article)
  let parsed2 = JSON.parse(req.body.article)
  console.log('parsed2', parsed2)
  console.log('req.body.article.title', req.body.article.title)
  //  console.log('***req.body.article.title', JSON.parse(req.body))
  /*
  if (!req.body.userId) {
    console.log("on ne peut plus envoyer d'articles sans être loggé")
  }
  */
  if (req.file) {
    Article.create({
      title: parsed2.title,
      author: parsed2.email,
      firstName: parsed2.firstName,
      content: parsed2.content,
      userId: parsed2.userId,
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
      title: parsed2.title,
      author: parsed2.email,
      firstName: parsed2.firstName,
      content: parsed2.content,
      userId: parsed2.userId,
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

exports.getCom = (req, res, next) => {
  console.log('getcom')
  console.log(req.body.id)
  res.send(res.body.id)
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
  const id = localStorage.getItem(idToSave)
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
