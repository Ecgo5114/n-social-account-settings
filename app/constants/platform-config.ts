import { Linkedin, Instagram } from 'lucide-react';
import { XIcon } from '@/app/components/icons/XIcon';
import type { Platform, PlatformConfig } from '@/app/types/social-accounts';

// 平台配置
export const platformConfig: Record<Platform, PlatformConfig> = {
  twitter: {
    name: 'Twitter / X',
    icon: XIcon,
    color: 'text-black',
    maxAccounts: Infinity,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-[#0A66C2]',
    maxAccounts: 1,
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    color: 'text-[#E4405F]',
    maxAccounts: 2,
  },
};
