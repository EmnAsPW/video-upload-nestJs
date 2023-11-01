import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileImage } from './profile-image.schema';
import { ProfileImageService } from './profile-image.service';
import { CreateProfileImageDto } from './dto/profile-image.dto';
import { UpdateProfileImageDto } from './dto/Iupdate.dto';

@Resolver('ProfileImage')
export class ProfileImageResolver {
  constructor(private readonly profileImageService: ProfileImageService) {}

  @Query('profileImages')
  async profileImages(): Promise<ProfileImage[]> {
    return this.profileImageService.findAll();
  }

  @Query('profileImage')
  async profileImage(@Args('id') id: string): Promise<ProfileImage> {
    return this.profileImageService.findOne(id);
  }

  @Mutation('uploadProfileImage')
  async uploadProfileImage(
    @Args('input') input: CreateProfileImageDto,
  ): Promise<ProfileImage> {
    return this.profileImageService.create(input);
  }

  @Mutation('updateProfileImage')
  async updateProfileImage(
    @Args('id') id: string,
    @Args('imageUrl') imageUrl: UpdateProfileImageDto,
  ): Promise<ProfileImage> {
    return this.profileImageService.update(id, imageUrl);
  }

  @Mutation('deleteProfileImage')
  async deleteProfileImage(@Args('id') id: string): Promise<ProfileImage> {
    return this.profileImageService.remove(id);
  }
}
