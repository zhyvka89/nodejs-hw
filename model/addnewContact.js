const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const getContactsList = require('./getContactsList')

const contactPath = path.join(__dirname, 'contacts.json')

const addNewContact = async (body) => {
  try {
    const contacts = await getContactsList()
    const newContact = { id: uuidv4(), ...body }

    contacts.push(newContact)
    await fs.writeFile(contactPath, JSON.stringify(contacts))

    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = addNewContact
