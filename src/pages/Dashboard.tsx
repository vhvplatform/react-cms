import React, { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analyticsService';
import { DashboardMetrics } from '@/types';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await analyticsService.getDashboardMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (!metrics) {
    return <div className="error">Failed to load dashboard data</div>;
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of your content management system</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📝</div>
          <div className="metric-content">
            <div className="metric-label">Total Articles</div>
            <div className="metric-value">{metrics.totalArticles}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <div className="metric-label">Published</div>
            <div className="metric-value">{metrics.publishedArticles}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📋</div>
          <div className="metric-content">
            <div className="metric-label">Drafts</div>
            <div className="metric-value">{metrics.draftArticles}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📅</div>
          <div className="metric-content">
            <div className="metric-label">Scheduled</div>
            <div className="metric-value">{metrics.scheduledArticles}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👁️</div>
          <div className="metric-content">
            <div className="metric-label">Total Views</div>
            <div className="metric-value">{metrics.totalViews.toLocaleString()}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-label">Unique Views</div>
            <div className="metric-value">{metrics.totalUniqueViews.toLocaleString()}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-label">Views Today</div>
            <div className="metric-value">{metrics.viewsToday.toLocaleString()}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <div className="metric-label">Views This Month</div>
            <div className="metric-value">{metrics.viewsThisMonth.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Top Articles</h2>
          <div className="articles-list">
            {metrics.topArticles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="article-item"
              >
                <div className="article-info">
                  <div className="article-title">{article.title}</div>
                  <div className="article-type">{article.type.replace('_', ' ')}</div>
                </div>
                <div className="article-views">
                  👁️ {article.views.toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Articles by Type</h2>
          <div className="chart-container">
            {metrics.articlesByType.map((item) => (
              <div key={item.type} className="chart-bar">
                <div className="chart-label">
                  {item.type.replace('_', ' ')}
                </div>
                <div className="chart-bar-container">
                  <div
                    className="chart-bar-fill"
                    style={{
                      width: `${(item.count / metrics.totalArticles) * 100}%`,
                    }}
                  />
                  <span className="chart-value">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Articles by Status</h2>
          <div className="status-grid">
            {metrics.articlesByStatus.map((item) => (
              <div key={item.status} className="status-card">
                <div className="status-label">{item.status}</div>
                <div className="status-value">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {metrics.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.action === 'published' && '✅'}
                  {activity.action === 'created' && '➕'}
                  {activity.action === 'updated' && '✏️'}
                  {activity.action === 'deleted' && '🗑️'}
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    <strong>{activity.userName}</strong> {activity.action} an article
                  </div>
                  <div className="activity-details">{activity.details}</div>
                  <div className="activity-time">
                    {formatTimeAgo(activity.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
