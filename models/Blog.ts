 import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);