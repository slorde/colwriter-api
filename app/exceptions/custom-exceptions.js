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

module.exports = { BadRequestError, CustomError, AuthenticationFailure };
