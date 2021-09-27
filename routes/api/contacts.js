const express = require('express')
const { getContacts, getById, addContact, removeContact, updateCont } = require('../../controllers/contacts')

const router = express.Router()

router.get('/', getContacts)

router.get('/:id', getById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.patch('/:id', updateCont)

module.exports = router
