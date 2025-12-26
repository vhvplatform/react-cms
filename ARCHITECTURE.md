# Architecture Documentation

## Overview

The VHV React CMS is a modern, type-safe content management system built with React, TypeScript, and Vite. It provides a comprehensive interface for managing multiple types of content with advanced features like multi-tenancy, role-based permissions, editorial workflows, and real-time analytics.

## Technology Stack

### Core Technologies
- **React 19**: Latest version of React for building the UI
- **TypeScript**: Provides static typing and enhanced developer experience
- **Vite**: Fast build tool and development server
- **React Router v6**: Client-side routing

### Dependencies
- **@tanstack/react-query**: Server state management and data fetching
- **axios**: HTTP client for API requests
- **date-fns**: Date manipulation and formatting
- **recharts**: Charting library for analytics
- **lucide-react**: Icon library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Layout, Navigation)
│   ├── articles/       # Article-specific components
│   ├── dashboard/      # Dashboard widgets
│   ├── permissions/    # Permission management UI
│   ├── scheduling/     # Scheduling components
│   ├── workflow/       # Workflow visualizations
│   ├── search/         # Search interface
│   └── analytics/      # Analytics charts
├── pages/              # Page-level components (routes)
│   ├── Dashboard.tsx   # Main dashboard
│   ├── ArticleList.tsx # Article listing and filtering
│   ├── Analytics.tsx   # Analytics and metrics
│   ├── Permissions.tsx # Role and permission management
│   ├── Workflow.tsx    # Editorial workflow
│   ├── Scheduled.tsx   # Scheduled publishing
│   ├── Tenants.tsx     # Multi-tenancy management
│   └── Settings.tsx    # Configuration
├── contexts/           # React contexts for global state
│   └── AuthContext.tsx # Authentication and authorization
├── services/           # API service layer
│   ├── articleService.ts  # Article CRUD operations
│   └── analyticsService.ts # Analytics and metrics
├── types/              # TypeScript type definitions
│   ├── article.ts      # Article types (14+ types)
│   ├── auth.ts         # User, role, and permission types
│   ├── analytics.ts    # Analytics and metrics types
│   └── workflow.ts     # Workflow and scheduling types
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.tsx             # Root application component
└── main.tsx            # Application entry point
```

## Core Features

### 1. Type System

The application uses a comprehensive TypeScript type system:

#### Article Types (14+)
- Base `Article` interface with common fields
- Type-specific interfaces extending the base:
  - `NewsArticle`, `VideoArticle`, `PhotoGalleryArticle`
  - `LegalDocumentArticle`, `StaffProfileArticle`
  - `JobPostingArticle`, `ProcedureDocumentArticle`
  - `DownloadableFilesArticle`, `PodcastArticle`
  - `EventArticle`, `InfographicArticle`
  - `TravelDestinationArticle`, `PartnerSponsorArticle`
  - `PDFDocumentArticle`

#### Discriminated Unions
TypeScript's discriminated unions ensure type safety:
```typescript
type Article = NewsArticle | VideoArticle | PhotoGalleryArticle | ...;
```

### 2. Authentication & Authorization

#### User Roles (6)
1. **Super Admin**: Full system access
2. **Admin**: Manage content, users, settings
3. **Editor**: Create, edit, publish content
4. **Author**: Create and edit own content
5. **Contributor**: Submit content for review
6. **Viewer**: Read-only access

#### Permissions
Granular permissions for:
- Articles (create, read, update, delete, publish, archive)
- Users (create, read, update, delete)
- Tenants (create, read, update, delete)
- Analytics (view, export)
- Settings (view, update)

### 3. Multi-Tenancy

#### Features
- Isolated data per tenant
- Tenant-specific configurations
- Custom branding (logo, colors)
- Configurable article types
- Independent analytics

#### Tenant Settings
- Enabled article types
- Feature toggles (scheduling, analytics, premium content)
- Cache configuration (TTL)
- Theme customization

### 4. Editorial Workflow

#### Lifecycle
1. **Draft**: Initial creation and editing
2. **Review**: Content review process
3. **Published**: Live content
4. **Archived**: Removed from public view

#### Features
- Configurable review requirements
- Approval workflows
- Transition tracking
- Review comments
- Notification system

### 5. Scheduled Publishing

#### Capabilities
- Auto-publish at scheduled date/time
- Content expiration
- Queue-based processing
- Notification on publish/failure

### 6. Analytics & Monitoring

#### Dashboard Metrics
- Total, published, draft, and scheduled article counts
- View counts (total, unique, today, this week, this month)
- Top articles by views
- Articles by type and status
- Recent activity log

#### Queue Metrics
- Pending, processing, completed, failed counts
- Average processing time
- Last processed timestamp

#### Cache Metrics
- Hit/miss rates
- Total keys
- Memory usage
- Eviction counts

### 7. Access Control

#### Types
1. **Public**: Accessible to everyone
2. **Login Required**: Authenticated users only
3. **Role-Based**: Specific user roles
4. **Premium**: Premium subscribers only

## Service Layer

### Mock Implementation

The current implementation uses mock data for demonstration:

```typescript
// articleService.ts
export const articleService = {
  async getArticles(filters) { /* mock implementation */ },
  async getArticle(id) { /* mock implementation */ },
  async createArticle(article) { /* mock implementation */ },
  async updateArticle(id, updates) { /* mock implementation */ },
  async deleteArticle(id) { /* mock implementation */ },
};
```

### Production Integration

To connect to a real backend (e.g., go-cms-service):

1. **Update Service Files**
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
   
   export const articleService = {
     async getArticles(filters) {
       const response = await axios.get(`${API_BASE_URL}/articles`, {
         params: filters
       });
       return response.data;
     },
     // ... other methods
   };
   ```

