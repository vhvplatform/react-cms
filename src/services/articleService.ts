import { ArticleType, ArticleStatus, AccessControl } from '@/types';
import type { Article } from '@/types';

// Mock article data generator
const generateMockArticle = (id: string, type: ArticleType): Article => {
  const baseArticle = {
    id,
    title: `Sample ${type.replace('_', ' ')} Article ${id}`,
    slug: `sample-${type}-${id}`,
    type,
    status: ArticleStatus.PUBLISHED,
    accessControl: AccessControl.PUBLIC,
    tenantId: 'tenant-1',
    authorId: 'user-1',
    content: '<p>This is sample content for the article.</p>',
    excerpt: 'Sample excerpt',
    featuredImage: 'https://via.placeholder.com/800x600',
    tags: ['sample', type],
    categories: ['Category 1'],
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: Math.floor(Math.random() * 10000),
  };

  switch (type) {
    case ArticleType.VIDEO:
      return {
        ...baseArticle,
        type: ArticleType.VIDEO,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoProvider: 'youtube',
        duration: 180,
      };
    case ArticleType.PHOTO_GALLERY:
      return {
        ...baseArticle,
        type: ArticleType.PHOTO_GALLERY,
        images: [
          { url: 'https://via.placeholder.com/800x600/1', caption: 'Image 1', alt: 'Image 1', order: 1 },
          { url: 'https://via.placeholder.com/800x600/2', caption: 'Image 2', alt: 'Image 2', order: 2 },
        ],
      };
    case ArticleType.EVENT_INFORMATION:
      return {
        ...baseArticle,
        type: ArticleType.EVENT_INFORMATION,
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'New York, NY',
        venue: 'Convention Center',
      };
    case ArticleType.JOB_POSTING:
      return {
        ...baseArticle,
        type: ArticleType.JOB_POSTING,
        position: 'Software Engineer',
        department: 'Engineering',
        location: 'Remote',
        employmentType: 'full-time',
        requirements: ['Bachelor\'s degree', '3+ years experience'],
        responsibilities: ['Develop features', 'Review code'],
      };
    default:
      return baseArticle as Article;
  }
};

// Mock articles database
const mockArticles: Article[] = [
  generateMockArticle('1', ArticleType.NEWS),
  generateMockArticle('2', ArticleType.VIDEO),
  generateMockArticle('3', ArticleType.PHOTO_GALLERY),
  generateMockArticle('4', ArticleType.EVENT_INFORMATION),
  generateMockArticle('5', ArticleType.JOB_POSTING),
  generateMockArticle('6', ArticleType.LEGAL_DOCUMENT),
  generateMockArticle('7', ArticleType.PODCAST),
  generateMockArticle('8', ArticleType.STAFF_PROFILE),
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const articleService = {
  // Get all articles with optional filters
  async getArticles(filters?: {
    type?: ArticleType;
    status?: ArticleStatus;
    page?: number;
    limit?: number;
  }): Promise<{ articles: Article[]; total: number }> {
    await delay(300);
    
    let filtered = [...mockArticles];
    
    if (filters?.type) {
      filtered = filtered.filter(a => a.type === filters.type);
    }
    
    if (filters?.status) {
      filtered = filtered.filter(a => a.status === filters.status);
    }
    
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    
    return {
      articles: paginated,
      total: filtered.length,
    };
  },

  // Get single article by ID
  async getArticle(id: string): Promise<Article | null> {
    await delay(200);
    return mockArticles.find(a => a.id === id) || null;
  },

  // Create new article
  async createArticle(article: Partial<Article>): Promise<Article> {
    await delay(500);
    const newArticle = {
      ...article,
      id: `${mockArticles.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Article;
    mockArticles.push(newArticle);
    return newArticle;
  },

  // Update article
  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    await delay(500);
    const index = mockArticles.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Article not found');
    
    const updated = {
      ...mockArticles[index],
      ...updates,
      updatedAt: new Date(),
    };
    mockArticles[index] = updated as Article;
    return mockArticles[index];
  },

  // Delete article
  async deleteArticle(id: string): Promise<void> {
    await delay(300);
    const index = mockArticles.findIndex(a => a.id === id);
    if (index > -1) {
      mockArticles.splice(index, 1);
    }
  },

  // Get article types
  async getArticleTypes(): Promise<ArticleType[]> {
    await delay(100);
    return Object.values(ArticleType);
  },
};
