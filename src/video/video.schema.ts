import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  tags: [String],
});

export interface Video {
  title: string;
  description: string;
  filename: string;
  tags: [String];
}