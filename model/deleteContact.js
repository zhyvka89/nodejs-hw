const fs = require('fs/promises')
const path = require('path')
const getContactsList = require('./getContactsList')

const contactPath = path.join(__dirname, 'contacts.json')

const deleteContact = async (id) => {
  try {
    const contacts = await getContactsList()
    const idx = contacts.findIndex(item => item.id === Number(id))

    if (idx === -1) {
      return null
    }

    contacts.splice(idx, 1)
    await fs.writeFile(contactPath, JSON.stringify(contacts))

    return true
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = deleteContact
