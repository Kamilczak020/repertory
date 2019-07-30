import { Router } from 'express';
import { apiMethod } from '../util/apiMethod';
import { uploadUserImage } from '../controller/userController';
import { upload } from '../middleware/multer';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post('/image', upload.single('userImage'), apiMethod(uploadUserImage));
  }
}

const authRouter = new AuthRouter();
export default authRouter.router;
