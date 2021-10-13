const express = require('express')
const { getContacts, getById, addContact, removeContact, updateContact, updateStatus } = require('../../controllers/contacts')
// const autenticate = require('../../middleware/autenticate')

const router = express.Router()

router.get('/', getContacts)

router.get('/:id', getById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.patch('/:id', updateContact)

router.patch('/:id/favorite', updateStatus)

module.exports = router
