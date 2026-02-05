// 社群帳號相關類型定義

export type Platform =
  | 'twitter' | 'linkedin' | 'instagram'
  | 'youtube' | 'tiktok' | 'facebook' | 'threads' | 'discord'
  | 'pinterest' | 'snapchat' | 'reddit' | 'whatsapp';

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
  /** 平台圖標標籤：淡淡品牌色背景 + 同色系邊框，如 bg-gray-100 border border-gray-200 */
  iconBg: string;
  maxAccounts: number | typeof Infinity;
}
