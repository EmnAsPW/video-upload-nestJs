import { Module } from '@nestjs/common';
import { ProfileImageController } from './profile-image.controller';
import { ProfileImageService } from './profile-image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileImageSchema } from './profile-image.schema';
import { ProfileImageResolver } from './profile-image.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProfileImage', schema: ProfileImageSchema },
    ]),
  ],
  controllers: [ProfileImageController],
  providers: [ProfileImageService, ProfileImageResolver],
})
export class ProfileImageModule {}
