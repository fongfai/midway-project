import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/User.entity';
// import Profile from "../entities/Profile.entity";

import {
  CreateUserInput,
  // CreatDescription,
  UpdateUserInput,
} from '../dto/user.dto';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async getUser(options: any) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getAllUsers(offset: number, take: number): Promise<User[]> {
    console.log('getAllUser', this.userModel, offset, take);
    return await this.userModel.find({
      skip: offset,
      take,
      relations: ['posts', 'profile'],
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.userModel.findOne(id as any);
  }

  async createUser(user: CreateUserInput): Promise<User> {
    return await this.userModel.save(user);
  }

  // async createUserWithDescription(
  //   userWithDescription: CreateUserInput & CreatDescription
  // ): Promise<User> {
  //   const { name, description } = userWithDescription;
  //   const profile = new Profile();
  //   profile.description = description || "A Director";
  //   return await this.userModel.save(userWithDescription);
  // }

  // const mockUser1 = new User();

  // const mockProfile1 = new Profile();
  // mockProfile1.description = "A Coder";

  // const mockPost1 = new Post();
  // mockPost1.title = "The Power of MidwayJS";

  // mockUser1.name = "张三";
  // mockUser1.profile = mockProfile1;
  // mockUser1.posts = [mockPost1];

  // await mockUser1.save();

  async updateUser(user: UpdateUserInput): Promise<User> {
    await this.userModel.update(user.id, user);
    return await this.getUserById(user.id);
  }

  async deleteUser(id: number) {
    return await this.userModel.delete(id);
  }
}
