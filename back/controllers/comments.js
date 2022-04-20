const db = require('../models')
const Comment = db.comment

const createComment = async (req, res) => {
  //const id = req.body.id
  console.log('req.body, ', req.body)
  console.log('1')
  //  console.log(req.id)
  //const id = req.params.id
  let data = {
    articleId: req.body.article,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    email: req.body.email,
  }
  const comment = await Comment.create(data)
  res.status(200).send(comment)
}

module.exports = {
  createComment,
}
