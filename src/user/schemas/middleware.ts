import { PreSaveMiddlewareFunction } from 'mongoose';
import { UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

export const preSave: PreSaveMiddlewareFunction<UserDocument> = async function (
  next,
) {
  try {
    const password = this.get('password');
    if (password && this.isModified('password')) {
      const hashed = await bcrypt.hash(password, 10);
      this.set('password', hashed);
    }

    next();
  } catch (err) {
    next(err);
  }
};
