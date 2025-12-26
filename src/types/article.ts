// Core Article Types based on go-cms-service specification

export enum ArticleType {
  NEWS = 'news',
  VIDEO = 'video',
  PHOTO_GALLERY = 'photo_gallery',
  LEGAL_DOCUMENT = 'legal_document',
  STAFF_PROFILE = 'staff_profile',
  JOB_POSTING = 'job_posting',
  PROCEDURE_DOCUMENT = 'procedure_document',
  DOWNLOADABLE_FILES = 'downloadable_files',
  PODCAST = 'podcast',
  EVENT_INFORMATION = 'event_information',
  INFOGRAPHIC = 'infographic',
  TRAVEL_DESTINATION = 'travel_destination',
  PARTNER_SPONSOR = 'partner_sponsor',
  PDF_DOCUMENT = 'pdf_document',
}

export enum ArticleStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum AccessControl {
  PUBLIC = 'public',
  LOGIN_REQUIRED = 'login_required',
  ROLE_BASED = 'role_based',
  PREMIUM = 'premium',
}

export interface BaseArticle {
  id: string;
  title: string;
  slug: string;
  type: ArticleType;
  status: ArticleStatus;
  accessControl: AccessControl;
  tenantId: string;
  authorId: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags: string[];
  categories: string[];
  metadata: Record<string, unknown>;
  publishedAt?: Date;
  scheduledPublishAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  allowedRoles?: string[];
}

// Type-specific article interfaces
export interface NewsArticle extends BaseArticle {
  type: ArticleType.NEWS;
  source?: string;
  location?: string;
  breaking?: boolean;
}

export interface VideoArticle extends BaseArticle {
  type: ArticleType.VIDEO;
  videoUrl: string;
  videoProvider?: 'youtube' | 'vimeo' | 'self-hosted';
  duration?: number;
  thumbnail?: string;
  captions?: string;
}

export interface PhotoGalleryArticle extends BaseArticle {
  type: ArticleType.PHOTO_GALLERY;
  images: Array<{
    url: string;
    caption?: string;
    alt: string;
    order: number;
  }>;
}

export interface LegalDocumentArticle extends BaseArticle {
  type: ArticleType.LEGAL_DOCUMENT;
  documentType: 'terms' | 'privacy' | 'disclaimer' | 'other';
  version: string;
  effectiveDate: Date;
  documentUrl?: string;
}

export interface StaffProfileArticle extends BaseArticle {
  type: ArticleType.STAFF_PROFILE;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email?: string;
  phone?: string;
  bio: string;
  profileImage?: string;
  socialLinks?: Record<string, string>;
}

export interface JobPostingArticle extends BaseArticle {
  type: ArticleType.JOB_POSTING;
  position: string;
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange?: string;
  requirements: string[];
  responsibilities: string[];
  applicationDeadline?: Date;
  applicationUrl?: string;
}

export interface ProcedureDocumentArticle extends BaseArticle {
  type: ArticleType.PROCEDURE_DOCUMENT;
  procedureId: string;
  version: string;
  steps: Array<{
    order: number;
    title: string;
    description: string;
    warnings?: string[];
  }>;
  relatedDocuments?: string[];
}

export interface DownloadableFilesArticle extends BaseArticle {
  type: ArticleType.DOWNLOADABLE_FILES;
  files: Array<{
    name: string;
    url: string;
    size: number;
    format: string;
    description?: string;
  }>;
}

export interface PodcastArticle extends BaseArticle {
  type: ArticleType.PODCAST;
  audioUrl: string;
  duration: number;
  episodeNumber?: number;
  seasonNumber?: number;
  hosts?: string[];
  guests?: string[];
  transcript?: string;
}

export interface EventArticle extends BaseArticle {
  type: ArticleType.EVENT_INFORMATION;
  eventDate: Date;
  eventEndDate?: Date;
  location: string;
  venue?: string;
  organizer?: string;
  registrationUrl?: string;
  capacity?: number;
  registrationDeadline?: Date;
}

export interface InfographicArticle extends BaseArticle {
  type: ArticleType.INFOGRAPHIC;
  infographicUrl: string;
  downloadUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface TravelDestinationArticle extends BaseArticle {
  type: ArticleType.TRAVEL_DESTINATION;
  destination: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  bestTimeToVisit?: string;
  attractions: string[];
  accommodations?: string[];
  activities?: string[];
}

export interface PartnerSponsorArticle extends BaseArticle {
  type: ArticleType.PARTNER_SPONSOR;
  companyName: string;
  logo?: string;
  website?: string;
  partnershipType: 'partner' | 'sponsor';
  sponsorshipLevel?: 'platinum' | 'gold' | 'silver' | 'bronze';
  description: string;
  contactEmail?: string;
}

export interface PDFDocumentArticle extends BaseArticle {
  type: ArticleType.PDF_DOCUMENT;
  pdfUrl: string;
  pageCount?: number;
  fileSize: number;
  allowDownload: boolean;
}

export type Article =
  | NewsArticle
  | VideoArticle
  | PhotoGalleryArticle
  | LegalDocumentArticle
  | StaffProfileArticle
  | JobPostingArticle
  | ProcedureDocumentArticle
  | DownloadableFilesArticle
  | PodcastArticle
  | EventArticle
  | InfographicArticle
  | TravelDestinationArticle
  | PartnerSponsorArticle
  | PDFDocumentArticle;
