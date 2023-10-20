import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';
import { CreateVideoDto } from './dto/video.dto';
import { UpdateVideoDto } from './dto/update.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel('Video') private readonly videoModel: Model<Video>) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
  
    const createdVideo = new this.videoModel(createVideoDto);
    return createdVideo.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findById(id);
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {

    return this.videoModel.findByIdAndUpdate(id, updateVideoDto, { new: true });
  }

  async remove(id: string): Promise<Video> {
    return this.videoModel.findByIdAndRemove(id);
  }

  
}