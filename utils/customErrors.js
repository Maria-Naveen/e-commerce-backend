class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

//error class for handling unauthorized entry of users
class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}
//error class for handling already exist error
class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
};
