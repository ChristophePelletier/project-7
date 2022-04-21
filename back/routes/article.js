const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const articleCtrl = require('../controllers/articles')
//const auth = require('../middlewares/auth')
//const authConsult = require('../middlewares/authConsult')

router.get('/articles', articleCtrl.getAllArticles)
router.get('/article/:id', articleCtrl.getOneArticle)
router.post('/article', multer, articleCtrl.createArticle)

module.exports = router
