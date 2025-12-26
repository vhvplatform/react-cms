// Scheduling and Workflow Types

import type { Article } from './article';

export interface ScheduledPublish {
  id: string;
  articleId: string;
  scheduledAt: Date;
  expiresAt?: Date;
  status: 'pending' | 'published' | 'failed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  executedAt?: Date;
  error?: string;
}

export interface WorkflowTransition {
  id: string;
  articleId: string;
  fromStatus: string;
  toStatus: string;
  userId: string;
  userName: string;
  comment?: string;
  timestamp: Date;
}

export interface WorkflowConfig {
  requireReview: boolean;
  reviewers: string[]; // User IDs
  autoPublish: boolean;
  notifyOnTransition: boolean;
  allowedTransitions: Record<string, string[]>; // From status -> To statuses
}

export interface ReviewComment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  comment: string;
  status: 'approve' | 'request_changes' | 'comment';
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  types?: string[];
  statuses?: string[];
  categories?: string[];
  tags?: string[];
  authorIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  accessControl?: string[];
}

export interface SearchResult {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
