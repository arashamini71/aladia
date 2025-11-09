import { Injectable } from '@nestjs/common';
import { NetworkingService } from './networking.service';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';

@Injectable()
export class AuthService {
  constructor(private networkingService: NetworkingService) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserRto> {
    return await this.networkingService.registerUser(registerUserDto);
  }

  async listUsers(): Promise<UserRto[]> {
    return await this.networkingService.listUsers();
  }
}
