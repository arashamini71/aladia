import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { NetworkingService } from './services/networking.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NETWORKING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
          port: parseInt(process.env.AUTH_SERVICE_PORT || '3002'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, NetworkingService],
  exports: [NetworkingService],
})
export class AuthModule {}
