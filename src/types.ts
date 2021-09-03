export interface SiteMetadata {
  siteUrl: string;
  siteTitle: string;
  author: string;
  authorBio?: string;
  authorPath?: string;
  authorAvatar: any;
  socialLinks?: Array<{ name: string; link: string }>;
}
