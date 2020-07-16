const { expect } = require('chai');
const sinon = require('sinon');
const Controller = require('../../user-controller');

this.controller = new Controller();

describe('User unit test', () => {
    const sandbox = sinon.createSandbox();
    beforeEach((done) => {
        sandbox.restore();
        done();
    });

    describe('create', () => {
        it('should inform email', (done) => {
            const res = {
                send: (data) => {
                    expect(data).to.be.deep.equal({ message: '"email" is required' });
                },
                status(status) {
                    expect(status).to.be.equal(400);
                    return this;
                }
            };

            const req = {
                body: { name: 'test', password: 'test' }
            };

            this.controller.create(req, res, sinon.spy()).then(done);
        });

        it('should inform name', (done) => {
            const res = {
                send: (data) => {
                    expect(data).to.be.deep.equal({ message: '"name" is required' });
                },
                status(status) {
                    expect(status).to.be.equal(400);
                    return this;
                }
            };

            const req = {
                body: { password: 'test' }
            };

            this.controller.create(req, res, sinon.spy()).then(done);
        });

        it('should inform password', (done) => {
            const res = {
                send: (data) => {
                    expect(data).to.be.deep.equal({ message: '"password" is required' });
                },
                status(status) {
                    expect(status).to.be.equal(400);
                    return this;
                }
            };

            const req = {
                body: { name: 'test', email: 'test@test' }
            };

            this.controller.create(req, res, sinon.spy()).then(done);
        });

        it('create user', (done) => {
            sandbox.stub(this.controller.service, 'create').returns({ token: 'token', userId: 'id' });

            const res = {
                send: (data) => {
                    expect(data).to.be.deep.equal({ userId: 'id' });
                },
                header(key, value) {
                    expect(key).to.be.equal('x-auth-token');
                    expect(value).to.be.equal('token');
                    return this;
                }
            };

            const req = {
                body: { name: 'test', email: 'test@test', password: 'test' }
            };

            this.controller.create(req, res, sinon.spy()).then(done);
        });

        it('should catch unexpected error', (done) => {
            sandbox.stub(this.controller.service, 'create').throws(new Error('fake'));

            const res = {
                send: (data) => {
                    expect(data).to.be.deep.equal({ message: 'Unexpected error' });
                },
                status(status) {
                    expect(status).to.be.equal(500);
                    return this;
                }
            };

            const req = {
                body: { name: 'test', email: 'test@test', password: 'test' }
            };

            this.controller.create(req, res, sinon.spy()).then(done);
        });
    });
});
