import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
//import { VideoService } from '../video/video.service'; // Adjust the import path
//import { Video } from '../video/video.schema'; // Adjust the import path
import { Video } from '../video/video.schema';
import { VideoService } from '../video/video.service';
import { CreateVideoDto } from 'src/video/dto/video.dto';
import { UpdateVideoDto } from 'src/video/dto/update.dto';

@Resolver('Video')
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query('getVideo')
  async getVideo(@Args('id') id: string): Promise<Video> {
    return this.videoService.findOne(id);
  }

  @Query('getAllVideos')
  async getAllVideos(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Mutation('createVideo')
  async createVideo(@Args('input') input: CreateVideoDto): Promise<Video> {
    return this.videoService.create(input);
  }

  @Mutation('updateVideo')
  async updateVideo(
    @Args('id') id: string,
    @Args('input') input: UpdateVideoDto,
  ): Promise<Video> {
    return this.videoService.update(id, input);
  }

  @Mutation('deleteVideo')
  async deleteVideo(@Args('id') id: string): Promise<Video> {
    return this.videoService.remove(id);
  }
}
