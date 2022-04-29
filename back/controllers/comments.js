const db = require('../models')
const Comment = db.comment

exports.createComment = (req, res) => {
  //const id = req.body.id
  console.log('req.body, ', req.body)
  console.log('1')
  //  console.log(req.id)
  //const id = req.params.id
  let data = {
    articleId: req.body.articleId,
    title: req.body.title,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    content: req.body.content,
    userId: req.body.userId,
    email: req.body.email,
  }
  const comment = Comment.create(data)
  res.status(200).send(comment)
}

exports.getAllComments = (req, res, next) => {
  Comment.findAll({ limit: 15, order: [['createdAt', 'DESC']] })
    .then((comments) => {
      res.send(comments)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

exports.getArticleComments = (req, res, next) => {
  Comment.findAll({ where: { articleId: req.params.articleId } })
    .then((comments) => {
      res.send(comments)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

exports.deleteOneComment = (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      /*
      if (req.auth.userId !== true) {
        console.log('non autorisé')
        console.log('req.params.id', req.params.id)
        return res.status(401).json({
          message:
            'non autorisé ; seuls les administrateurs peuvent modérer les commentaires ; contacter un administrateur',
        })
      }
      */
      Comment.destroy({ where: { id: comment.id } })
      console.log('req.params.id', req.params.id)
      console.log('ok')
      res.status(200).send({
        resp: `<p>Suppression du commentaire ok</p>`,
      })
      //return res.status(200).json({ ok: 'suppression du du commentaire' })
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

exports.userRecentComments = (req, res, next) => {
  Comment.findAll({
    where: { userId: req.params.userId },
    commentlimit: 5,
    order: [['createdAt', 'DESC']],
  })
    .then((comments) => {
      res.send(comments)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}
exports.getOneComment = (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      res.status(200).json(comment)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

exports.getAllCommentsWithArticles = (req, res, next) => {
  console.log('getAllCommentsWithArticles')
  Comment.findAll({
    include: [{ all: true, nested: true }],
    limit: 5,
    order: [['createdAt', 'DESC']],
  })
    .then((comments) => {
      res.send(comments)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

exports.getComments = (req, res, next) => {
  console.log('getAllCommentsWithArticles')
  Comment.findAll({
    include: [{ all: true, nested: true }],
    limit: 5,
    order: [['createdAt', 'DESC']],
  })
    .then((comments) => {
      res.send(comments)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

exports.getUserCommentsWithArticles = (req, res, next) => {
  console.log('getUserRecentComents')
  Comment.findAll({
    include: [{ all: true, nested: true }],
    limit: 5,
    where: { userId: req.params.userId },
    order: [['createdAt', 'DESC']],
  })
    .then((comments) => {
      res.send(comments)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}
