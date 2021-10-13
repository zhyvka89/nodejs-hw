const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false)
})

const joiSchemaForPatch = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
}).min(1)

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  joiSchemaForPatch
}
