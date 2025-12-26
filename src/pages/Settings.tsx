import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import './Settings.css';

export const Settings: React.FC = () => {
  const { tenant } = useAuth();

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p className="page-subtitle">Configure system and tenant settings</p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h2>Tenant Configuration</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Tenant Name</label>
              <input
                type="text"
                defaultValue={tenant?.name}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                defaultValue={tenant?.slug}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Domain (Optional)</label>
              <input
                type="text"
                placeholder="example.com"
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Enabled Article Types</h2>
          <div className="article-types-grid">
            {tenant?.settings.allowedArticleTypes.map((type) => (
              <label key={type} className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>{type.replace(/_/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h2>Feature Toggles</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-info">
                <h3>Scheduled Publishing</h3>
                <p>Enable auto-publishing and content expiration</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  defaultChecked={tenant?.settings.features.scheduling}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="feature-item">
              <div className="feature-info">
                <h3>Analytics</h3>
                <p>Track views, engagement, and performance metrics</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  defaultChecked={tenant?.settings.features.analytics}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="feature-item">
              <div className="feature-info">
                <h3>Premium Content</h3>
                <p>Enable premium/subscriber-only content access</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  defaultChecked={tenant?.settings.features.premiumContent}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="feature-item">
              <div className="feature-info">
                <h3>Multi-Language</h3>
                <p>Support multiple language versions of content</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  defaultChecked={tenant?.settings.features.multiLanguage}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Caching Configuration</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-info">
                <h3>Redis Caching</h3>
                <p>Cache frequently accessed data for better performance</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  defaultChecked={tenant?.settings.caching.enabled}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Cache TTL (seconds)</label>
            <input
              type="number"
              defaultValue={tenant?.settings.caching.ttl}
              className="form-input"
              min="60"
              max="86400"
            />
            <small className="form-hint">
              Time to live for cached items (60 seconds to 24 hours)
            </small>
          </div>
        </div>

        <div className="settings-section">
          <h2>Search Configuration</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-info">
                <h3>Full-Text Search</h3>
                <p>MongoDB text-based search across all content</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-primary">Save Changes</button>
          <button className="btn btn-secondary">Reset to Defaults</button>
        </div>
      </div>
    </div>
  );
};
