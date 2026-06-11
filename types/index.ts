export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
  images?: string[];
  featured: boolean;
  ieee: boolean;
  startDate?: Date;
  endDate?: Date;
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  _id: string;
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

export interface Skill {
  _id: string;
  category: string;
  name: string;
  proficiency: number;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Gallery {
  _id: string;
  title: string;
  imageUrl: string;
  cloudinaryId: string;
  category: string;
  tags: string[];
  event?: string;
  date?: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteConfig {
  _id: string;
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
