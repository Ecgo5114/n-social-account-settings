import {
  Linkedin, Instagram, Youtube, Video, Facebook, Share2, MessageCircle,
  Image, Camera, MessageSquare, Phone,
} from 'lucide-react';
import { XIcon } from '@/app/components/icons/XIcon';
import type { Platform, PlatformConfig } from '@/app/types/social-accounts';

const PLATFORM_LIST: Array<{ id: Platform; name: string; icon: any; color: string; iconBg: string; maxAccounts: number }> = [
  { id: 'twitter', name: 'Twitter / X', icon: XIcon, color: 'text-black', iconBg: 'bg-gray-100 border border-gray-200', maxAccounts: Infinity },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-[#0A66C2]', iconBg: 'bg-blue-50 border border-blue-200', maxAccounts: 1 },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-[#E4405F]', iconBg: 'bg-pink-50 border border-pink-200', maxAccounts: 2 },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-[#FF0000]', iconBg: 'bg-red-50 border border-red-200', maxAccounts: Infinity },
  { id: 'tiktok', name: 'TikTok', icon: Video, color: 'text-black', iconBg: 'bg-gray-100 border border-gray-200', maxAccounts: Infinity },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-[#1877F2]', iconBg: 'bg-blue-50 border border-blue-200', maxAccounts: Infinity },
  { id: 'threads', name: 'Threads', icon: Share2, color: 'text-black', iconBg: 'bg-gray-100 border border-gray-200', maxAccounts: Infinity },
  { id: 'discord', name: 'Discord', icon: MessageCircle, color: 'text-[#5865F2]', iconBg: 'bg-indigo-50 border border-indigo-200', maxAccounts: Infinity },
  { id: 'pinterest', name: 'Pinterest', icon: Image, color: 'text-[#E60023]', iconBg: 'bg-red-50 border border-red-200', maxAccounts: Infinity },
  { id: 'snapchat', name: 'Snapchat', icon: Camera, color: 'text-[#FFFC00]', iconBg: 'bg-yellow-50 border border-yellow-200', maxAccounts: Infinity },
  { id: 'reddit', name: 'Reddit', icon: MessageSquare, color: 'text-[#FF4500]', iconBg: 'bg-orange-50 border border-orange-200', maxAccounts: Infinity },
  { id: 'whatsapp', name: 'WhatsApp', icon: Phone, color: 'text-[#25D366]', iconBg: 'bg-green-50 border border-green-200', maxAccounts: Infinity },
];

export const PLATFORM_IDS = PLATFORM_LIST.map(p => p.id) as Platform[];
export const platformConfig: Record<Platform, PlatformConfig> = Object.fromEntries(
  PLATFORM_LIST.map(p => [
    p.id,
    { name: p.name, icon: p.icon, color: p.color, iconBg: p.iconBg, maxAccounts: p.maxAccounts === Infinity ? Infinity : p.maxAccounts },
  ])
) as Record<Platform, PlatformConfig>;

export const STANDARD_PLATFORMS: Platform[] = ['twitter', 'linkedin', 'instagram'];
export const EXPANSION_PLATFORMS: Platform[] = PLATFORM_IDS;
