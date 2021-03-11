const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

const checkToken = require('../middlewares/token')
const bodyFilter = require('../middlewares/body-filter')
const checkRole = require('../middlewares/role')


// POST
router.post('/login', bodyFilter(['email', 'password'], 'AND'), userCtrl.loginUser)
router.post('/checkToken', checkToken, userCtrl.okToken)
router.post('/register', bodyFilter(['email', 'username', 'password'], 'AND'), userCtrl.registerUser)
router.post('/valid', bodyFilter(['email', 'code'], 'AND'), userCtrl.validUser)

router.post('/', checkToken, checkRole('FULL_ADMIN'), bodyFilter(['email', 'role'], 'AND'), userCtrl.addUser)


// GET
router.get('/', checkToken, userCtrl.getUser)

// PUT
router.put('/', checkToken, bodyFilter(['username', 'email', 'password'], 'OR'), userCtrl.updateUser)




module.exports = router