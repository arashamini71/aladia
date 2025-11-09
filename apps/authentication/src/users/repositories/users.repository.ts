import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    const created = new this.userModel(user);
    return created.save();
  }

  async findByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
}
