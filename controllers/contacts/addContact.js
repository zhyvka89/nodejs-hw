const { BadRequest } = require('http-errors')

const { Contact, joiSchema } = require('../../model/schemas/contactModel')

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await Contact.create({ ...req.body, owner: req.user._id })
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
