const express = require('express')
const router = express.Router()

const articleCtrl = require('../controllers/articles')
//
router.get('/articles', articleCtrl)
router.post('/article', articleCtrl)
module.exports = router
