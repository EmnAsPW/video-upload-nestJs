import * as mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  
  title: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true },
  tags: [String],
});

export interface Video {
 //id: string;
  title: string;
  description: string;
  filename: string;
  tags: [String];
}
