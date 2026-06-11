import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, GraduationCap, Code, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';
import Certificate from '@/models/Certificate';
import SiteConfig from '@/models/SiteConfig';

async function getAboutData() {
  await connectDB();
  
  const [skills, certificates, siteConfig] = await Promise.all([
    Skill.find().sort({ order: 1 }).lean(),
    Certificate.find().sort({ issueDate: -1 }).lean(),
    SiteConfig.findOne().lean(),
  ]);

  return {
    skills: JSON.parse(JSON.stringify(skills)),
    certificates: JSON.parse(JSON.stringify(certificates)),
    siteConfig: siteConfig ? JSON.parse(JSON.stringify(siteConfig)) : null,
  };
}

export default async function AboutPage() {
  const { skills, certificates, siteConfig } = await getAboutData();

  const skillsByCategory = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center py-12 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {siteConfig?.bio || 'Electrical Engineer & Developer passionate about building innovative solutions.'}
        </p>
      </section>

      {/* Education Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-cyan" />
          Education
        </h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bachelor of Electrical Engineering</CardTitle>
              <CardDescription>University Name • 2020 - 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Specialized in Power Systems and Renewable Energy. Graduated with honors.
                Active member of IEEE Student Branch.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Code className="h-8 w-8 text-cyan" />
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]: [string, any]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-xl">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySkills.map((skill: any) => (
                    <div key={skill._id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-cyan h-2 rounded-full transition-all"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Award className="h-8 w-8 text-cyan" />
          Certifications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert: any) => (
            <Card key={cert._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <CardDescription>{cert.issuer}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                  {cert.expiryDate && (
                    <p>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan hover:underline"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resume Download */}
      {siteConfig?.resumeUrl && (
        <section className="text-center">
          <Button size="lg" asChild>
            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </section>
      )}
    </div>
  );
}
