import React, { createContext, useContext, useState, useEffect } from 'react';
import { Permission, UserRole } from '@/types';
import type { User, Tenant, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  email: 'admin@vhvcms.com',
  firstName: 'Admin',
  lastName: 'User',
  role: UserRole.ADMIN,
  tenantId: 'tenant-1',
  permissions: Object.values(Permission),
  createdAt: new Date(),
  isActive: true,
};

const mockTenant: Tenant = {
  id: 'tenant-1',
  name: 'VHV Platform',
  slug: 'vhv-platform',
  settings: {
    allowedArticleTypes: [
      'news', 'video', 'photo_gallery', 'legal_document', 'staff_profile',
      'job_posting', 'procedure_document', 'downloadable_files', 'podcast',
      'event_information', 'infographic', 'travel_destination', 'partner_sponsor', 'pdf_document'
    ],
    features: {
      scheduling: true,
      analytics: true,
      premiumContent: true,
      multiLanguage: false,
    },
    caching: {
      enabled: true,
      ttl: 3600,
    },
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Auto-login for demo purposes
    setUser(mockUser);
    setTenant(mockTenant);
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login - in production, this would call an API
    console.log('Login attempt:', email);
    setUser(mockUser);
    setTenant(mockTenant);
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
  };

  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const switchTenant = async (tenantId: string) => {
    // Mock tenant switching
    console.log('Switching to tenant:', tenantId);
  };

  const value: AuthContextType = {
    user,
    tenant,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    switchTenant,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
