import { Request, Response, NextFunction } from 'express';

// Api methods wrapper
export function apiMethod(innerFunction: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(innerFunction(req, res, next))
    .then((result) => {
      res.json(result);
    }, (err) => {
      console.log(err);
      res.status(err.status || 500).json(err.response);
    });
  };
}
