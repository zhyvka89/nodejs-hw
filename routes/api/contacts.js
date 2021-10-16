const express = require('express')
const { getContacts, getById, addContact, removeContact, updateContact, updateStatus } = require('../../controllers/contacts')
const autenticate = require('../../middleware/autenticate')

const router = express.Router()

router.get('/', autenticate, getContacts)

router.get('/:id', autenticate, getById)

router.post('/', autenticate, addContact)

router.delete('/:id', autenticate, removeContact)

router.patch('/:id', autenticate, updateContact)

router.patch('/:id/favorite', autenticate, updateStatus)

module.exports = router
