const Joi = require("joi");

const prescriptionSchema = Joi.object({
  appointmentID: Joi.number().integer().required(),
  pharmacistID: Joi.string().uuid().required(),
  prescriptionDate: Joi.date().required(),
  medicationDetails: Joi.string().required(),
});

module.exports = { prescriptionSchema };
