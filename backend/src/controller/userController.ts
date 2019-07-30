import { Request, Response, NextFunction } from 'express';
import UserImage from '../model/userImage';
import { DatabaseError, RequestError } from '../error';

export async function uploadUserImage(req: Request, res: Response, next: NextFunction) {
  console.log(req.file);

  if (req.file.size > 5000000) {
    throw new RequestError('File size too large.');
  }

  const userImage = new UserImage({
    data: req.file.buffer,
  });

  try {
    await userImage.save();
    return {
      status: 'success',
      message: 'Image uploaded',
    };
  } catch (error) {
    throw new DatabaseError('Cannot save image file.');
  }
}