2. **Add Authentication**
   ```typescript
   axios.interceptors.request.use(config => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

3. **Error Handling**
   ```typescript
   axios.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         // Handle unauthorized
       }
       return Promise.reject(error);
     }
   );
   ```

## State Management

### Global State
- **AuthContext**: User authentication, tenant context, permissions
- Uses React Context API for simplicity

### Local State
- Component-level state with `useState`
- Form state management

### Server State (Prepared)
- TanStack Query for data fetching and caching
- Automatic background refetching
- Optimistic updates

## Routing

### Route Structure
```typescript
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/articles" element={<ArticleList />} />
  <Route path="/scheduled" element={<Scheduled />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="/workflow" element={<Workflow />} />
  <Route path="/permissions" element={<Permissions />} />
  <Route path="/tenants" element={<Tenants />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
```

### Protected Routes (To Add)
```typescript
<Route path="/admin/*" element={
  <ProtectedRoute requiredPermission={Permission.ADMIN_ACCESS}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

## Styling

### Approach
- **Component-scoped CSS**: Each component has its own CSS file
- **CSS Modules**: Could be implemented for better scoping
- **Global Styles**: `index.css` for reset and utilities
- **Responsive Design**: Mobile-first approach with media queries

### Design System
- **Colors**: Consistent color palette
  - Primary: #4a90e2 (blue)
  - Success: #28a745 (green)
  - Warning: #ffc107 (yellow)
  - Danger: #dc3545 (red)
- **Typography**: System fonts for performance
- **Spacing**: 4px/8px grid system
- **Border Radius**: Consistent 4px/8px/12px values

## Performance Optimizations

### Current
- Code splitting with React.lazy (to be implemented)
- Vite's optimized bundling
- Tree-shaking unused code

### Future Optimizations
1. **Code Splitting**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

2. **Memoization**
   ```typescript
   const MemoizedComponent = memo(ExpensiveComponent);
   ```

3. **Virtual Scrolling** for large lists
4. **Image Optimization** with lazy loading
5. **Bundle Analysis** to identify large dependencies

## Testing Strategy

### Unit Tests (To Implement)
- Component testing with React Testing Library
- Service layer testing
- Utility function testing

### Integration Tests (To Implement)
- User flow testing
- API integration testing

### E2E Tests (To Implement)
- Playwright or Cypress for end-to-end testing

## Security Considerations

### Current Implementation
1. **Type Safety**: TypeScript prevents many runtime errors
2. **Input Validation**: Basic client-side validation
3. **Permission Checks**: Role-based access control

### Production Requirements
1. **Authentication**: JWT or session-based
2. **CSRF Protection**: Token-based
3. **XSS Prevention**: Sanitize user input
4. **HTTPS Only**: Enforce secure connections
5. **Content Security Policy**: Implement CSP headers
6. **Rate Limiting**: API request throttling

## Deployment

### Build Process
```bash
npm run build
```

Outputs to `dist/` directory:
- Optimized JavaScript bundles
- Minified CSS
- Asset optimization
- Source maps (optional)

### Environment Variables
```env
VITE_API_BASE_URL=https://api.example.com
VITE_TENANT_ID=default
VITE_ENABLE_ANALYTICS=true
```

### Hosting Options
1. **Static Hosting**: Vercel, Netlify, GitHub Pages
2. **CDN**: CloudFlare, AWS CloudFront
3. **Docker**: Containerized deployment

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- No IE11 support (uses modern ES features)

## Future Enhancements

### Planned Features
1. **Rich Text Editor**: Integrate Tiptap or Slate
2. **Image Upload**: Drag-and-drop with preview
3. **Real-time Collaboration**: WebSocket support
4. **Internationalization**: i18n support
5. **Dark Mode**: Theme switching
6. **Offline Support**: Service Workers
7. **PWA**: Progressive Web App capabilities
8. **Advanced Search**: Elasticsearch integration
9. **Media Library**: Asset management
10. **Version Control**: Content versioning

### Technical Improvements
1. **Performance Monitoring**: Add analytics
2. **Error Tracking**: Sentry integration
3. **A/B Testing**: Feature flags
4. **Accessibility**: WCAG 2.1 AA compliance
5. **SEO**: Meta tags, structured data

## Contributing

### Code Style
- ESLint configuration
- Prettier for formatting
- Consistent naming conventions

### Git Workflow
- Feature branches
- Pull request reviews
- Semantic commit messages

### Documentation
- Inline code comments for complex logic
- README for setup instructions
- This ARCHITECTURE.md for system design

## Support

For questions or issues:
- GitHub Issues
- Documentation site
- Community forums

## License

[Specify License]
