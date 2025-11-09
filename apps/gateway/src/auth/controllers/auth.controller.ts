import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from '@common/dtos/register-user.dto';
import { UserRto } from '@common/rtos/user.rto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '@common/dtos/login-user.dto';
import { Response } from 'express';

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
    return await this.authService.listUsers();
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.login(dto);
    res.cookie('jwt', token, { httpOnly: true });
    return res.send({ message: 'Logged in' });
  }

  @Post('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    const userId = req.user?.id;
    if (userId) {
      res.clearCookie('jwt');
    }
    return res.send({ message: 'Logged out' });
  }
}
