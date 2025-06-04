import { Injectable } from '@nestjs/common';
import {
  ObjectId,
  Model,
  isObjectIdOrHexString,
  FilterQuery,
  Types,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { isEmail } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UserMethods } from './schemas/methods';

type Identifier = string | ObjectId | Types.ObjectId;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    public userModel: Model<User, object, UserMethods>,
  ) { }

  async getUser(identifier: Identifier) {
    const filter: FilterQuery<User> = {};

    if (isEmail(identifier)) {
      filter.email = identifier;
    } else if (isObjectIdOrHexString(identifier)) {
      filter._id = identifier;
    } else {
      filter.username = identifier;
    }

    const user = await this.userModel.findOne(filter).exec();
    return user;
  }

  async getUserOrThrow(identifier: Identifier) {
    const user = await this.getUser(identifier);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async createUser(signUpDto: SignUpDto) {
    const { email, password, username } = signUpDto;


    const user = await this.userModel.create({
      email,
      password,
      username,
    });

    return user;
  }
}
