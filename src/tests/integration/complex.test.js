/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const { expect } = require('chai');
const httpStatus = require('http-status');
const Complex = require('./../../api/complex/DAO/complex.dao');
const {
  some,
  omitBy,
  isNil,
} = require('lodash');
const sinon = require('sinon');

const app = require('./../../index');

/**
 * root level hooks
 */

async function format(complex) {
  // get complex from database
  const dbComplex = (await Complex.findOne({
    name: complex.name,
  }));

  // remove null and undefined properties
  return omitBy(dbComplex, isNil);
}

describe('Complex API', async () => {
  let dbComplex;
  beforeEach(async () => {
    dbComplex = {
      complex_1: {
        name: 'sanaz',
        developer: '5ce051dc7f306293680e3f48',
        cadastra: '343535245',
        floor: '2',
        address: 'georgia blab blab',
        contact: {
          email: 'hamid@gmail.com',
          tell: '09122526777',
        },
        properties: [],
      },
      complex_2: {
        name: 'ali',
        developer: '5ce051dc7f306293680e3f48',
        cadastra: '343535245',
        floor: '2',
        address: 'georgia blab blab',
        contact: {
          email: 'hamid@gmail.com',
          tell: '09122526777',
        },
        properties: [],
      },
    };
    await Complex.insertMany([dbComplex.complex_1, dbComplex.complex_2]);
  });

  describe('GET /v1/complex', () => {
    it('Get all Complex', () => {
      return request(app)
        .get('/v1/complex')
        .expect(httpStatus.OK)
        .then(async (res) => {
          const complex_1 = format(dbComplex.complex_1);
          const complex_2 = format(dbComplex.complex_2);

          const includesComplex_1 = some(res.body, complex_1);
          const includesComplex_2 = some(res.body, complex_2);

          // before comparing it is necessary to convert String to Date
          // res.body[0].createdAt = new Date(res.body[0].createdAt);
          // res.body[1].createdAt = new Date(res.body[1].createdAt);

          expect(res.body.data).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(includesComplex_1).to.be.true;
          expect(includesComplex_2).to.be.true;
        });
    });
  });
});
