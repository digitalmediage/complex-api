const Joi = require('joi');
// const Complex = require('./../models/complex.model');

module.exports = {


  // POST /v1/complex
  createComplex: {
    body: {
      name: Joi.string().required(),
      information: Joi.string(),
      city: Joi.string(),
      origin: Joi.string(),
      build_year: Joi.date().max('now'),
      address: Joi.string().min(5),
      contact: {
        email: Joi.string().email(),
        tell: Joi.number().min(4),
      },
    },
  },
};
