const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const articleCtrl = require('../controllers/articles')
const auth = require('../middlewares/auth')
//const authConsult = require('../middlewares/authConsult')

router.get('/articles', auth, articleCtrl.getAllArticles)
router.get('/article/:id', auth, articleCtrl.getOneArticle)
router.post('/article', auth, multer, articleCtrl.createArticle)
router.get('/userarticle/:userId', articleCtrl.userRecentArticles)
router.get('/articleswithcomments', articleCtrl.getArticlesWithComments)
//router.get('/articlecomments/:articleId', articleCtrl.getArticleWithComments)
module.exports = router
