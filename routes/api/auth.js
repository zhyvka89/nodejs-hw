const express = require('express')
const { signin, signup, signout, current } = require('../../controllers/auth')
const autenticate = require('../../middleware/autenticate')

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.get('/signout', autenticate, signout)

router.get('/current', autenticate, current)

module.exports = router
