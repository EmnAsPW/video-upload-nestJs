import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
    
   @IsNotEmpty()
   @IsString()
   id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  filename: string;
}