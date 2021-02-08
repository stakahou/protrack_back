import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const PORT = config.get('server.PORT');

  const port = process.env.PORT || PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(port);

  Logger.debug(`[PORT]: ${port}`);
  Logger.debug(`[Environment] ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
