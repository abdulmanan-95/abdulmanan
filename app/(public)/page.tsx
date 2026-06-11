import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Github, ExternalLink, Award, BookOpen, Image as ImageIcon } from 'lucide-react';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import Certificate from '@/models/Certificate';

async function getFeaturedData() {
  await connectDB();
  
  const [featuredProjects, latestBlogs, certificates] = await Promise.all([
    Project.find({ featured: true }).limit(3).lean(),
    Blog.find({ published: true }).sort({ publishedAt: -1 }).limit(3).lean(),
    Certificate.find().limit(3).lean(),
  ]);

  return {
    featuredProjects: JSON.parse(JSON.stringify(featuredProjects)),
    latestBlogs: JSON.parse(JSON.stringify(latestBlogs)),
    certificates: JSON.parse(JSON.stringify(certificates)),
  };
}

export default async function HomePage() {
  const { featuredProjects, latestBlogs, certificates } = await getFeaturedData();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan to-ieee-purple bg-clip-text text-transparent">
          Abdul Manan
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Electrical Engineer & Developer
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500 mb-12 max-w-3xl mx-auto">
          Passionate about building innovative solutions at the intersection of engineering and technology.
          IEEE member focused on power systems and smart grid technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects">
            <Button size="lg" className="text-lg">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-lg">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-cyan/10 text-cyan text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/projects">
            <Button variant="outline">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <Card key={blog._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{blog.readTime} min read</span>
                  <Link href={`/blog/${blog.slug}`}>
                    <Button size="sm" variant="ghost">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button variant="outline">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Certifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-cyan flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/certificates">
            <Button variant="outline">
              View All Certificates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Interested in collaborating on a project or have a question? Feel free to reach out!
          </p>
          <Link href="/contact">
            <Button size="lg">
              Contact Me <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
