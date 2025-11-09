import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import { Events } from '@common/constants/events';
import { RegisterUserDto } from '@common/dtos/register-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(Events.RegisterUser)
  async registerUser(registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @MessagePattern(Events.ListUsers)
  async listUsers() {
    return this.usersService.list();
  }
}
