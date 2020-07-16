const { validate } = require('./model/user-model');
const UserService = require('./service/user-service');
const { BadRequestError, CustomError } = require('../../exceptions/custom-exceptions');

class Controller {
    constructor() {
        this.service = new UserService();
    }

    async singin(req, res, next) {
        const { body } = req;

        try {
            const { email } = body;
            if (!email) {
                throw new BadRequestError('E-mail is required');
            }

            if (!body.password) {
                throw new BadRequestError('Password is required');
            }

            const { token, userId } = await this.service.singin(body.email, body.password);
            res.header('x-auth-token', token).send({
                userId
            });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Erro Inesperado', detail: error.message });
            }
        }

        return next();
    }

    async create(req, res, next) {
        try {
            const { error } = validate(req.body);
            if (error) {
                throw new BadRequestError(error.details[0].message);
            }

            const { body } = req;
            const { token, userId } = await this.service.create(body.name, body.email, body.password);

            res.header('x-auth-token', token).send({
                userId
            });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Unexpected error' });
            }
        }

        return next();
    }
}

module.exports = Controller;
