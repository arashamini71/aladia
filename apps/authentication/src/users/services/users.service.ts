import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserRto> {
    const exists = await this.usersRepository.findByEmail(
      registerUserDto.email,
    );
    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersRepository.create({
      email: registerUserDto.email,
      name: registerUserDto.name,
      password: registerUserDto.password,
    });

    const { _id, email, name } = user;
    return { _id: _id.toString(), email, name };
  }

  async list(): Promise<UserRto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((u): UserRto => {
      return {
        _id: u._id,
        email: u.email,
        name: u.name,
      };
    });
  }
}
