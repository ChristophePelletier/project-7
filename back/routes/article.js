const express = require('express')
const router = express.Router()

const articleCtrl = require('../controllers/articles')
//
router.get('/articles', articleCtrl.getAllArticles)
router.post('/article', articleCtrl.createArticle)
module.exports = router
