/* eslint max-classes-per-file: ["error", 4] */
class CustomError extends Error { }

class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

class AuthenticationFailure extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}

class UnexpectedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}

module.exports = { BadRequestError, CustomError, AuthenticationFailure, UnexpectedError };
