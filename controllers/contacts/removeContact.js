const { NotFound } = require('http-errors')
const { deleteContact } = require('../../model/contacts')

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await deleteContact(id)
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
