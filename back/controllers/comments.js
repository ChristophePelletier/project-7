const db = require('../models')
const Comment = db.comment

exports.createComment = (req, res) => {
  if (!req.body.userId) {
    console.log("on ne peut plus envoyer d'articles sans être loggé")
  }
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
      console.log('comment bien créé')
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
