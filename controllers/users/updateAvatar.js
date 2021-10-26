const path = require('path')
const fs = require('fs/promises')

const { User } = require('../../model/schemas/userModel')
const { Unauthorized } = require('http-errors')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { path: tmpDir, originalname } = req.file
  const [extension] = originalname.split('.').reverse()
  const filename = `${_id}.${extension}`
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename)
  try {
    await fs.rename(tmpDir, uploadDir)
    const image = path.join(tmpDir, filename)
    const result = await User.findByIdAndUpdate(_id, { avatarURL: image })
    if (!result) {
      throw new Unauthorized('Not authorized')
    }
    res.json({
      status: 'success',
      code: 201,
      message: 'Avatar is updated',
    })
  } catch (error) {
    await fs.unlink(tmpDir)
    next(error)
  }
}

module.exports = updateAvatar
