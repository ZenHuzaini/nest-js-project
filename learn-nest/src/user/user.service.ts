import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './constants/user.dto';
import { promises } from 'dns';

@Injectable()
export class UserService {
  private users: { name: string; age: number }[];

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    this.users = [
      { name: 'smith', age: 4 },
      { name: 'jhon', age: 7 },
    ];
  }

  getUsers(): object {
    return this.users;
  }

  getUser(name: string): object {
    let data: object;
    data = this.users.find(data => {
      return data.name === name;
    });

    if (data === undefined) {
      return { message: 'no data is found' };
    }
    return data;
  }

  addUser(data): object {
    this.users.push(data);
    return this.users;
  }

  deleteUser(name): object {
    this.users = this.users.filter(data => {
      return data.name !== name;
    });

    return this.users;
  }

  updateUser(thename, data): object {
    const getIndex = this.users.findIndex(({ name }) => {
      return name === thename;
    });
    console.log('get index ', getIndex);

    if (getIndex === -1) {
      return { message: 'No data found!' };
    }

    return this.users;
  }

  //WIth db
  async validateUser(email: any, password: any): Promise<any> {
    let findUser: any;
    findUser = await this.userModel.findOne({ email, password });
    if (!findUser) {
      return { message: 'user does not exist' };
    }

    return findUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getOneUser(_id: string): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async deleteOneUser(_id: string): Promise<any> {
    const deleteUser = await this.userModel.findByIdAndDelete(_id).exec();
    if (!deleteUser) {
      return {
        message: `No data for id ${_id} `,
      };
    }

    return deleteUser;
  }

  async updateOneUser(_id: string, data: any): Promise<any> {
    const updateUser = await this.userModel.findByIdAndUpdate(_id, data).exec();
    console.log('get updated user ', updateUser);
    // if (!updateUser) {
    //   return {
    //     message: `No data for id ${_id} `,
    //   };
    // }

    return updateUser;
  }

  async insertData(userDto: UserDto): Promise<User> {
    const insertUser = new this.userModel(userDto);
    return insertUser.save();
  }
}
