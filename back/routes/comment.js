const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comments')
const auth = require('../middlewares/auth')
const authConsult = require('../middlewares/authConsult')
//
//router.get('/comments', articleCtrl.getCommentsArticle)
router.post('/comment', commentCtrl.createComment)
//router.get('/comment', commentCtrl.getCom)
module.exports = router
