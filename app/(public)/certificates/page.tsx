import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, ExternalLink } from 'lucide-react';
import connectDB from '@/lib/db';
import Certificate from '@/models/Certificate';

async function getCertificates() {
  await connectDB();
  const certificates = await Certificate.find().sort({ issueDate: -1 }).lean();
  return JSON.parse(JSON.stringify(certificates));
}

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Professional certifications and credentials
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert: any) => (
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
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Issued:</span>
                  <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                {cert.expiryDate && (
                  <div className="flex justify-between">
                    <span>Expires:</span>
                    <span>{new Date(cert.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
                {cert.credentialId && (
                  <div className="flex justify-between">
                    <span>Credential ID:</span>
                    <span className="font-mono text-xs">{cert.credentialId}</span>
                  </div>
                )}
                {cert.category && (
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="px-2 py-0.5 bg-cyan/10 text-cyan text-xs rounded-full">
                      {cert.category}
                    </span>
                  </div>
                )}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-cyan hover:underline text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Credential
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No certificates found.</p>
        </div>
      )}
    </div>
  );
}
