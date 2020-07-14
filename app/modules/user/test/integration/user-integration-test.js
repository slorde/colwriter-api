const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectID } = require('mongodb');
const server = require('../../../../../index');
const { User } = require('../../model/user-model');

chai.use(chaiHttp);
const { expect } = chai;
const path = '/api/users';
let user;

describe.only('User integration test', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('Create', () => {
    it('create user must return 200', (done) => {
      chai.request(server)
        .post(path)
        .send({ name: 'user name', password: 'test', email: 'user@name' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql({ userId: '924d9c3c171c88eafcc96acafe03bb6e79bb63da' })
          done();
        });
    });
  
    it('must inform name', (done) => {
      chai.request(server)
        .post(path)
        .send({ password: 'test', email: 'user@name' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.eql({ message: '"name" is required' })
          done();
        });
    });

    it('must inform email', (done) => {
      chai.request(server)
        .post(path)
        .send({ name: 'test', password: 'test' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.eql({ message: '"email" is required' })
          done();
        });
    });

    it('must inform password', (done) => {
      chai.request(server)
        .post(path)
        .send({ name: 'test', email: 'user@name' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.eql({ message: '"password" is required' })
          done();
        });
    });

    it('dot not allow create user with same email', (done) => {
      user = new User({
        name: 'teste',
        password: 'teste',
        email: 'teste@teste.com.br',
      });
      user.save()
        .then(() => done());

      chai.request(server)
        .post(path)
        .send({ name: 'user name', password: 'test', email: 'teste@teste.com.br' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.eql({ message: 'User already registered' })
          done();
        });
    });
  });

});
