import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileImageDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: any;
}
