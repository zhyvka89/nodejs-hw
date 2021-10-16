const { Contact } = require('../../model/schemas/contactModel')

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (page - 1) * limit
    const { _id } = req.user
    const contacts = await Contact.find({ owner: _id }, 'name phone favorite', { skip, limit: +limit })
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
}

// const getFavoriteContacts = async (req, res, next) => {
//   try {
//     const { favorite } = req.query
//     const { _id } = req.user
//     const favoriteContacts = await Contact.find({ owner: _id, favorite })
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         favoriteContacts
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = getAllContacts
