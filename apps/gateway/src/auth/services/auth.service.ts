import { Injectable } from '@nestjs/common';
import { NetworkingService } from './networking.service';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';
import { LoginUserDto } from '@common/dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private networkingService: NetworkingService) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserRto> {
    return await this.networkingService.registerUser(registerUserDto);
  }

  async listUsers(): Promise<UserRto[]> {
    return await this.networkingService.listUsers();
  }

  async login(loginDto: LoginUserDto) {
    return await this.networkingService.login(loginDto);
  }
}
