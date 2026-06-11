import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteConfig extends Document {
  heroText: string;
  bio: string;
  email: string;
  phone?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  resumeUrl?: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  updatedAt: Date;
}

const SiteConfigSchema: Schema = new Schema(
  {
    heroText: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    seoTitle: {
      type: String,
      required: true,
    },
    seoDescription: {
      type: String,
      required: true,
    },
    ogImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);
