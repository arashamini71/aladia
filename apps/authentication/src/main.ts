import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.PORT || '3002', 10),
    },
  });
  await app.listen();
  Logger.log(
    'Authentication microservice listening on TCP port ' +
      (process.env.PORT || '3002'),
  );
}
bootstrap();
