
import { Controller, Get, Post, Param, Body, Put, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { CreateVideoDto } from './dto/video.dto';
import * as path from 'path';


const storage = diskStorage({
  destination: 'C:\\Users\\emons\\Documents\\video-upload\\video-upload\\src\\uploads',
  filename: (req: any, file: { fieldname: string }, callback: (error: null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix);
  },
});

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto
  ) {
    console.log("------------", file)
    if (!file) {
      return { message: 'No file uploaded.' };
    }
    //createVideoDto.id = Date.now().toString(); 
    createVideoDto.filename = file.originalname;
    return this.videoService.create(createVideoDto);
  }
  @Get('/')
  async getAllVideos() {
    return this.videoService.findAll();
  }

  @Get('/:id')
  async getVideo(@Param('id') id: string, @Res() response: Response) {
    const video = await this.videoService.findOne(id);
    if (!video) {
      return response.status(404).json({ message: 'Video not found' });
    }
    return response.status(200).sendFile(video.filename, { root: 'uploads' });
  }



  @Put('update/:id')
  async updateVideo(@Param('id') id: string, @Body() updateVideoDto: CreateVideoDto) {
    return this.videoService.update(id, updateVideoDto);
  }

  @Delete('delete/:id')
  async deleteVideo(@Param('id') id: string) {
    return this.videoService.remove(id);
  }
}
