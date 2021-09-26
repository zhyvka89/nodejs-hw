const fs = require('fs/promises')
const path = require('path')
const getContactsList = require('./getContactsList')

const contactPath = path.join(__dirname, 'contacts.json')

const updateContact = async (id, body) => {
  const contacts = await getContactsList()
  const idx = contacts.findIndex(item => item.id === Number(id))
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body }
  await fs.writeFile(contactPath, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = updateContact
