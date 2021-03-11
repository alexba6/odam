const express = require('express')

const router = express.Router()

const articleCtrl = require('../controllers/article')

const checkToken = require('../middlewares/token')
const bodyFilter = require('../middlewares/body-filter')
const checkRole = require('../middlewares/role')

// GET
router.get('/random', articleCtrl.getRandomArticle)
router.get('/:id', checkToken, checkRole('READER'), articleCtrl.getOneArticle)
router.get('/', checkToken, checkRole('READER'), articleCtrl.getAllArticle)

// POST
router.post('/', checkToken, checkRole('WRITER'), bodyFilter(['title', 'content'], 'AND'), articleCtrl.addArticle)


// DELETE
router.delete('/:id', checkToken, checkRole('DELETER'), articleCtrl.deleteArticle)

// PUT
router.put('/:id', checkToken, checkRole('UPDATER'), bodyFilter(['title', 'content'], 'OR'), articleCtrl.updateArticle)





module.exports = router