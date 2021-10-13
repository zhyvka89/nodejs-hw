const { Conflict, BadRequest } = require('http-errors')
const bcrypt = require('bcrypt')
const { User, joiSchema } = require('../../model/schemas/userModel')

const singup = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest('Validation error')
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email is already registered')
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await User.create({ email, password: hashPassword })
    res.json({
      status: 'success',
      code: 201,
      message: 'Register success'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = singup
