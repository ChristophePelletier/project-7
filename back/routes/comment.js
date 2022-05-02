const express = require('express')
const router = express.Router()
//
const commentCtrl = require('../controllers/comments')
const auth = require('../middlewares/auth')
//
//router.get('/comments', articleCtrl.getCommentsArticle)
router.post('/comment', auth, commentCtrl.createComment)
router.get('/comment', auth, commentCtrl.getAllComments)
router.get('/onecomment/:articleId', auth, commentCtrl.getOneComment)
router.get('/comment/:articleId', auth, commentCtrl.getArticleComments)
router.delete('/comment/:id', auth, commentCtrl.deleteOneComment)
router.get('/usercomment/:userId', auth, commentCtrl.userRecentComments)
router.get(
  '/allcommentswitharticles',
  auth,
  commentCtrl.getAllCommentsWithArticles
)
router.get(
  '/usercommentswitharticles/:userId',
  auth,
  commentCtrl.getUserCommentsWithArticles
)
module.exports = router
