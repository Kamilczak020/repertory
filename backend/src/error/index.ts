import { BaseError } from 'make-error';

export interface ErrorResponse {
  reason: string;
}

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
  public response: ErrorResponse;

  constructor(message?: string, reason?: string) {
    super(`Authentication error: ${message}`);

    this.response = { reason };
  }
}

export class LoginError extends AuthenticationError {
  constructor(message?: string, reason?: string) {
    super(`Login error: ${message}`);

    this.response = { reason };
  }
}

export class RegistrationError extends AuthenticationError {
  public status = 403;

  constructor(message?: string, reason?: string) {
    super(`Registration error: ${message}`);

    this.response = { reason };
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
