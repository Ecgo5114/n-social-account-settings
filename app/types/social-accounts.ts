// 社群帳號相關類型定義

export type Platform = 'twitter' | 'linkedin' | 'instagram';

export interface SocialAccount {
  id: string;
  platform: Platform;
  accountName: string;
  accountHandle: string;
  status: 'verified' | 'expired' | 'pending';
  isPrimary?: boolean;
  linkedinType?: string;
  followers?: number;
  lastSynced?: string; // e.g., "Just now", "10 minutes ago"
}

export type LayoutStyle = 'current' | 'new';

export interface PlatformConfig {
  name: string;
  icon: any;
  color: string;
  maxAccounts: number | typeof Infinity;
}
