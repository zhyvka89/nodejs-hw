const { BadRequest } = require('http-errors')
const { addNewContact } = require('../../model/contacts')
const { joiSchema } = require('../../model/schemas/contactModel')

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    // const newContact = { ...req.body, owner: req.user._id }
    const result = await addNewContact(req.body)
    res.json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
