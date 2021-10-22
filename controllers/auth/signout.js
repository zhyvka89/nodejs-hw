const { Unauthorized } = require('http-errors')
const { User } = require('../../model/schemas/userModel')

const singout = async(req, res, next) => {
  try {
    const { _id } = req.user
    const result = await User.findByIdAndUpdate(_id, { token: null })
    // await User.findByIdAndUpdate(_id, { token: null })
    if (!result) {
      throw new Unauthorized('Not authorized')
    }
    res.status(204).json()
  } catch (error) {
    next(error)
  }
}

module.exports = singout
