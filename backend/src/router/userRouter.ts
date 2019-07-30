import { Router } from 'express';
import { apiMethod } from '../util/apiMethod';
import { uploadUserImage, getUserProfile } from '../controller/userController';
import { upload } from '../middleware/multer';
import { authenticate } from '../middleware/authenticate';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post('/image', authenticate, upload.single('userImage'), apiMethod(uploadUserImage));
    this.router.get('/profile', authenticate, apiMethod(getUserProfile));
  }
}

const authRouter = new AuthRouter();
export default authRouter.router;
