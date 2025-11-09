import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';
import { Events } from '@common/constants/events';
import { LoginUserDto } from '@common/dtos/login-user.dto';

@Injectable()
export class NetworkingService {
  constructor(@Inject('NETWORKING_SERVICE') private client: ClientProxy) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserRto> {
    return await firstValueFrom(
      this.client.send<UserRto>(Events.RegisterUser, registerUserDto),
    );
  }

  async listUsers(): Promise<UserRto[]> {
    const response = await firstValueFrom(
      this.client.send<UserRto[]>(Events.ListUsers, {}),
    );
    return response;
  }

  async login(loginDto: LoginUserDto) {
    return await firstValueFrom(this.client.send(Events.Login, loginDto));
  }
}
