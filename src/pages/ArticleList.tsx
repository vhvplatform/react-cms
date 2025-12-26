import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '@/services/articleService';
import { Article, ArticleType, ArticleStatus } from '@/types';
import './ArticleList.css';

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<ArticleType | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<ArticleStatus | ''>('');

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const filters: { type?: ArticleType; status?: ArticleStatus } = {};
      if (selectedType) filters.type = selectedType;
      if (selectedStatus) filters.status = selectedStatus;
      
      const result = await articleService.getArticles(filters);
      setArticles(result.articles);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedType, selectedStatus]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const getStatusBadgeClass = (status: ArticleStatus) => {
    switch (status) {
      case ArticleStatus.PUBLISHED:
        return 'status-badge status-published';
      case ArticleStatus.DRAFT:
        return 'status-badge status-draft';
      case ArticleStatus.REVIEW:
        return 'status-badge status-review';
      case ArticleStatus.ARCHIVED:
        return 'status-badge status-archived';
      default:
        return 'status-badge';
    }
  };

  const getTypeIcon = (type: ArticleType) => {
    const icons: Record<ArticleType, string> = {
      [ArticleType.NEWS]: '📰',
      [ArticleType.VIDEO]: '🎥',
      [ArticleType.PHOTO_GALLERY]: '📷',
      [ArticleType.LEGAL_DOCUMENT]: '⚖️',
      [ArticleType.STAFF_PROFILE]: '👤',
      [ArticleType.JOB_POSTING]: '💼',
      [ArticleType.PROCEDURE_DOCUMENT]: '📋',
      [ArticleType.DOWNLOADABLE_FILES]: '📁',
      [ArticleType.PODCAST]: '🎙️',
      [ArticleType.EVENT_INFORMATION]: '📅',
      [ArticleType.INFOGRAPHIC]: '📊',
      [ArticleType.TRAVEL_DESTINATION]: '✈️',
      [ArticleType.PARTNER_SPONSOR]: '🤝',
      [ArticleType.PDF_DOCUMENT]: '📄',
    };
    return icons[type] || '📝';
  };

  return (
    <div className="article-list-page">
      <div className="page-header">
        <div>
          <h1>Articles</h1>
          <p className="page-subtitle">Manage all your content in one place</p>
        </div>
        <Link to="/articles/new" className="btn btn-primary">
          ➕ Create Article
        </Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="type-filter">Article Type</label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ArticleType | '')}
            className="filter-select"
          >
            <option value="">All Types</option>
            {Object.values(ArticleType).map((type) => (
              <option key={String(type)} value={String(type)}>
                {getTypeIcon(type)} {String(type).replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ArticleStatus | '')}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            {Object.values(ArticleStatus).map((status) => (
              <option key={String(status)} value={String(status)}>
                {String(status)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading articles...</div>
      ) : (
        <div className="articles-grid">
          {articles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No articles found</h3>
              <p>Create your first article to get started</p>
              <Link to="/articles/new" className="btn btn-primary">
                Create Article
              </Link>
            </div>
          ) : (
            articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="article-card"
              >
                {article.featuredImage && (
                  <div
                    className="article-image"
                    style={{ backgroundImage: `url(${article.featuredImage})` }}
                  />
                )}
                
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-type-badge">
                      {getTypeIcon(article.type)} {article.type.replace(/_/g, ' ')}
                    </span>
                    <span className={getStatusBadgeClass(article.status)}>
                      {article.status}
                    </span>
                  </div>
                  
                  <h3 className="article-title">{article.title}</h3>
                  
                  {article.excerpt && (
                    <p className="article-excerpt">{article.excerpt}</p>
                  )}
                  
                  <div className="article-footer">
                    <div className="article-stats">
                      <span className="stat">
                        👁️ {article.viewCount.toLocaleString()}
                      </span>
                      {article.tags.length > 0 && (
                        <span className="stat">
                          🏷️ {article.tags.length}
                        </span>
                      )}
                    </div>
                    <div className="article-date">
                      {new Date(article.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
