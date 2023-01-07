const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(4).max(30).email().required(),
  phone: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^\+|\d[\s\d\-\(\)]*\$/),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().min(4).max(30).email(),
  phone: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^\+|\d[\s\d\-\(\)]*\$/),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
};
