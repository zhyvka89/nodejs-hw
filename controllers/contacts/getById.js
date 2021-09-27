const { NotFound } = require('http-errors')
const { getContactById } = require('../../model/contacts')

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await getContactById(id)
    if (!contact) {
      throw new NotFound(`Product with id=${id} not found`)
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
}

module.exports = getById
