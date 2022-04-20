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

/*
const getComments = async (req, res) => {
  console.log('getComments')
  console.log(req)
  const artId = req.body.articleId
  console.log(artId)
  Comment.findAll()
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
  getComments,
}


const getComments = async (req, res) => {
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
*/
