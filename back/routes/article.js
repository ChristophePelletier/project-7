const express = require('express')
const router = express.Router()

const articleCtrl = require('../controllers/articles')
const auth = require('../middlewares/auth')
const authConsult = require('../middlewares/authConsult')
//
router.get('/articles', authConsult, articleCtrl.getAllArticles)
router.get('/article/:articleId', articleCtrl.getOneArticle)
router.post('/article', articleCtrl.createArticle)
module.exports = router
