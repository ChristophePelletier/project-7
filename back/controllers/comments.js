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
