import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
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
  async register(@Body() dto: RegisterUserDto): Promise<UserRto> {
    return await this.authService.register(dto);
  }

  @Get('users')
  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 200, type: [UserRto] })
  async users(): Promise<UserRto[]> {
    return await this.authService.listUsers();
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.login(dto);
    res.cookie('jwt', token, { httpOnly: true });
    return res.send({ message: 'Logged in' });
  }

  @Post('logout')
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @ApiBearerAuth('JWT')
  async logout(@Req() req: any, @Res() res: Response) {
    const userId = req.user?.id;
    if (userId) {
      res.clearCookie('jwt');
    }
    return res.send({ message: 'Logged out' });
  }
}
