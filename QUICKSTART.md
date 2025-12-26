# Quick Start Guide

## Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vhvplatform/react-cms.git
cd react-cms

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Access the Application

Open your browser to: **http://localhost:5173**

You'll be automatically logged in as an Admin user (demo mode).

## Explore the Features

### 1. Dashboard (/)
- View key metrics and statistics
- See top articles
- Check recent activity

### 2. Articles (/articles)
- Browse all articles
- Filter by type and status
- View article cards

### 3. Scheduled (/scheduled)
- See scheduled publications
- View expiration dates
- Manage schedule

### 4. Analytics (/analytics)
- Queue processing metrics
- Cache performance
- System health

### 5. Workflow (/workflow)
- Editorial workflow diagram
- Configuration options
- Transition rules

### 6. Permissions (/permissions)
- View user roles
- Check permission matrix
- Access control types

### 7. Tenants (/tenants)
- Tenant management
- Multi-tenancy features
- Tenant switching

### 8. Settings (/settings)
- Configure tenant
- Toggle features
- Manage article types

## Development Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Sample Data

The application includes mock data:
- 8 sample articles (various types)
- Realistic analytics metrics
- Queue and cache statistics
- Activity logs

## Default User

**Email**: admin@vhvcms.com  
**Role**: Admin  
**Permissions**: Full access

## Article Types Available

1. News
2. Video
3. Photo Gallery
4. Legal Document
5. Staff Profile
6. Job Posting
7. Procedure Document
8. Downloadable Files
9. Podcast
10. Event Information
11. Infographic
12. Travel Destination
13. Partner/Sponsor
14. PDF Document

## Key Features to Try

### Filtering Articles
1. Go to `/articles`
2. Use the dropdowns to filter by type or status
3. See results update immediately

### Viewing Analytics
1. Go to `/analytics`
2. Check queue metrics (pending, processing, completed)
3. Review cache hit/miss rates

### Exploring Workflow
1. Go to `/workflow`
2. See the visual workflow diagram
3. Understand the content lifecycle

### Managing Permissions
1. Go to `/permissions`
2. Click on any role card to expand
3. View detailed permissions

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (8 pages)
├── contexts/       # React contexts (auth)
├── services/       # API service layer (mock)
├── types/          # TypeScript definitions
└── App.tsx         # Main app with routing
```

## Customization

### Add New Article Type
1. Add enum to `src/types/article.ts`
2. Create interface extending `BaseArticle`
3. Add to union type
4. Update mock data generator

### Connect to Backend
1. Update `src/services/*.ts` files
2. Replace mock data with API calls
3. Configure `VITE_API_BASE_URL` in `.env`

### Modify Theme
1. Edit color variables in component CSS files
2. Update `src/index.css` for global styles

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically try the next available port.

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check TypeScript configuration
npm run build
```

## Next Steps

1. ✅ Explore all 8 pages
2. ✅ Try filtering and searching
3. ✅ Review the documentation
4. 📖 Read ARCHITECTURE.md for technical details
5. 🔧 Connect to your backend API
6. 🚀 Deploy to production

## Need Help?

- 📖 See [README.md](README.md) for detailed documentation
- 🏗️ See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- 📊 See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for what's included
- 🐛 Open an issue on GitHub

## Production Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Environment Variables
Create `.env` file:
```env
VITE_API_BASE_URL=https://api.yourcompany.com
VITE_TENANT_ID=your-tenant
```

## Happy Coding! 🎉

The CMS is ready to use. Start exploring and customizing to fit your needs!
