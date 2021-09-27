const { getContactsList } = require('../../model/contacts')

const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await getContactsList()
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

module.exports = getAllContacts
