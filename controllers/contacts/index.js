const getContacts = require('./getContacts')
const getById = require('./getById')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')
const updateStatus = require('./updateStatus')

module.exports = {
  getContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatus
}
