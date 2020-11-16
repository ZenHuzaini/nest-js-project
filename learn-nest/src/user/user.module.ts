import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import {AuthModule } from "../auth/auth.module"

@Module({
  imports: [
    //inject User model
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() =>AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  //in order to make it injectable, it must be exported
  exports: [UserService],
})
export class UserModule {}
