const bcrypt = require('bcrypt');
const hash = require('object-hash');
const { User } = require('../model/user-model');
const { BadRequestError, AuthenticationFailure } = require('../../../exceptions/custom-exceptions');

class UserService {
    async singin(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError('User don\'t exist');
        }

        const isValidate = await bcrypt.compare(password, user.password);

        if (!isValidate) {
            throw new AuthenticationFailure('Wrong email or password.');
        }

        const token = user.generateAuthToken();
        return { token, userId: user.id };
    }

    async create(name, email, password) {
        let user = await User.findOne({ email });
        if (user) {
            throw new BadRequestError('User already registered.');
        }

        const data = {
            name,
            password,
            email,
        };
        data.id = hash({ name, email });
        user = new User(data);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        const token = user.generateAuthToken();
        return { token, userId: user.id };
    }
}

module.exports = UserService;
