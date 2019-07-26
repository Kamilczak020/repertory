import { Router } from 'express';
import { apiMethod } from '../util/apiMethod';
import { loginUser, logoutUser, registerUser, verifyUser } from '../controller/userController';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post('/register', apiMethod(registerUser));
    this.router.post('/login', apiMethod(loginUser));
    this.router.post('/logout', apiMethod(logoutUser));
    this.router.post('/verify', apiMethod(verifyUser));
  }
}

const authRouter = new AuthRouter();
export default authRouter.router;
