const Joi = require("joi");

const doctorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  departmentID: Joi.number().integer().required(),
});

module.exports =  { doctorSchema };
