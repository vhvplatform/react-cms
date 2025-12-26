import type { DashboardMetrics, ArticleAnalytics, QueueMetrics, CacheMetrics } from '@/types';

// Mock analytics data
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyticsService = {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    await delay(300);
    
    return {
      totalArticles: 234,
      publishedArticles: 189,
      draftArticles: 32,
      scheduledArticles: 13,
      totalViews: 45678,
      totalUniqueViews: 32456,
      viewsToday: 1234,
      viewsThisWeek: 8945,
      viewsThisMonth: 28456,
      topArticles: [
        { id: '1', title: 'Breaking News: Major Update', views: 5678, type: 'news' },
        { id: '2', title: 'Video Tutorial Series', views: 4321, type: 'video' },
        { id: '3', title: 'Photo Gallery: Event Highlights', views: 3456, type: 'photo_gallery' },
        { id: '4', title: 'Upcoming Conference 2024', views: 2890, type: 'event_information' },
        { id: '5', title: 'Senior Developer Position', views: 2456, type: 'job_posting' },
      ],
      articlesByType: [
        { type: 'news', count: 78 },
        { type: 'video', count: 45 },
        { type: 'photo_gallery', count: 34 },
        { type: 'event_information', count: 23 },
        { type: 'job_posting', count: 19 },
        { type: 'podcast', count: 15 },
        { type: 'legal_document', count: 12 },
        { type: 'staff_profile', count: 8 },
      ],
      articlesByStatus: [
        { status: 'published', count: 189 },
        { status: 'draft', count: 32 },
        { status: 'review', count: 13 },
        { status: 'archived', count: 0 },
      ],
      recentActivity: [
        {
          id: '1',
          userId: 'user-1',
          userName: 'John Doe',
          action: 'published',
          resourceType: 'article',
          resourceId: '123',
          details: 'Published "Breaking News Article"',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
        {
          id: '2',
          userId: 'user-2',
          userName: 'Jane Smith',
          action: 'created',
          resourceType: 'article',
          resourceId: '124',
          details: 'Created draft "New Feature Announcement"',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
        },
        {
          id: '3',
          userId: 'user-1',
          userName: 'John Doe',
          action: 'updated',
          resourceType: 'article',
          resourceId: '122',
          details: 'Updated "Event Information"',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
        },
      ],
    };
  },

  async getArticleAnalytics(articleId: string): Promise<ArticleAnalytics> {
    await delay(300);
    
    return {
      articleId,
      views: 5678,
      uniqueViews: 4321,
      avgTimeOnPage: 185,
      shares: 234,
      comments: 45,
      viewsByDate: [
        { date: '2024-01-01', count: 123 },
        { date: '2024-01-02', count: 234 },
        { date: '2024-01-03', count: 345 },
        { date: '2024-01-04', count: 456 },
        { date: '2024-01-05', count: 567 },
      ],
      viewsBySource: [
        { source: 'direct', count: 2345 },
        { source: 'social', count: 1890 },
        { source: 'search', count: 987 },
        { source: 'referral', count: 456 },
      ],
      topReferrers: [
        { url: 'https://google.com', count: 987 },
        { url: 'https://facebook.com', count: 654 },
        { url: 'https://twitter.com', count: 432 },
      ],
    };
  },

  async getQueueMetrics(): Promise<QueueMetrics[]> {
    await delay(200);
    
    return [
      {
        queueName: 'article-views',
        pending: 45,
        processing: 12,
        completed: 23456,
        failed: 23,
        avgProcessingTime: 125,
        lastProcessedAt: new Date(),
      },
      {
        queueName: 'article-indexing',
        pending: 8,
        processing: 3,
        completed: 12345,
        failed: 5,
        avgProcessingTime: 450,
        lastProcessedAt: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        queueName: 'scheduled-publishing',
        pending: 13,
        processing: 0,
        completed: 456,
        failed: 2,
        avgProcessingTime: 850,
        lastProcessedAt: new Date(Date.now() - 1000 * 60 * 15),
      },
    ];
  },

  async getCacheMetrics(): Promise<CacheMetrics> {
    await delay(200);
    
    return {
      enabled: true,
      hitRate: 87.5,
      missRate: 12.5,
      totalKeys: 2345,
      memoryUsage: 456.7,
      evictionCount: 123,
    };
  },
};
