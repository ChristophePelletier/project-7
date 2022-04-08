const express = require('express')
const router = express.Router()

const articleCtrl = require('../controllers/articles')
//
router.get('/', articleCtrl.getAllArticles)
router.post('/', articleCtrl.createArticle)
module.exports = router
