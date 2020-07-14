const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectID } = require('mongodb');
const server = require('../../../../../index');
const { User } = require('../../../user/model/user-model');
const { Project } = require('../../model/project-model');

chai.use(chaiHttp);
const { expect } = chai;
const path = '/api/projects';
let user;

describe('Project route test', () => {
    beforeEach((done) => {
        Project.deleteMany({}, () => {
            done();
        });
    });

    before((done) => {
        user = new User({
            name: 'teste',
            password: 'teste',
            email: 'teste@teste.com.br',
        });
        user.save()
            .then(() => done());
    });

    after((done) => {
        User.deleteMany({}, () => {
            done();
        });
    });

    it('should create project', (done) => {
        chai.request(server)
            .post(path)
            .set('x-access-token', user.generateAuthToken())
            .send({ title: 'project name', userId: user.id })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should inform title', (done) => {
        chai.request(server)
            .post(path)
            .set('x-access-token', user.generateAuthToken())
            .send({ userId: user.id })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.deep.equal({ message: '"title" is required' });
                done();
            });
    });

    it('should inform user', (done) => {
        chai.request(server)
            .post(path)
            .set('x-access-token', user.generateAuthToken())
            .send({ title: 'project name' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.deep.equal({ message: '"userId" is required' });
                done();
            });
    });

    it('should inform a valid user id', (done) => {
        chai.request(server)
            .post(path)
            .set('x-access-token', user.generateAuthToken())
            .send({ title: 'project name', userId: new ObjectID() })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.deep.equal({ message: 'Usuário incorreto para criação de projeto' });
                done();
            });
    });
});
