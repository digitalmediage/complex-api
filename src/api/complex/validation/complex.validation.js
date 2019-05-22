const Joi = require('joi');
// const Complex = require('./../models/complex.model');

module.exports = {


  // POST /v1/complex
  createComplex: {
    body: {
      name: Joi.string().min(2).max(50).required(),
      information: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      charge_fee: Joi.number().greater(0),
      build_year: Joi.date().max('now'),
      address: Joi.string().min(5),
      floor: Joi.number().greater(0).required(),
      contact: {
        email: Joi.string().email(),
        tell: Joi.number().min(4),
      },
    },
  },

  listComplex: {
    query: {
      developer: Joi.string().max(30),
      country: Joi.string(),
      build_year: Joi.string(),
      createdAt: Joi.string(),
    },
  },

  listDeveloperComplex: {
    query: {
      developer: Joi.string().max(30),
      country: Joi.string(),
      build_year: Joi.string(),
      createdAt: Joi.string(),
    },
    params: {
      developer: Joi.string().required(),
    },
  },
  updateComplex: {
    body: {
      name: Joi.string().min(2).max(50),
      information: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      charge_fee: Joi.number().greater(0),
      build_year: Joi.date().max('now'),
      address: Joi.string().min(5),
      floor: Joi.number().greater(0),
      contact: {
        email: Joi.string().email(),
        tell: Joi.number().min(4),
      },
    },
  },
};
