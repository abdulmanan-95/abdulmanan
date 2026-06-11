import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, FolderKanban, Award, BookOpen, Image as ImageIcon, Settings, LogOut, Home } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Blog', href: '/admin/blog', icon: BookOpen },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Skills', href: '/admin/skills', icon: Settings },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-navy border-r border-gray-200 dark:border-gray-800 min-h-screen p-4">
          <div className="mb-8">
            <Link href="/" className="text-xl font-bold text-cyan">
              Abdul Manan
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin Panel</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
            >
              <Home className="h-5 w-5" />
              View Site
            </Link>
            <form action="/api/auth/signout" method="POST">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
