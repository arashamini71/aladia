import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, type: UserRto })
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @Get('users')
  @ApiResponse({ status: 200, type: [UserRto] })
  async users() {
    return this.authService.listUsers();
  }
}
