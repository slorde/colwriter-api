const bcrypt = require('bcrypt');
const hash = require('object-hash');
const { User, validate } = require('./model/user-model');
const UserService = require('./service/user-service');
const { BadRequestError, CustomError } = require('../../exceptions/custom-exceptions')

class Controller {
    constructor() {
      this.service = new UserService();
    }
    
    async singin(req, res) {
        const { body } = req;

        try {
          const { email } = body;
          if (!email) {
            return res.status(400).send({ message: 'E-mail is required' });
          }
        
          if (!body.password) {
            return res.status(400).send({ message: 'Password is required' });
          }
        
          const { token, userId} = await this.service.singin(body.email, body.password);
          return res.header('x-auth-token', token).send({
            userId
          });
        } catch(error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).send({ message: error.message});
          } else {
            res.status(500).send( { message: 'Erro Inesperado', detail: error.message});
          }
        }
    }

    async create(req, res) {
      try {
        const { error } = validate(req.body);
        if (error) {
          throw new BadRequestError(error.details[0].message);
        }

        const { body } = req;
        const { token, userId} = await this.service.create(body.name, body.email, body.password);

        return res.header('x-auth-token', token).send({
          userId
        }); 

      } catch(error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).send({ message: error.message});
        } else {
          res.status(500).send( { message: 'Erro Inesperado', error});
        }
      }     
    }
}

module.exports = Controller;