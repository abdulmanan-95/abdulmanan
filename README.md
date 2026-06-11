# Abdul Manan - Personal Portfolio Website

A production-ready personal brand website built with Next.js 15, TypeScript, Tailwind CSS, MongoDB Atlas, Mongoose, NextAuth, and Cloudinary.

## Features

### Public Website
- **Landing Page**: Hero section with featured projects, blog posts, and certifications
- **About**: Bio, education timeline, skills deep-dive, certificates, resume download
- **Projects**: Filterable project gallery with IEEE project highlighting
- **Blog**: MDX-powered blog with tag filtering and search
- **Gallery**: Image gallery with category filtering
- **Certificates**: Professional certifications display
- **Contact Form**: Email integration with Resend
- **Dark/Light Mode**: Theme toggle with next-themes

### Admin Dashboard
- **Authentication**: NextAuth with JWT sessions
- **Dashboard**: Overview with stats and recent activity
- **Projects Management**: CRUD operations for projects
- **Certificates Management**: CRUD operations for certificates
- **Blog Management**: Create, edit, and publish blog posts
- **Gallery Management**: Upload and manage images
- **Skills Management**: Update skills and proficiency
- **Settings**: Update personal information and SEO

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: NextAuth v5
- **Image Storage**: Cloudinary
- **Email**: Resend
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Cloudinary account
- Resend account (for email)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Abdul Manan Website"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abdul-manan-portfolio

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Resend (Email)
RESEND_API_KEY=your-resend-api-key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-ga-id
```

5. Hash your admin password (for security):
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 12));"
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
abdul-manan-portfolio/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── projects/      # Projects page
│   │   ├── blog/          # Blog pages
│   │   ├── gallery/       # Gallery page
│   │   ├── certificates/  # Certificates page
│   │   └── contact/       # Contact page
│   ├── admin/             # Admin dashboard
│   │   ├── login/         # Admin login
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── projects/      # Project management
│   │   ├── certificates/  # Certificate management
│   │   ├── blog/          # Blog management
│   │   ├── gallery/       # Gallery management
│   │   ├── skills/        # Skills management
│   │   └── settings/      # Settings
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth
│   │   ├── projects/      # Projects API
│   │   ├── certificates/  # Certificates API
│   │   ├── blog/          # Blog API
│   │   ├── gallery/       # Gallery API
│   │   ├── skills/        # Skills API
│   │   ├── contact/       # Contact form API
│   │   └── upload/        # Image upload API
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/
│   ├── public/            # Public components
│   ├── admin/             # Admin components
│   └── ui/                # UI components
├── lib/
│   ├── db.ts              # MongoDB connection
│   ├── auth.ts            # NextAuth configuration
│   ├── cloudinary.ts      # Cloudinary integration
│   └── utils.ts           # Utility functions
├── models/
│   ├── Project.ts         # Project model
│   ├── Certificate.ts     # Certificate model
│   ├── Blog.ts            # Blog model
│   ├── Gallery.ts         # Gallery model
│   ├── Skill.ts           # Skill model
│   └── SiteConfig.ts      # Site configuration model
├── types/
│   └── index.ts           # TypeScript types
├── middleware.ts          # Middleware for RBAC
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.example
```

## MongoDB Collections

### projects
- `_id`, `title`, `description`, `techStack[]`, `liveUrl`, `githubUrl`, `thumbnail`, `images[]`, `featured`, `ieee`, `startDate`, `endDate`, `status`

### certificates
- `_id`, `title`, `issuer`, `issueDate`, `expiryDate`, `credentialId`, `credentialUrl`, `image`, `category`

### blogs
- `_id`, `title`, `slug`, `content` (MDX), `excerpt`, `coverImage`, `tags[]`, `publishedAt`, `updatedAt`, `published`, `readTime`

### skills
- `_id`, `category`, `name`, `proficiency` (0-100), `icon`, `order`

### gallery
- `_id`, `title`, `imageUrl`, `cloudinaryId`, `category`, `tags[]`, `event`, `date`, `featured`

### site_config
- `_id`, `heroText`, `bio`, `email`, `phone`, `socialLinks{}`, `resumeUrl`, `seoTitle`, `seoDescription`, `ogImage`, `updatedAt`

## Deployment

### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify from your GitHub repository
3. Add environment variables in Netlify dashboard:
   - Go to Site Settings > Environment Variables
   - Add all variables from `.env.production.example`
   - Important: Set `NEXTAUTH_URL` to your Netlify URL (e.g., `https://your-site-name.netlify.app`)
4. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to add all the environment variables from `.env.production.example` to your deployment platform settings.

**Required Environment Variables:**
- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_URL` - Your production URL (e.g., https://your-site.netlify.app)
- `NEXTAUTH_SECRET` - Random string for JWT signing
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `RESEND_API_KEY` - Resend API key for emails
- `ADMIN_EMAIL` - Admin email for login
- `ADMIN_PASSWORD` - Hashed admin password (use bcrypt)

## Security Features

- NextAuth JWT with signed sessions
- Bcrypt password hashing (salt rounds ≥ 12)
- Zod validation on all API inputs
- Middleware RBAC for `/admin/*` routes
- Rate limiting on API routes
- File upload restrictions (MIME type check, 10MB max)
- CSP headers in next.config.js
- CSRF protection
- Honeypot on contact form

## SEO

- Dynamic sitemap.xml
- robots.txt
- Canonical URLs
- JSON-LD schema
- Open Graph tags
- Twitter Card meta tags
- Core Web Vitals optimization

## Color Palette

- Navy: `#0B1120`
- Deep Blue: `#1E3A5F`
- Cyan Accent: `#00D4FF`
- IEEE Purple: `#7C3AED`
- Success: `#108981`
- Highlight: `#F59E0B`
- Dark BG: `#0F172A`
- Light BG: `#F8FAFC`

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT

## Author

Abdul Manan
#   a b d u l m a n a n  
 