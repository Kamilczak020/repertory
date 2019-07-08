import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from '../error';

export interface UserToken {
  iat: number;
  user: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['RepertoryUser'];
  try {
    const decoded = jwt.verify(token, process.env.SECRET) as UserToken;
    res.locals.user = decoded.user;
    next();
  } catch (error) {
    throw new AuthenticationError('Your session has finished. Please log in again.');
  }
}
