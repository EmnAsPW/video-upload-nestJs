import { Module } from '@nestjs/common';
import { ProfileImageController } from './profile-image.controller';
import { ProfileImageService } from './profile-image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileImageSchema } from './profile-image.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ProfileImage', schema: ProfileImageSchema }])],
  controllers: [ProfileImageController],
  providers: [ProfileImageService],
})
export class ProfileImageModule {}
