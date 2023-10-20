//import { PartialType } from '@nestjs/mapped-types';
//import { CreateVideoDto } from './create-video.dto';

import { PartialType } from "@nestjs/mapped-types";
import { CreateVideoDto } from "./video.dto";

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}