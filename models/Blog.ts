import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  publishedAt?: Date;
  published: boolean;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    publishedAt: {
      type: Date,
    },
    published: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.index({ slug: 1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
