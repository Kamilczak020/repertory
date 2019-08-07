import { Request, Response, NextFunction } from 'express';
import User from '../model/user';
import UserImage from '../model/userImage';
import { DatabaseError, RequestError } from '../error';

export async function uploadUserImage(req: Request, res: Response, next: NextFunction) {
  if (req.file.size > 5000000) {
    throw new RequestError('File size too large.');
  }

  try {
    const user = await User.findOne({ where: { id: res.locals.user }, include: [{ model: UserImage }]});

    if (user.userImage) {
      user.userImage.update({ data: req.file.buffer });
    } else {
      const userImage = new UserImage({
        data: req.file.buffer,
        userId: user.id,
      });
      await userImage.save();
    }

    return {
      status: 'success',
      message: 'Image uploaded',
    };
  } catch (error) {
    throw new DatabaseError('Cannot save image file.');
  }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ where: { id: res.locals.user }, include: [{ model: UserImage }]});
    return {
      status: 'success',
      message: 'Fetched user profile',
      user: {
        avatar: user.userImage ? user.userImage.data : undefined,
        birthday: user.birthday,
        email: user.email,
        joinDate: user.joinDate,
        gender: user.gender,
        location: user.location,
        name: user.name,
        username: user.username,
      },
    };
  } catch (error) {
    throw new DatabaseError('Cannot fetch user profile.');
  }
}

export async function setBirthday(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ where: { id: res.locals.user }});
    await user.update({ birthday: req.body.birthday });
  } catch (error) {
    throw new DatabaseError('Cannot update birthday.');
  }
}

export async function setGender(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ where: { id: res.locals.user }});
    await user.update({ gender: req.body.gender });
  } catch (error) {
    throw new DatabaseError('Cannot update gender.');
  }
}

export async function setLocation(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ where: { id: res.locals.user }});
    await user.update({ location: req.body.location });
  } catch (error) {
    throw new DatabaseError('Cannot update location.');
  }
}

export async function setName(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ where: { id: res.locals.user }});
    await user.update({ name: req.body.name });
  } catch (error) {
    throw new DatabaseError('Cannot update name.');
  }
}
