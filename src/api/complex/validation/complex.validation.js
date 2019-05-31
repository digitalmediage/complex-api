const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const GeorgiaCities = require('./../../utils/GeorgiaCities');
// const Complex = require('./../models/complex.model');


module.exports = {


  // POST /v1/complex
  createComplex: {
    body: {
      name: Joi.string().min(2).max(50).required(),
      information: Joi.string().max(500),
      city: Joi.string().valid(GeorgiaCities),
      country: Joi.string().default('Georgia'),
      charge_fee: Joi.number().greater(0),
      build_year: Joi.date().max('now'),
      address: Joi.string().min(5).required(),
      floor: Joi.number().greater(0).required(),
      contact: {
        email: Joi.string().email().required(),
        tell: Joi.number().required(),
      },
    },
  },

  listComplex: {
    query: {
      build_year: Joi.string().empty(),
      createdAt: Joi.string().empty(),
      name: Joi.string().empty(),
      city: Joi.string().empty(),
      cadastra: Joi.string().empty(),
      developer: Joi.string().empty(),
    },
  },
  updateComplex: {
    body: {
      name: Joi.string().min(2).max(50),
      information: Joi.string().max(500),
      city: Joi.string().valid(GeorgiaCities),
      country: Joi.string().default('Georgia'),
      charge_fee: Joi.number().greater(0),
      build_year: Joi.date().max('now'),
      address: Joi.string().min(5),
      floor: Joi.number().greater(0),
      contact: {
        email: Joi.string().email(),
        tell: Joi.number(),
      },
    },
    params: {
      id: Joi.objectId().required().description('please select an complex'),
    },
  },
};
