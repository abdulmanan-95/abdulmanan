import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, Award, BookOpen, Image as ImageIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Blog from '@/models/Blog';
import Gallery from '@/models/Gallery';

async function getDashboardStats() {
  await connectDB();
  
  const [projectsCount, certificatesCount, blogsCount, galleryCount] = await Promise.all([
    Project.countDocuments(),
    Certificate.countDocuments(),
    Blog.countDocuments({ published: true }),
    Gallery.countDocuments(),
  ]);

  const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(3).lean();
  const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3).lean();

  return {
    projectsCount,
    certificatesCount,
    blogsCount,
    galleryCount,
    recentProjects: JSON.parse(JSON.stringify(recentProjects)),
    recentBlogs: JSON.parse(JSON.stringify(recentBlogs)),
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectsCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total certificates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogsCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Published posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gallery</CardTitle>
            <ImageIcon className="h-4 w-4 text-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.galleryCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total images</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/projects/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </Link>
          <Link href="/admin/gallery/new">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest added projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentProjects.map((project: any) => (
                <div key={project._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/admin/projects/${project._id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              ))}
              {stats.recentProjects.length === 0 && (
                <p className="text-sm text-gray-500">No projects yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest published posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentBlogs.map((blog: any) => (
                <div key={blog._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/admin/blog/${blog._id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              ))}
              {stats.recentBlogs.length === 0 && (
                <p className="text-sm text-gray-500">No blog posts yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
