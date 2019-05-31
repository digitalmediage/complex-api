/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const {
  expect,
} = require('chai');
const User = require('../../api/user/models/user.model');
const httpStatus = require('http-status');
const Complex = require('./../../api/complex/DAO/complex.dao');
const {
  some,
  omitBy,
  isNil,
} = require('lodash');
// const sinon = require('sinon');

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
  let adminAccessToken;
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
    const password = '1234567890';
    const Users = {
      admin: {
        email: 'hamidrezanik00nia@gmail.com',
        password,
        role: 'admin',
      },
      user: {
        email: 'hamid.nik1@yahoo.com',
        password,
        role: 'manager',
      },
    };

    adminAccessToken = (await User.findAndGenerateToken(Users.admin)).accessToken;
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

          expect(res.body.data).to.be.an('array');
          expect(includesComplex_1).to.be.true;
          expect(includesComplex_2).to.be.true;
        });
    });
  });

  describe('POST /v1/complex', () => {
    it('should create a new complex when request is ok', () => {
      return request(app)
        .post('/v1/complex')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(dbComplex.complex_1)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.data).to.have.property('_id');
        });
    });
  });

  describe('PUT /v1/complex/:id', () => {
    it('should update a complex when request is ok', async () => {
      const id = (await Complex.findOne(dbComplex.complex_1))._id;
      return request(app)
        .put(`/v1/complex/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(dbComplex.complex_1)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.have.property('_id');
        });
    });
  });

  describe('PUT /v1/complex/:id', () => {
    it('should update a complex when request is ok', async () => {
      const id = (await Complex.findOne({}))._id;
      return request(app)
        .delete(`/v1/complex/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.be.equal('Delete Complex successfully');
        });
    });
  });
});
