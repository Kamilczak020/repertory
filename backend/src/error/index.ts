import { BaseError } from 'make-error';

export class RequestError extends BaseError {
  public status = 400;
}

export class InvalidQueryError extends RequestError {
  constructor(message?: string) {
    super(`Invalid Query Error: ${message}`);
  }
}

export class AuthenticationError extends BaseError {
  public status = 401;
}

export class RegistrationError extends AuthenticationError {
  constructor(message?: string) {
    super(`Registration Error: ${message}`);
  }
}

export class LoginError extends AuthenticationError {
  constructor(message?: string) {
    super(`Login Error: ${message}`);
  }
}

export class DatabaseError extends BaseError {
    public status = 500;
}

export class HashError extends DatabaseError {
    constructor(message?: string) {
        super(`HashError: ${message}`);
    }
}

export class ConfigurationError extends BaseError {
  constructor(message?: string) {
    super(`Configuration error: ${message}. \n Aborting program...`);
  }
}
