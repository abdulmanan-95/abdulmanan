import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Filter } from 'lucide-react';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

async function getProjects() {
  await connectDB();
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of my work in electrical engineering and software development
        </p>
      </section>

      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-8 justify-center">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          All Projects
        </Button>
        <Button variant="ghost" size="sm">IEEE Projects</Button>
        <Button variant="ghost" size="sm">Web Development</Button>
        <Button variant="ghost" size="sm">Hardware</Button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <Card key={project._id} className="hover:shadow-lg transition-shadow">
            {project.thumbnail && (
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                {project.ieee && (
                  <span className="px-2 py-1 bg-ieee-purple/10 text-ieee-purple text-xs rounded-full">
                    IEEE
                  </span>
                )}
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech: string) => (
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
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="ghost">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live
                    </Button>
                  </a>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="capitalize">{project.status}</span>
                {project.startDate && (
                  <span className="ml-2">
                    {new Date(project.startDate).getFullYear()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
        </div>
      )}
    </div>
  );
}
