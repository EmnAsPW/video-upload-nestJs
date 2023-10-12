import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.enableCors();

  await app.listen(3000);
  console.log("hello");
  
}

bootstrap();
