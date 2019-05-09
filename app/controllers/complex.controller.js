/* eslint-disable no-console */
const Complex = require('./../models/Complex.model');
const spec = require('../spec');


/**
 * @swagger
 *
 * definitions:
 *   Complex:
 *     type: object
 *     required:
 *       - complex_name
 *       - address
 *     properties:
 *       complex_name:
 *         type: string
 *       address:
 *         type: string
 *       photo:
 *         type: String
 */


/**
 * @swagger
 *
 * /complex:
 *   get:
 *     description: Get all complex
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return all complexModel
 */

exports.FindAll = async ctx => {
  const complex = await Complex.find({});
  ctx.body = complex;
};

exports.Create = async ctx => {
  const newComplex = new Complex(ctx.request.body);
  const saveComplex = await newComplex.save();
  ctx.body = saveComplex;
};

exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};
