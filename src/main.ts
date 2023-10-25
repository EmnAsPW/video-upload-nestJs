import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/uploads/profile-pictures', express.static(path.join(__dirname, 'uploads/profile-pictures')));
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log("hello");
  
}

bootstrap();
