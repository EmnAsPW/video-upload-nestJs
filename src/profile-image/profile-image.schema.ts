import * as mongoose from 'mongoose';

export const ProfileImageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export interface ProfileImage {
  userId: string;
  imageUrl: string;
}
