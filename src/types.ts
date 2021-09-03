export interface SiteMetadata {
  siteUrl: string;
  siteTitle: string;
  author: string;
  authorBio?: string;
  authorPath?: string;
  authorAvatar: any;
  socialLinks?: Array<{ name: string; link: string }>;
}

export interface PreviewPost {
  slug: string;
  title: string;
  draft?: boolean;
  tags: Array<{ name: string; slug: string }>;
  date?: string;
  description?: string;
  excerpt: string;
}
