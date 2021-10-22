const { NotFound } = require('http-errors')

const { Contact } = require('../../model/schemas/contactModel')

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findByIdAndRemove({ _id: id, owner: req.user._id })
    if (!result) {
      throw new NotFound(`Product with id=${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
