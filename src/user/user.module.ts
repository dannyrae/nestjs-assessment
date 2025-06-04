import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { preSave } from './schemas/middleware';
import { userMethods } from './schemas/methods';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', preSave);

          for (const method of userMethods) {
            schema.method(method.name, method);
          }

          schema.index(
            { createdAt: 1 }
          );

          return schema;
        },
      }
    ]),
  ],
  controllers: [UserController],
  exports: [UserService, MongooseModule],
  providers: [
    UserService,
  ],
})
export class UserModule {}
