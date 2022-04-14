const db = require('../models')
const Comment = db.comment

const createComment = async (req, res) => {
  //const id = req.body.id
  //console.log(req.body.id)
  console.log('req.params', req.params)
  console.log('req.params.id', req.params.id)
  //  console.log(req.id)
  const id = req.params.id
  let data = {
    article_id: id,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  }
  const comment = await Comment.create(data)
  res.status(200).send(comment)
}

exports.getComments = (req, res, next) => {
  console.log('getComments')
  console.log(req)
  const artId = req.body.articleId
  console.log(artId)
  Comment.findAll({ where: { articleId: artId } })
    .then((comment) => {
      console.log(comment)
      res.status(200).json(comment)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}
module.exports = {
  createComment,
}
