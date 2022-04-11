const db = require('../models')
const Comment = db.comment

exports.createComment = (req, res) => {
  /*
  if (!req.body.userId) {
    console.log("on ne peut pas envoyer de commentaires sans être identifié")
  }
  */
  Comment.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    //
    //test
    //userId: req.body.userId,
    //
  })
    .then((comment) => {
      console.log('commentaire bien créé')
      res.status(200)
      res.send(comment.toJSON())
      //res.send({ message: "L'utilisateur a été enregistré avec succès!" })
    })
    .catch((err) => {
      console.log('Erreur')
      res.status(500)
      res.send({ message: err.message })
    })
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
