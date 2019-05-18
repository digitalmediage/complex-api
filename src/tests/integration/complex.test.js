/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const expect = require('chai');
const sinon = require('sinon');

const app = require('./../../index');

describe('Complex API', async () => {
  const complex = {
    name: 'complex name',
    address: 'georgia blab blab',
    contact: {
      email: 'hamid@gmail.com',
      tell: '09122526777',
    },
    properties: [],
  };

  describe('POST /v1/complex', () => {
    it('Get all Complex', () => {
      return (app)
        .get('/v1/complex')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
        });
    });
  });

  describe('POST /v1/complex', () => {
    it('should create a new complex when request is ok', () => {
      return request(app)
        .post('/v1/complex')
        .send(complex)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(complex);
        });
    }); // end test
    it('should report error when complex_name already exists', () => {
      complex.name = 'name';

      return request(app)
        .post('/v1/complex')
        .send(complex)
        .expect(httpStatus.CONFLICT)
        .then((res) => {
          const {
            field,
          } = res.body.errors[0];
          const {
            location,
          } = res.body.errors[0];
          const {
            messages,
          } = res.body.errors[0];
          expect(field).to.be.equal('email');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"email" already exists');
        });
    }); // end tes
    it('should report error when contact (tell) is not provided', () => {
      return request(app)
        .post('/v1/complex')
        .send(complex)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          const {
            field,
          } = res.body.errors[0];
          const {
            location,
          } = res.body.errors[0];
          const {
            messages,
          } = res.body.errors[0];
          expect(field).to.be.equal('tell');
          expect(location).to.be.equal('body');
          expect(messages).to.include('contact not provided');
        });
    });
  });
});
