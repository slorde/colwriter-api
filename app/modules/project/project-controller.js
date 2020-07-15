const { validate } = require('./model/project-model');
const ProjectService = require('./service/project-service');
const { BadRequestError, CustomError } = require('../../exceptions/custom-exceptions');

class Controller {
    constructor() {
        this.service = new ProjectService();
    }

    async create(req, res, next) {
        try {
            const { error } = validate(req.body);

            if (error) {
                throw new BadRequestError(error.details[0].message);
            }
            await this.service.create(req.body.userId, req.body.title);

            res.sendStatus(200);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Erro Inesperado', error });
            }
        }

        return next();
    }
}

module.exports = Controller;
