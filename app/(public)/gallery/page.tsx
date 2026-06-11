import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import Image from 'next/image';
import connectDB from '@/lib/db';
import Gallery from '@/models/Gallery';

async function getGallery() {
  await connectDB();
  const gallery = await Gallery.find().sort({ featured: -1, date: -1 }).lean();
  return JSON.parse(JSON.stringify(gallery));
}

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Photos from events, conferences, and projects
        </p>
      </section>

      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-8 justify-center flex-wrap">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          All
        </Button>
        <Button variant="ghost" size="sm">IEEE Events</Button>
        <Button variant="ghost" size="sm">Projects</Button>
        <Button variant="ghost" size="sm">Conferences</Button>
        <Button variant="ghost" size="sm">Workshops</Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gallery.map((item: any) => (
          <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.featured && (
                <div className="absolute top-2 right-2 bg-cyan text-navy px-2 py-1 text-xs rounded-full font-medium">
                  Featured
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{item.title}</h3>
              {item.event && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.event}</p>
              )}
              {item.date && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 2).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-cyan/10 text-cyan text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No gallery items found.</p>
        </div>
      )}
    </div>
  );
}
