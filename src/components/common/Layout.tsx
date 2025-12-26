import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Layout.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, tenant, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/articles', label: 'Articles', icon: '📝' },
    { path: '/scheduled', label: 'Scheduled', icon: '📅' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/workflow', label: 'Workflow', icon: '🔄' },
    { path: '/permissions', label: 'Permissions', icon: '🔐' },
    { path: '/tenants', label: 'Tenants', icon: '🏢' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            {tenant?.logo ? (
              <img src={tenant.logo} alt={tenant.name} />
            ) : (
              '📰'
            )}
            <span>VHV CMS</span>
          </h1>
          {tenant && <div className="tenant-name">{tenant.name}</div>}
        </div>
        
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="main-container">
        <header className="header">
          <div className="header-search">
            <input
              type="search"
              placeholder="Search articles..."
              className="search-input"
            />
          </div>
          
          <div className="header-actions">
            {user && (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-name">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="user-role">{user.role}</span>
                </div>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};
