import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  id:{ type: String, required: true },
  title: String,
  description: String,
  filename: String,
});

export interface Video {
  id:String,
  title: string;
  description: string;
  filename: string;
}