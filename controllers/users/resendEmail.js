const { BadRequest } = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const { sendEmail } = require('../../helpers')
const { joiSchema, User } = require('../../model/schemas/userModel')

const resendEmail = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest('Validation error, missing required field')
    }
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user.verify) {
      throw BadRequest('Verification has already been passed')
    }
    const verifyToken = uuidv4()
    const verificationEmail = {
      to: email,
      subject: 'Varification Link',
      html: `<a href='http://localhost:3000/api/users/verify/${verifyToken}'> Please, verify your email </a>`
    }
    sendEmail(verificationEmail)
    res.json({
      status: 'success',
      code: 200,
      message: 'Verification email sent'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = resendEmail
