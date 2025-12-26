import React, { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analyticsService';
import { QueueMetrics, CacheMetrics } from '@/types';
import './Analytics.css';

export const Analytics: React.FC = () => {
  const [queueMetrics, setQueueMetrics] = useState<QueueMetrics[]>([]);
  const [cacheMetrics, setCacheMetrics] = useState<CacheMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const [queues, cache] = await Promise.all([
        analyticsService.getQueueMetrics(),
        analyticsService.getCacheMetrics(),
      ]);
      setQueueMetrics(queues);
      setCacheMetrics(cache);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics & Performance</h1>
        <p className="page-subtitle">Monitor system performance and queue processing</p>
      </div>

      {cacheMetrics && (
        <div className="cache-section">
          <h2>Cache Performance</h2>
          <div className="cache-grid">
            <div className="cache-card">
              <div className="cache-status">
                {cacheMetrics.enabled ? (
                  <span className="status-enabled">✅ Enabled</span>
                ) : (
                  <span className="status-disabled">❌ Disabled</span>
                )}
              </div>
            </div>

            <div className="cache-card">
              <div className="cache-label">Hit Rate</div>
              <div className="cache-value">{cacheMetrics.hitRate.toFixed(1)}%</div>
              <div className="cache-bar">
                <div
                  className="cache-bar-fill hit"
                  style={{ width: `${cacheMetrics.hitRate}%` }}
                />
              </div>
            </div>

            <div className="cache-card">
              <div className="cache-label">Miss Rate</div>
              <div className="cache-value">{cacheMetrics.missRate.toFixed(1)}%</div>
              <div className="cache-bar">
                <div
                  className="cache-bar-fill miss"
                  style={{ width: `${cacheMetrics.missRate}%` }}
                />
              </div>
            </div>

            <div className="cache-card">
              <div className="cache-label">Total Keys</div>
              <div className="cache-value">{cacheMetrics.totalKeys.toLocaleString()}</div>
            </div>

            <div className="cache-card">
              <div className="cache-label">Memory Usage</div>
              <div className="cache-value">{cacheMetrics.memoryUsage.toFixed(1)} MB</div>
            </div>

            <div className="cache-card">
              <div className="cache-label">Evictions</div>
              <div className="cache-value">{cacheMetrics.evictionCount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="queue-section">
        <h2>Queue Metrics</h2>
        <div className="queue-list">
          {queueMetrics.map((queue) => (
            <div key={queue.queueName} className="queue-card">
              <div className="queue-header">
                <h3>{queue.queueName}</h3>
                <div className="queue-processing-time">
                  ⏱️ Avg: {queue.avgProcessingTime}ms
                </div>
              </div>

              <div className="queue-stats">
                <div className="queue-stat">
                  <div className="queue-stat-icon pending">⏳</div>
                  <div className="queue-stat-content">
                    <div className="queue-stat-label">Pending</div>
                    <div className="queue-stat-value">{queue.pending}</div>
                  </div>
                </div>

                <div className="queue-stat">
                  <div className="queue-stat-icon processing">🔄</div>
                  <div className="queue-stat-content">
                    <div className="queue-stat-label">Processing</div>
                    <div className="queue-stat-value">{queue.processing}</div>
                  </div>
                </div>

                <div className="queue-stat">
                  <div className="queue-stat-icon completed">✅</div>
                  <div className="queue-stat-content">
                    <div className="queue-stat-label">Completed</div>
                    <div className="queue-stat-value">{queue.completed.toLocaleString()}</div>
                  </div>
                </div>

                <div className="queue-stat">
                  <div className="queue-stat-icon failed">❌</div>
                  <div className="queue-stat-content">
                    <div className="queue-stat-label">Failed</div>
                    <div className="queue-stat-value">{queue.failed}</div>
                  </div>
                </div>
              </div>

              {queue.lastProcessedAt && (
                <div className="queue-footer">
                  Last processed: {new Date(queue.lastProcessedAt).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-info">
        <div className="info-card">
          <h3>📊 Queue-Based Analytics</h3>
          <p>
            View counts and analytics are processed asynchronously through message queues
            for optimal performance. This ensures that article views don't impact page load times.
          </p>
        </div>

        <div className="info-card">
          <h3>🚀 Redis Caching</h3>
          <p>
            Frequently accessed data is cached in Redis to improve response times.
            The cache hit rate indicates how effectively the cache is being used.
          </p>
        </div>
      </div>
    </div>
  );
};
