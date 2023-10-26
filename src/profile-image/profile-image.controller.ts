import { Controller, Get, Post, Param, Body, Put, Delete, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileImageService } from './profile-image.service';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProfileImageDto } from './dto/profile-image.dto';
import { UpdateProfileImageDto } from './dto/Iupdate.dto';

const storage = diskStorage({
  destination: 'C:\\Users\\emons\\Documents\\video-upload\\src\\uploads',
  filename: (req: any, file: { originalname: string }, callback: (error: null, filename: string) => void) => {
    callback(null, file.originalname);
  },
});

@Controller('profile-image')
export class ProfileImageController {
  constructor(private readonly profileImageService: ProfileImageService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProfileImageDto: CreateProfileImageDto
  ) {
    if (!file) {
      return { message: 'No file uploaded.' };
    }

    createProfileImageDto.imageUrl = file.originalname;
    return this.profileImageService.create(createProfileImageDto);
  }

  @Get('/')
  async getAllProfileImages() {
    return this.profileImageService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getProfileImage(@Param('id') id: string, @Res() response: Response) {
    try {
      const profileImage = await this.profileImageService.findOne(id);
      if (!profileImage) {
        return response.status(404).json({ message: 'Profile image not found' });
      }
      return response.status(200).json({ profileImage });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put('update/:id')
  async updateProfileImage(@Param('id') id: string, @Body() updateProfileImageDto: UpdateProfileImageDto, @Res() response: Response) {
    try {
      const updatedProfileImage = await this.profileImageService.update(id, updateProfileImageDto);

      if (!updatedProfileImage) {
        return response.status(404).json({ message: 'Profile image not found' });
      }

      return response.status(200).json(updatedProfileImage);
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete('delete/:id')
  async deleteProfileImage(@Param('id') id: string) {
    return this.profileImageService.remove(id);
  }
}
