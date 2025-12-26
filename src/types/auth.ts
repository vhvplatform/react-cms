// User and Permission Types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  permissions: Permission[];
  createdAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  AUTHOR = 'author',
  CONTRIBUTOR = 'contributor',
  VIEWER = 'viewer',
}

export enum Permission {
  // Article permissions
  ARTICLE_CREATE = 'article.create',
  ARTICLE_READ = 'article.read',
  ARTICLE_UPDATE = 'article.update',
  ARTICLE_DELETE = 'article.delete',
  ARTICLE_PUBLISH = 'article.publish',
  ARTICLE_ARCHIVE = 'article.archive',
  
  // User permissions
  USER_CREATE = 'user.create',
  USER_READ = 'user.read',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',
  
  // Tenant permissions
  TENANT_CREATE = 'tenant.create',
  TENANT_READ = 'tenant.read',
  TENANT_UPDATE = 'tenant.update',
  TENANT_DELETE = 'tenant.delete',
  
  // Analytics permissions
  ANALYTICS_VIEW = 'analytics.view',
  ANALYTICS_EXPORT = 'analytics.export',
  
  // Settings permissions
  SETTINGS_VIEW = 'settings.view',
  SETTINGS_UPDATE = 'settings.update',
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  description: string;
}

// Tenant/Multi-tenancy Types
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  settings: TenantSettings;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  allowedArticleTypes: string[];
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
  };
  features: {
    scheduling: boolean;
    analytics: boolean;
    premiumContent: boolean;
    multiLanguage: boolean;
  };
  caching: {
    enabled: boolean;
    ttl: number; // Time to live in seconds
  };
}

export interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  switchTenant: (tenantId: string) => Promise<void>;
}
