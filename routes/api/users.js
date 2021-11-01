const express = require('express')
const { current, updateAvatar, verify, resendEmail } = require('../../controllers/users')
const { autenticate, upload } = require('../../middleware')

const router = express.Router()

router.get('/current', autenticate, current)

router.patch('/avatars', autenticate, upload.single('avatar'), updateAvatar)

router.get('/verify/:verifyToken', verify)

router.post('/verify', resendEmail)

module.exports = router
