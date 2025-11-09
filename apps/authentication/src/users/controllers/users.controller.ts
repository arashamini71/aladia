import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import { Events } from '@common/constants/events';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(Events.RegisterUser)
  async registerUser(registerUserDto: RegisterUserDto): Promise<UserRto> {
    return this.usersService.register(registerUserDto);
  }

  @MessagePattern(Events.ListUsers)
  async listUsers(): Promise<UserRto[]> {
    return await this.usersService.list();
  }
}
