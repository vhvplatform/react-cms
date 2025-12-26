import React, { useState } from 'react';
import './Scheduled.css';

interface ScheduledItem {
  id: string;
  articleTitle: string;
  articleType: string;
  scheduledAt: Date;
  expiresAt?: Date;
  status: 'pending' | 'published' | 'failed';
  createdBy: string;
}

const mockScheduledItems: ScheduledItem[] = [
  {
    id: '1',
    articleTitle: 'Summer Sale Announcement',
    articleType: 'news',
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'pending',
    createdBy: 'John Doe',
  },
  {
    id: '2',
    articleTitle: 'New Product Video Launch',
    articleType: 'video',
    scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'pending',
    createdBy: 'Jane Smith',
  },
  {
    id: '3',
    articleTitle: 'Monthly Newsletter',
    articleType: 'news',
    scheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'pending',
    createdBy: 'Admin User',
  },
];

export const Scheduled: React.FC = () => {
  const [items] = useState<ScheduledItem[]>(mockScheduledItems);

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'soon';
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'published':
        return 'status-published';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  return (
    <div className="scheduled-page">
      <div className="page-header">
        <div>
          <h1>Scheduled Publishing</h1>
          <p className="page-subtitle">Manage auto-publishing and content expiration</p>
        </div>
      </div>

      <div className="scheduled-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{items.filter(i => i.status === 'pending').length}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{items.filter(i => i.status === 'published').length}</div>
            <div className="stat-label">Published</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <div className="stat-value">{items.filter(i => i.status === 'failed').length}</div>
            <div className="stat-label">Failed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-value">{items.filter(i => i.expiresAt).length}</div>
            <div className="stat-label">With Expiration</div>
          </div>
        </div>
      </div>

      <div className="scheduled-list">
        {items.map((item) => (
          <div key={item.id} className="scheduled-item">
            <div className="item-header">
              <div className="item-title">
                <h3>{item.articleTitle}</h3>
                <span className="item-type">{item.articleType}</span>
              </div>
              <span className={`item-status ${getStatusClass(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="item-details">
              <div className="detail-row">
                <span className="detail-label">📅 Scheduled:</span>
                <span className="detail-value">
                  {formatDateTime(item.scheduledAt)}
                  <span className="time-until">{getTimeUntil(item.scheduledAt)}</span>
                </span>
              </div>

              {item.expiresAt && (
                <div className="detail-row">
                  <span className="detail-label">⏰ Expires:</span>
                  <span className="detail-value">
                    {formatDateTime(item.expiresAt)}
                  </span>
                </div>
              )}

              <div className="detail-row">
                <span className="detail-label">👤 Created by:</span>
                <span className="detail-value">{item.createdBy}</span>
              </div>
            </div>

            <div className="item-actions">
              <button className="btn btn-secondary btn-sm">Edit Schedule</button>
              <button className="btn btn-danger btn-sm">Cancel</button>
            </div>
          </div>
        ))}
      </div>

      <div className="scheduling-info">
        <h2>Scheduling Features</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🕐</div>
            <h3>Auto-Publishing</h3>
            <p>
              Schedule articles to be automatically published at a specific date and time.
              Perfect for coordinating content releases and maintaining a consistent publishing schedule.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Content Expiration</h3>
            <p>
              Set expiration dates for time-sensitive content like promotions or events.
              Articles are automatically archived when they expire.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🔄</div>
            <h3>Queue Processing</h3>
            <p>
              Scheduled tasks are processed through a background queue system,
              ensuring reliable execution even during high-traffic periods.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Notifications</h3>
            <p>
              Receive notifications when scheduled content is published or if any issues occur.
              Stay informed about your content pipeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
