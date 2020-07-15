const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../../index');
const { User } = require('../../../user/model/user-model');
const { Project } = require('../../model/project-model');

chai.use(chaiHttp);
const { expect } = chai;
const path = '/api/projects';
let user;

describe('Project integration test', () => {
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
            id: 'idTeste'
        });
        user.save()
            .then(() => done());
    });

    after((done) => {
        User.deleteMany({}, () => {
            done();
        });
    });

    describe('create', () => {
        it('should create project', (done) => {
            chai.request(server)
                .post(path)
                .set('x-access-token', user.generateAuthToken())
                .send({ title: 'project name', userId: 'idTeste' })
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

        it('should inform userId', (done) => {
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

        it('should inform a userId that exists', (done) => {
            chai.request(server)
                .post(path)
                .set('x-access-token', user.generateAuthToken())
                .send({ title: 'project name', userId: 'dont exist' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.deep.equal({ message: 'Invalid User' });
                    done();
                });
        });
    });
});
