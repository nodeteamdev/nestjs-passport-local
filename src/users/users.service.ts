import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Users } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<Users>) {}

  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({
      username,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const createdAdmin = new this.userModel(createUserDto);
    return createdAdmin.save();
  }
}
