import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';

async function getBlogBySlug(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug, published: true }).lean();
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: 'Blog Post Not Found' };
  
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/blog">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      <article className="max-w-3xl mx-auto">
        {blog.coverImage && (
          <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-8">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(blog.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {blog.readTime} min read
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-cyan/10 text-cyan text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>
    </div>
  );
}
