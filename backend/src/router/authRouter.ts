import { Router } from 'express';
import { apiMethod } from '../util/apiMethod';
import { loginUser, registerUser } from '../controller/userController';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post('/register', apiMethod(registerUser));
    this.router.post('/login', apiMethod(loginUser));
  }
}

const authRouter = new AuthRouter();
export default authRouter.router;
