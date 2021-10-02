const { BadRequest, NotFound } = require('http-errors')
const { joiSchemaForPatch } = require('../../model/schemas/contactModel')

const updateStatus = async (req, res, next) => {
  try {
    const { error } = joiSchemaForPatch.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { id } = req.params
    const result = updateStatus(id)
    if (!result) {
      throw new NotFound(`Product with id=${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatus
