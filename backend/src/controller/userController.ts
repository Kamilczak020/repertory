import { Request, Response, NextFunction } from 'express';
import { RegistrationError, LoginError, DatabaseError, AuthenticationError } from '../error';
import { isString } from 'util';
import User from '../model/user';
import * as jwt from 'jsonwebtoken';
import { UserToken } from 'middleware/authenticate';

export interface UserCookie {
  iat: number;
  user: string;
}

export enum RegistrationFailureReason {
  UsernameExists = 'username-exists',
  EmailExists = 'email-exists',
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!isString(username) || !isString(password)) {
    throw new RegistrationError('Invalid Credentials.');
  }

  const usernameUser = await User.findOne({ where: { username }}).catch((error) => {
    throw new DatabaseError(error);
  });
  if (usernameUser) {
    throw new RegistrationError('Username already in database.', RegistrationFailureReason.UsernameExists);
  }

  const [user, created] = await User.findOrCreate({ where: { email }, defaults: { username, password }}).catch((error) => {
    throw new DatabaseError(error);
  });
  if (!created) {
    throw new RegistrationError(`Email already in database.`, RegistrationFailureReason.EmailExists);
  }

  return {
    status: 'success',
    message: `Created user "${user.username}"`,
  };
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  if (!isString(username) || !isString(password)) {
    throw new LoginError('Invalid Credentials.');
  }

  const user = await User.findOne({ where: { username }}).catch((error) => {
    throw new DatabaseError(error);
  });
  if (user === null) {
    throw new LoginError('Username not in database.');
  }

  if (!await user.validatePassword(password)) {
    throw new AuthenticationError(`Invalid password for username: ${user}`);
  }

  // Secret is here TEMPORAIRLY!
  const token = jwt.sign({ user: user.username }, process.env.SECRET);
  res.cookie('RepertoryUser', token);

  return {
    status: 'success',
    message: `Logged in user "${user.username}"`,
  };
}

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['RepertoryUser'];
  try {
    const decoded = jwt.verify(token, process.env.SECRET) as UserToken;
    return {
      status: 'success',
      message: `User authenticated`,
    };
  } catch (error) {
    throw new AuthenticationError('Your session has finished. Please log in again.');
  }
}
