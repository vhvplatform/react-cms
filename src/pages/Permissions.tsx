import React, { useState } from 'react';
import { UserRole, Permission } from '@/types';
import './Permissions.css';

interface RoleConfig {
  role: UserRole;
  label: string;
  description: string;
  permissions: Permission[];
}

const roleConfigs: RoleConfig[] = [
  {
    role: UserRole.SUPER_ADMIN,
    label: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: Object.values(Permission),
  },
  {
    role: UserRole.ADMIN,
    label: 'Admin',
    description: 'Manage content, users, and settings',
    permissions: [
      Permission.ARTICLE_CREATE,
      Permission.ARTICLE_READ,
      Permission.ARTICLE_UPDATE,
      Permission.ARTICLE_DELETE,
      Permission.ARTICLE_PUBLISH,
      Permission.ARTICLE_ARCHIVE,
      Permission.USER_CREATE,
      Permission.USER_READ,
      Permission.USER_UPDATE,
      Permission.ANALYTICS_VIEW,
      Permission.SETTINGS_VIEW,
      Permission.SETTINGS_UPDATE,
    ],
  },
  {
    role: UserRole.EDITOR,
    label: 'Editor',
    description: 'Create, edit, and publish content',
    permissions: [
      Permission.ARTICLE_CREATE,
      Permission.ARTICLE_READ,
      Permission.ARTICLE_UPDATE,
      Permission.ARTICLE_PUBLISH,
      Permission.ARTICLE_ARCHIVE,
      Permission.ANALYTICS_VIEW,
    ],
  },
  {
    role: UserRole.AUTHOR,
    label: 'Author',
    description: 'Create and edit own content',
    permissions: [
      Permission.ARTICLE_CREATE,
      Permission.ARTICLE_READ,
      Permission.ARTICLE_UPDATE,
    ],
  },
  {
    role: UserRole.CONTRIBUTOR,
    label: 'Contributor',
    description: 'Submit content for review',
    permissions: [
      Permission.ARTICLE_CREATE,
      Permission.ARTICLE_READ,
    ],
  },
  {
    role: UserRole.VIEWER,
    label: 'Viewer',
    description: 'Read-only access',
    permissions: [
      Permission.ARTICLE_READ,
      Permission.ANALYTICS_VIEW,
    ],
  },
];

export const Permissions: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const getPermissionCategory = (permission: Permission): string => {
    if (permission.startsWith('article.')) return 'Articles';
    if (permission.startsWith('user.')) return 'Users';
    if (permission.startsWith('tenant.')) return 'Tenants';
    if (permission.startsWith('analytics.')) return 'Analytics';
    if (permission.startsWith('settings.')) return 'Settings';
    return 'Other';
  };

  const groupPermissions = (permissions: Permission[]) => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((perm) => {
      const category = getPermissionCategory(perm);
      if (!groups[category]) groups[category] = [];
      groups[category].push(perm);
    });
    return groups;
  };

  return (
    <div className="permissions-page">
      <div className="page-header">
        <h1>Roles & Permissions</h1>
        <p className="page-subtitle">Manage user roles and access control</p>
      </div>

      <div className="roles-grid">
        {roleConfigs.map((config) => (
          <div
            key={config.role}
            className={`role-card ${selectedRole === config.role ? 'selected' : ''}`}
            onClick={() => setSelectedRole(selectedRole === config.role ? null : config.role)}
          >
            <div className="role-header">
              <h3>{config.label}</h3>
              <div className="role-badge">
                {config.permissions.length} permissions
              </div>
            </div>
            <p className="role-description">{config.description}</p>
            
            {selectedRole === config.role && (
              <div className="role-permissions">
                {Object.entries(groupPermissions(config.permissions)).map(([category, perms]) => (
                  <div key={category} className="permission-group">
                    <h4>{category}</h4>
                    <ul>
                      {perms.map((perm) => (
                        <li key={perm}>
                          <span className="permission-icon">✓</span>
                          {perm.split('.')[1].replace('_', ' ')}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="access-control-section">
        <h2>Access Control Types</h2>
        <div className="access-control-grid">
          <div className="access-card">
            <div className="access-icon">🌐</div>
            <h3>Public</h3>
            <p>Content accessible to everyone without authentication</p>
          </div>

          <div className="access-card">
            <div className="access-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Content accessible only to authenticated users</p>
          </div>

          <div className="access-card">
            <div className="access-icon">👥</div>
            <h3>Role-Based</h3>
            <p>Content restricted to specific user roles</p>
          </div>

          <div className="access-card">
            <div className="access-icon">⭐</div>
            <h3>Premium</h3>
            <p>Content restricted to premium subscribers</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>🔐 Advanced Permissions</h3>
          <p>
            The CMS supports granular permission management at multiple levels:
            article operations, user management, tenant administration, analytics access,
            and system settings. Each role is pre-configured with appropriate permissions,
            but can be customized per user if needed.
          </p>
        </div>

        <div className="info-card">
          <h3>🏢 Multi-Tenancy Support</h3>
          <p>
            Permissions are scoped to tenants, allowing different organizations to manage
            their own content and users independently. Super admins can manage multiple tenants,
            while other roles are restricted to their assigned tenant.
          </p>
        </div>
      </div>
    </div>
  );
};
