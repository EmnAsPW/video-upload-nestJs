import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileImage } from './profile-image.schema';
import { CreateProfileImageDto } from './dto/profile-image.dto';
import { UpdateProfileImageDto } from './dto/Iupdate.dto';


@Injectable()
export class ProfileImageService {
  constructor(@InjectModel('ProfileImage') private readonly profileImageModel: Model<ProfileImage>) {}

  async create(createProfileImageDto: CreateProfileImageDto): Promise<ProfileImage> {
    const createdProfileImage = new this.profileImageModel(createProfileImageDto);
    
    return createdProfileImage.save();

  }

  async findAll(): Promise<ProfileImage[]> {
    return this.profileImageModel.find().exec();
  }

  async findOne(id: string): Promise<ProfileImage> {
    return this.profileImageModel.findById(id);
  }

  async update(id: string, updateProfileImageDto: UpdateProfileImageDto): Promise<ProfileImage> {
    return this.profileImageModel.findByIdAndUpdate(id, updateProfileImageDto, { new: true });
  }

  async remove(id: string): Promise<ProfileImage> {
    return this.profileImageModel.findByIdAndRemove(id);
  }
}
