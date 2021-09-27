const Joi = require('joi')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})

const joiSchemaForPatch = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
})

module.exports = {
  joiSchema,
  joiSchemaForPatch
}
