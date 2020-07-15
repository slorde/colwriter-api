const { Project } = require('../model/project-model');
const { User } = require('../../user/model/user-model');
const { BadRequestError, UnexpectedError } = require('../../../exceptions/custom-exceptions');

class ProjectService {
    async create(userId, title) {
        const existUser = await User.exists({ id: userId });

        if (!existUser) {
            throw new BadRequestError('Invalid User');
        }

        Project.create({
            title,
            user_owner: userId,
        }, (errorCreate) => {
            if (errorCreate) {
                throw new UnexpectedError(errorCreate.message);
            }
            return errorCreate;
        });
    }
}

module.exports = ProjectService;
