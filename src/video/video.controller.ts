
import { Controller, Get, Post, Param, Body, Put, Delete, UseInterceptors, UploadedFile, Res, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { CreateVideoDto } from './dto/video.dto';
import * as path from 'path';
import { UpdateVideoDto } from './dto/update.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';




const storage = diskStorage({
  destination: 'C:\\Users\\emons\\Documents\\video-upload\\uploads', 
  filename: (req: any, file: { originalname: string }, callback: (error: null, filename: string) => void) => {
    callback(null, file.originalname); 
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
  //@UseGuards(JwtGuard)
  @Get('/:id')
  async getVideo(@Param('id') id: string, @Res() response: Response) {
    //console.log("-----------", id, response)
    try {
      const video = await this.videoService.findOne(id);
      if (!video) {
        return response.status(404).json({ message: 'Video not found' });
      }
      return response.status(200).json({video})
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put('update/:id')
  async updateVideo(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto, @Res() response: Response) {
    try {
      const updatedVideo = await this.videoService.update(id, updateVideoDto);
      
      if (!updatedVideo) {
        return response.status(404).json({ message: 'Video not found' });
      }
  
      return response.status(200).json(updatedVideo);
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
  

  @Delete('delete/:id')
  async deleteVideo(@Param('id') id: string) {
    return this.videoService.remove(id);
  }


  @Get('search/:query')
  async searchVideos(@Query('query') query: string) {
    if (!query) {
      return { message: 'Search query is required.' };
    }
    const searchResults = await this.videoService.searchVideos(query);
    return searchResults;
}

}
