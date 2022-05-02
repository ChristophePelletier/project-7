// méthode :
//https://www.bezkoder.com/node-js-upload-image-mysql/
/*
const fs = require('fs')
const db = require('../models')
const Image = db.images
const uploadFiles = async (req, res) => {
  try {
    console.log(req.file)
    if (req.file == undefined) {
      return res.send(`Vous devez sélectionner un fichier`)
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename),
    }).then((image) => {
      fs.writeFileSync(__basedir + '/tmp/' + image.name, image.data)
      return res.send(`Le fichier a été téléchargé`)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Erreur dans le téléchargement de l'image : ${error}`)
  }
}
module.exports = {
  uploadFiles,
}
*/
