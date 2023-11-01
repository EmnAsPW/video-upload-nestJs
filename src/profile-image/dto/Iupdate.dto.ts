import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileImageDto } from './profile-image.dto';

export class UpdateProfileImageDto extends PartialType(CreateProfileImageDto) {}
