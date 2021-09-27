const getContactsList = require('./getContactsList')

const getContactById = async (id) => {
  try {
    const contacts = await getContactsList
    const index = contacts.findIndex(contact => contact.id === Number(id))

    if (index === -1) {
      return null
    }

    return contacts[index]
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getContactById
