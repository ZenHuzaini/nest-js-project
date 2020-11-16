import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport"
import {jwtConstants} from "./constants"
import { Injectable } from "@nestjs/common";

import {UserService} from "../user/user.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    }

    async validate(payload: any){
        const getData = await this.userService.getOneUser(payload.sub);
        return getData
    }
}