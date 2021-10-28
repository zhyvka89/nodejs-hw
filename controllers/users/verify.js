const { NotFound } = require('http-errors')
const { User } = require('../../model/schemas/userModel')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound()
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null })
  res.json({
    status: 'success',
    code: 200,
    message: 'Email is successfuly verified '
  })
}

module.exports = verify
