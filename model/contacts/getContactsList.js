const fs = require('fs/promises')
const path = require('path')

const contactPath = path.join('db', 'contacts.json')

const getContactsList = async () => {
  try {
    const data = await fs.readFile(contactPath)
    const contacts = JSON.parse(data)

    return contacts
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getContactsList
