import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateVideoDto {
    
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsArray()
  tags: string[];
}