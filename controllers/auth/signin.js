const { BadRequest, Unauthorized } = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { joiSchema, User } = require('../../model/schemas/userModel')

const { SECRET_KEY } = process.env

const signin = async(req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest('Validation error')
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Unauthorized('Email not found')
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password)
    if (!isCorrectPassword) {
      throw new Unauthorized('Wrong password')
    }
    const payload = {
      id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY)
    await User.findByIdAndUpdate(user._id, { token })
    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: user.subscription
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signin
