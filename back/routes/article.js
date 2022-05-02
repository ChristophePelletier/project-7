const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const articleCtrl = require('../controllers/articles')
const auth = require('../middlewares/auth')
//const authConsult = require('../middlewares/authConsult')
router.delete('/article/:id', auth, articleCtrl.deleteOneArticle)
router.get('/articles', auth, articleCtrl.getAllArticles)
router.get('/article/:id', auth, articleCtrl.getOneArticle)
router.post('/article', auth, multer, articleCtrl.createArticle)
router.get('/userarticle/:userId', auth, articleCtrl.userRecentArticles)
router.get('/articleswithcomments', auth, articleCtrl.getArticlesWithComments)
router.get(
  '/allArticleswithcomments',
  auth,
  articleCtrl.getAllArticlesWithComments
)
//router.get('/articlecomments/:articleId', articleCtrl.getArticleWithComments)
router.get(
  '/userarticleswithcomments/:userId',
  auth,
  articleCtrl.getUserArticlesWithComments
)
module.exports = router
