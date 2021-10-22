const { NotFound } = require('http-errors')

const { Contact } = require('../../model/schemas/contactModel')

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await Contact.findOne({ _id: id, owner: req.user._id })
    if (!contact) {
      throw new NotFound(`Product with id=${id} not found`)
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
}

module.exports = getById
