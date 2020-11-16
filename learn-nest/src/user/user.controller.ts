import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './constants/user.dto';
import { Request, Response } from 'express';
import { sendResponse } from '../responses/constants';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { get } from 'http';
import { JwtAuthGurad } from 'src/auth/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  // @Get()
  // getUsers(): object {
  //   return this.userService.getUsers();
  // }

  // @Get(':name')
  // getUser(@Param() params): object {
  //   console.log('get params ', params);
  //   return this.userService.getUser(params.name);
  // }

  // @Post()
  // addUser(@Body() userDto: UserDto) {
  //   console.log('what is in userDTO ', userDto);
  //   return this.userService.addUser(userDto);
  // }

  // @Delete(':name')
  // deleteUser(@Param() param): object {
  //   return this.userService.deleteUser(param.name);
  // }

  // @Put(':name')
  // updateUser(@Param() param, @Body() userDto: UserDto): object {
  //   return this.userService.updateUser(param.name, userDto);
  // }

  // //nOT really nest
  // //with response of express
  // @Get('withResponse')
  // getUserWithResponse(@Req() req: Request, @Res() res: Response): Response {
  //   return res.status(200).json('hi this is response');
  // }

  // //with response of express
  // @Get('withResponseAgain')
  // getUserWithResponseAgain(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Response {
  //   return sendResponse(res, {
  //     status: 'success',
  //     data: 'here is the information',
  //   });
  // }

  //with dataabse
  //with dataabse
  @Get()
  async users() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async user(@Param() param) {
    return await this.userService.getOneUser(param.id);
  }

  @Delete(':id')
  async deleteUser(@Param() param) {
    return await this.userService.deleteOneUser(param.id);
  }

  @Put(':id')
  async updateUser(@Param() param, @Body() userDto: UserDto) {
    return await this.userService.updateOneUser(param.id, userDto);
  }

  @Post()
  async insertUser(@Body() userDto: UserDto) {
    return await this.userService.insertData(userDto);
  }

  //make my own login
  @Post('login')
  async login(@Body() userDto: UserDto) {
    return await this.userService.validateUser(userDto.email, userDto.password);
  }

  //login from controller
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async doLogin(@Body() userDto: UserDto) {
    const {_id, email}: any = await this.userService.validateUser(userDto.email, userDto.password);
    console.log("get username ", email, " get userId ", _id)
    return await this.authService.login({_id, email})
  }

  @UseGuards(JwtAuthGurad)
  @Get("see/profile")
  async profile(@Req() req: Request){
    return req.user
  }
}
