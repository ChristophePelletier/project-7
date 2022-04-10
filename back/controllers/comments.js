const db = require('../models')
const Comment = db.comment

exports.createComment = (articleId, comment) => {
  if (!req.body.userId) {
    console.log('on ne peut plus envoyer de commentaires sans être loggé')
  }
  return Comment.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    articleId: articleId,
  })
    .then((comment) => {
      console.log('>> Created comment: ' + JSON.stringify(comment, null, 4))
      return comment
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err)
    })
}
