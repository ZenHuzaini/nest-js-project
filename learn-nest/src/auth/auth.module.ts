import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
//add jwt module
import {JwtModule} from "@nestjs/jwt"
import {jwtConstants} from "./constants"

//jwt strategy
import {JwtStrategy} from "./jwt.startegy"

@Module({
  //forward because usermodule and auth modeule are cilcular dependencies
  imports: [forwardRef(()=>UserModule), PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1d'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}
