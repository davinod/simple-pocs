//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Ilovepets', () => {

  describe('/', () => {
      it('Main Page', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

    describe('/dogs', () => {
      it('Dogs Page', (done) => {
        chai.request(server)
            .get('/dogs')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

    describe('/cats', () => {
      it('Cats Page', (done) => {
        chai.request(server)
            .get('/cats')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

});

