# VHV React CMS

A comprehensive Content Management System built with React, TypeScript, and Vite. This CMS provides a robust interface for managing multi-type articles with advanced features including multi-tenancy, permissions, scheduling, analytics, and editorial workflows.

## Features

### Core Capabilities

- **14+ Article Types Support**
  - News, Video, Photo Gallery, Legal Documents
  - Staff Profiles, Job Postings, Procedure Documents
  - Downloadable Files, Podcasts, Events
  - Infographics, Travel Destinations, Partner/Sponsor Info
  - PDF Documents

- **Multi-Tenancy**
  - Isolated data per organization
  - Tenant-specific configurations
  - Custom branding and themes
  - Independent analytics

- **Advanced Permissions**
  - Role-based access control (RBAC)
  - 6 user roles: Super Admin, Admin, Editor, Author, Contributor, Viewer
  - Granular permissions for articles, users, tenants, analytics, and settings
  - 4 access control types: Public, Login Required, Role-Based, Premium

- **Scheduling & Automation**
  - Auto-publishing at scheduled times
  - Content expiration management
  - Queue-based processing
  - Notification system

- **Editorial Workflow**
  - Draft → Review → Published → Archived lifecycle
  - Review comments and approvals
  - Workflow transition tracking
  - Configurable approval processes

- **Analytics & Monitoring**
  - Real-time dashboard with key metrics
  - Article performance tracking
  - Queue processing metrics
  - Redis cache performance monitoring
  - View counts with async processing

- **Search & Discovery**
  - Full-text search interface
  - Advanced filtering by type, status, tags, categories
  - MongoDB text-based indexing support

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Recharts** - Analytics charts
- **Date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vhvplatform/react-cms.git
cd react-cms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Shared components (Layout, Navigation)
│   ├── articles/       # Article-specific components
│   ├── dashboard/      # Dashboard widgets
│   ├── permissions/    # Permission management UI
│   ├── scheduling/     # Scheduling components
│   ├── workflow/       # Workflow visualizations
│   ├── search/         # Search interface
│   └── analytics/      # Analytics charts and displays
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── ArticleList.tsx
│   ├── Analytics.tsx
│   ├── Permissions.tsx
│   ├── Workflow.tsx
│   ├── Scheduled.tsx
│   ├── Tenants.tsx
│   └── Settings.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── services/           # API service layer
│   ├── articleService.ts
│   └── analyticsService.ts
├── types/              # TypeScript type definitions
│   ├── article.ts      # Article types
│   ├── auth.ts         # Auth and user types
│   ├── analytics.ts    # Analytics types
│   └── workflow.ts     # Workflow types
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## Architecture Overview

### Type System

The application uses a comprehensive TypeScript type system with:
- Base article interface with common fields
- Type-specific article interfaces (14+ types)
- Discriminated unions for type safety
- Enums for statuses and permissions

### Service Layer

Mock service layer (`src/services/`) provides:
- CRUD operations for articles
- Analytics and metrics
- User and permission management
- Simulated API delays for realistic UX

**Note**: Services use mock data for demonstration. In production, replace with actual API calls to the backend (e.g., go-cms-service).

### Authentication

- Mock authentication context
- Auto-login for demo purposes
- Permission checking utilities
- Tenant context management

### State Management

- React Context for global state (auth, tenant)
- Local component state for UI state
- TanStack Query for server state (prepared for production)

## Configuration

### Tenant Settings

Configure tenant features in Settings page:
- Enabled article types
- Feature toggles (scheduling, analytics, premium content, multi-language)
- Cache configuration (TTL settings)
- Search settings

### Workflow Configuration

Customize editorial workflow:
- Review requirements
- Auto-publish settings
- Notification preferences
- Multiple reviewer options

## Integration with Backend

This frontend is designed to work with the `go-cms-service` backend. Key integration points:

### API Endpoints (Expected)

```
GET    /api/articles              - List articles
GET    /api/articles/:id          - Get article
POST   /api/articles              - Create article
PUT    /api/articles/:id          - Update article
DELETE /api/articles/:id          - Delete article
GET    /api/articles/types        - Get available types
GET    /api/analytics/dashboard   - Dashboard metrics
GET    /api/analytics/article/:id - Article analytics
GET    /api/queue/metrics         - Queue metrics
GET    /api/cache/metrics         - Cache metrics
```

### Backend Dependencies

When connecting to a real backend:
1. Update service files in `src/services/` to use actual API endpoints
2. Configure base URL and authentication tokens
3. Implement proper error handling
4. Add request/response interceptors as needed

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_TENANT_ID=default
```

## Development Guidelines

### Adding New Article Types

1. Add type enum to `src/types/article.ts`
2. Create type-specific interface extending `BaseArticle`
3. Add to discriminated union type
4. Update mock data generator in `articleService.ts`
5. Create type-specific form component if needed

### Adding New Features

1. Define types in `src/types/`
2. Create service methods in `src/services/`
3. Build UI components in `src/components/`
4. Add pages in `src/pages/`
5. Update routing in `App.tsx`

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Related Projects

- [go-cms-service](https://github.com/vhvplatform/go-cms-service) - Backend API service

## Support

For issues, questions, or contributions, please open an issue on GitHub.
