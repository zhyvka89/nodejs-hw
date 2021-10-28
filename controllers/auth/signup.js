const { Conflict, BadRequest } = require('http-errors')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')

const { User, joiSchema } = require('../../model/schemas/userModel')
const { sendEmail } = require('../../helpers')

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
    const avatarURL = gravatar.url(email)
    const verifyToken = uuidv4()
    await User.create({
      email,
      avatarURL,
      password: hashPassword,
      verifyToken
    })
    const verificationEmail = {
      to: email,
      subject: 'Varification Link',
      html: `<a href='http://localhost:3000/api/users/verify/${verifyToken}'> Please, verify your email </a>`
    }
    sendEmail(verificationEmail)
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
