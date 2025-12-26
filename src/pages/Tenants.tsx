import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import './Tenants.css';

export const Tenants: React.FC = () => {
  const { tenant } = useAuth();

  const mockTenants = [
    {
      id: 'tenant-1',
      name: 'VHV Platform',
      slug: 'vhv-platform',
      domain: 'vhvplatform.com',
      articleCount: 234,
      userCount: 12,
      isActive: true,
    },
    {
      id: 'tenant-2',
      name: 'Demo Organization',
      slug: 'demo-org',
      domain: 'demo.example.com',
      articleCount: 45,
      userCount: 5,
      isActive: true,
    },
  ];

  return (
    <div className="tenants-page">
      <div className="page-header">
        <div>
          <h1>Multi-Tenancy Management</h1>
          <p className="page-subtitle">Manage organizations and tenant configurations</p>
        </div>
        <button className="btn btn-primary">➕ Add Tenant</button>
      </div>

      <div className="current-tenant-card">
        <div className="current-tenant-badge">Current Tenant</div>
        <h2>{tenant?.name}</h2>
        <div className="tenant-details">
          <div className="detail-item">
            <span className="detail-label">Slug:</span>
            <span className="detail-value">{tenant?.slug}</span>
          </div>
          {tenant?.domain && (
            <div className="detail-item">
              <span className="detail-label">Domain:</span>
              <span className="detail-value">{tenant.domain}</span>
            </div>
          )}
        </div>
      </div>

      <div className="tenants-grid">
        {mockTenants.map((t) => (
          <div key={t.id} className="tenant-card">
            <div className="tenant-header">
              <h3>{t.name}</h3>
              <span className={`tenant-status ${t.isActive ? 'active' : 'inactive'}`}>
                {t.isActive ? '✓ Active' : '✗ Inactive'}
              </span>
            </div>

            <div className="tenant-info">
              <div className="info-row">
                <span className="info-icon">🔗</span>
                <span className="info-text">{t.slug}</span>
              </div>
              {t.domain && (
                <div className="info-row">
                  <span className="info-icon">🌐</span>
                  <span className="info-text">{t.domain}</span>
                </div>
              )}
            </div>

            <div className="tenant-stats">
              <div className="stat">
                <div className="stat-value">{t.articleCount}</div>
                <div className="stat-label">Articles</div>
              </div>
              <div className="stat">
                <div className="stat-value">{t.userCount}</div>
                <div className="stat-label">Users</div>
              </div>
            </div>

            <div className="tenant-actions">
              <button className="btn btn-secondary btn-sm">Configure</button>
              <button className="btn btn-secondary btn-sm">Switch To</button>
            </div>
          </div>
        ))}
      </div>

      <div className="tenancy-features">
        <h2>Multi-Tenancy Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Isolated Data</h3>
            <p>Each tenant has completely isolated data and user management</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Custom Branding</h3>
            <p>Configure logos, colors, and themes per tenant</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Configurable Features</h3>
            <p>Enable or disable features based on tenant requirements</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Independent Analytics</h3>
            <p>Separate analytics and reporting for each organization</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Security Isolation</h3>
            <p>Role-based access control scoped to tenant boundaries</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Article Type Control</h3>
            <p>Configure which article types are available per tenant</p>
          </div>
        </div>
      </div>
    </div>
  );
};
