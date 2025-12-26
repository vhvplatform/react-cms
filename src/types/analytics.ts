// Analytics and Statistics Types

export interface ArticleAnalytics {
  articleId: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number; // in seconds
  shares: number;
  comments: number;
  viewsByDate: Array<{
    date: string;
    count: number;
  }>;
  viewsBySource: Array<{
    source: string;
    count: number;
  }>;
  topReferrers: Array<{
    url: string;
    count: number;
  }>;
}

export interface DashboardMetrics {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  scheduledArticles: number;
  totalViews: number;
  totalUniqueViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  topArticles: Array<{
    id: string;
    title: string;
    views: number;
    type: string;
  }>;
  articlesByType: Array<{
    type: string;
    count: number;
  }>;
  articlesByStatus: Array<{
    status: string;
    count: number;
  }>;
  recentActivity: ActivityLog[];
}

export interface QueueMetrics {
  queueName: string;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  avgProcessingTime: number; // in milliseconds
  lastProcessedAt?: Date;
}

export interface CacheMetrics {
  enabled: boolean;
  hitRate: number; // percentage
  missRate: number; // percentage
  totalKeys: number;
  memoryUsage: number; // in MB
  evictionCount: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details?: string;
  timestamp: Date;
}

export interface ExportRequest {
  startDate: Date;
  endDate: Date;
  metrics: string[];
  format: 'csv' | 'json' | 'pdf';
}
