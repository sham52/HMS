const Joi = require("joi");
const patientSchema = Joi.object({
  patientID: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("Erkek", "Kadın", "Diğer").required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  password: Joi.string().required(),
});

module.exports = { patientSchema };
