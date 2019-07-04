import { Request, Response, NextFunction } from 'express';
import { RegistrationError, LoginError, DatabaseError, AuthenticationError } from '../error';
import { isString } from 'util';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';

export interface UserCookie {
  iat: number;
  user: string;
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  if (!isString(username) || !isString(password)) {
    throw new RegistrationError('Invalid Credentials.');
  }

  const [user, created] = await User.findOrCreate({ where: { username }, defaults: { username, password }}).catch((error) => {
    throw new DatabaseError(error);
  });

  if (!created) {
    throw new RegistrationError(`User with username: ${user.username} already exists.`);
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

  const user = await User.findOne({ where: { username }});
  if (user === null) {
    throw new LoginError('User with that username does not exist.');
  }

  if (!await user.validatePassword(password)) {
    throw new AuthenticationError('Invalid Password');
  }

  // Secret is here TEMPORAIRLY!
  const token = jwt.sign({ user: user.username }, 'CHOCOLATEY');
  res.cookie('MeetMeUser', token);

  return {
    status: 'success',
    message: `Logged in user "${user.username}"`,
  };
}
