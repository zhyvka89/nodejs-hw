const { Contact } = require('../schemas/contactModel')

const getContactsList = () => {
  return Contact.find()
}
const getContactById = (id) => {
  return Contact.findOne({ _id: id })
}
const deleteContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}
const addNewContact = (body) => {
  return Contact.create(body)
}
const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
}

const updateStatus = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
}

module.exports = {
  getContactsList,
  getContactById,
  deleteContact,
  addNewContact,
  updateContact,
  updateStatus
}
