'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Twitter, Linkedin, Instagram, AlertCircle, Edit2, MoreHorizontal, CheckCircle2, Plus,
  LayoutDashboard, Share2, Calendar, TrendingUp, CreditCard, FileText, Users, Settings,
  Lock, HelpCircle, Search, Bell, User, ChevronLeft, ChevronRight, Menu, ChevronDown, ChevronUp, XCircle, RefreshCw
} from 'lucide-react';
import { useTheme } from './components/ThemeProvider';
import type { Platform, SocialAccount, LayoutStyle } from './types/social-accounts';
import { platformConfig } from './constants/platform-config';
import { useSocialAccounts } from './hooks/useSocialAccounts';
import { useLayoutStyle } from './hooks/useLayoutStyle';
import { usePlatformExpanded } from './hooks/usePlatformExpanded';

export default function SocialAccountsSettings() {
  const { theme } = useTheme();
  
  // 使用自定義 Hooks 管理業務邏輯
  const {
    accounts,
    showSwitchModal,
    getAccountsByPlatform,
    formatFollowers,
    togglePrimary,
    handleAddAccount,
    reconnectAccount,
    deleteAccount,
    setShowSwitchModal,
  } = useSocialAccounts();
  
  const { layoutStyle, setLayoutStyle } = useLayoutStyle('current');
  const { platformExpanded, togglePlatformExpanded } = usePlatformExpanded();

  // UI 狀態（不屬於業務邏輯的 UI 狀態）
  const [activeTab, setActiveTab] = useState('social');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [settingsExpanded, setSettingsExpanded] = useState(true);

  // 構建表格數據（按平台分組）
  const tableData: Array<{ type: 'group' | 'account', platform?: Platform, account?: SocialAccount, isLastInGroup?: boolean, isLastOfAllGroups?: boolean }> = [];
  
  const platforms = ['twitter', 'linkedin', 'instagram'] as Platform[];
  platforms.forEach((platform, platformIndex) => {
    const platformAccounts = getAccountsByPlatform(platform);
    const isLastPlatform = platformIndex === platforms.length - 1;
    tableData.push({ type: 'group', platform });
    platformAccounts.forEach((account, index) => {
      const isLastInGroup = index === platformAccounts.length - 1;
      tableData.push({ 
        type: 'account', 
        account, 
        platform,
        isLastInGroup,
        isLastOfAllGroups: isLastPlatform && isLastInGroup
      });
    });
  });

  return (
    <div className={`flex min-h-screen ${
      layoutStyle === 'new' 
        ? 'bg-[#F5F7FA]' 
        : 'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100'
    }`}>
      {/* 左側導航欄 */}
      <aside className={`${
        layoutStyle === 'new'
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-lg'
      } flex flex-col transition-all duration-300 ${
        sidebarExpanded ? 'w-[240px]' : 'w-[72px]'
      }`}>
        {/* Logo 和切換按鈕 */}
        <div className="px-6 pt-6 pb-10">
          <div className={`flex items-center ${sidebarExpanded ? 'justify-between' : 'flex-col gap-4'}`}>
            {/* Logo */}
            <div className={`flex items-center ${sidebarExpanded ? '' : 'justify-center'}`}>
              {sidebarExpanded ? (
                <Image 
                  src="/images/logo.png" 
                  alt="Nitra Logo" 
                  width={100} 
                  height={24}
                  className="h-6 w-auto object-contain"
                  priority
                />
              ) : (
                <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/images/logo-icon.png" 
                    alt="Nitra" 
                    width={36} 
                    height={36}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              )}
            </div>
            
            {/* 開合按鈕 */}
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
              aria-label={sidebarExpanded ? "收起側邊欄" : "展開側邊欄"}
            >
              {sidebarExpanded ? (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* 導航項目 */}
        <nav className={`flex-1 ${sidebarExpanded ? 'px-3' : 'px-2'}`}>
          {sidebarExpanded && (
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Main Menu
            </div>
          )}
          <NavItem icon={LayoutDashboard} label="Dashboard" expanded={sidebarExpanded} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
          <NavItem icon={Calendar} label="Scheduled Posts" expanded={sidebarExpanded} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
          <NavItem icon={TrendingUp} label="Analytics" expanded={sidebarExpanded} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
          <NavItem icon={CreditCard} label="Payment" expanded={sidebarExpanded} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
          
          {/* Settings with sub-menu */}
          <div>
            <div 
              onClick={() => setSettingsExpanded(!settingsExpanded)}
              className="cursor-pointer"
            >
              <NavItem 
                icon={Settings} 
                label="Settings" 
                expanded={sidebarExpanded}
                hasSubmenu={true}
                submenuExpanded={settingsExpanded}
                strokeWidth={layoutStyle === 'new' ? 1.5 : 2}
                layoutStyle={layoutStyle}
              />
            </div>
            
            {settingsExpanded && sidebarExpanded && (
              <div className="mt-1 space-y-1">
                <NavItem icon={Users} label="Team" expanded={sidebarExpanded} isSubmenu={true} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
                <NavItem 
                  icon={Share2} 
                  label="Social Accounts" 
                  active={true}
                  expanded={sidebarExpanded} 
                  isSubmenu={true}
                  strokeWidth={layoutStyle === 'new' ? 1.5 : 2}
                  layoutStyle={layoutStyle}
                />
              </div>
            )}
          </div>
        </nav>
        
        {/* 底部區域 */}
        <div className={`${sidebarExpanded ? 'px-3' : 'px-2'} pb-4`}>
          {sidebarExpanded && (
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Others
            </div>
          )}
          <NavItem icon={Lock} label="Security" expanded={sidebarExpanded} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
          <NavItem icon={HelpCircle} label="Help" expanded={sidebarExpanded} strokeWidth={layoutStyle === 'new' ? 1.5 : 2} layoutStyle={layoutStyle} />
        </div>
      </aside>

      {/* 主要內容區 */}
      <div className={`flex-1 flex flex-col ${layoutStyle === 'new' ? '' : 'overflow-hidden'}`}>
        {/* 頂部導航條 */}
        <header className={`px-6 py-4 ${
          layoutStyle === 'new'
            ? 'bg-transparent'
            : 'bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            {/* 搜尋框 */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <label htmlFor="search" className="sr-only">搜尋帳號</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search accounts..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A929F]/30 focus:border-[#1A929F] transition-all duration-200 hover:border-gray-300"
                />
              </div>
            </div>
            
            {/* 右側工具列 */}
            <div className="flex items-center gap-3">
              <button 
                className="w-9 h-9 rounded-lg hover:bg-white/80 hover:backdrop-blur-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:shadow-sm"
                aria-label="通知"
              >
                <Bell className="w-4 h-4 text-gray-600 hover:text-[#1A929F] transition-colors duration-200" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200/60">
                <div className="w-8 h-8 rounded-full bg-[#1A929F]/10 border border-[#1A929F]/20 flex items-center justify-center text-xs font-semibold text-[#1A929F]">EH</div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-900">Echo H</div>
                  <div className="text-[10px] text-gray-500">Super admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* 白色卡片容器 - 僅在 new 版型時包裝主要內容 */}
        <main 
          className={`flex-1 flex flex-col overflow-hidden ${
            layoutStyle === 'new'
              ? 'bg-white rounded-[18px] mx-4 mt-0 mb-8'
              : ''
          }`}
          style={layoutStyle === 'new' ? {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.04), 0 0 20px rgba(0, 0, 0, 0.02)'
          } : undefined}
        >
        
        {/* 內容區域 */}
        <div className={`flex-1 overflow-auto px-10 ${layoutStyle === 'new' ? 'py-8' : 'py-6'}`}>
          <div className="max-w-[1400px] mx-auto">
            {/* 表格標題區 */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-xl font-bold text-gray-900">Social Account</h2>
                <span className="text-xs text-gray-400">5 connected accounts</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/80 rounded-lg hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-gray-700 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1A929F] to-[#1A929F] text-white rounded-lg transition-all duration-200 text-sm font-semibold cursor-pointer">
                  <Plus className="w-4 h-4" />
                  Add Account
                </button>
              </div>
            </div>

          {/* Grouped Table */}
          {layoutStyle === 'new' ? (
            <div>
              {/* Table Header - 獨立有圓角 */}
              <div className="grid grid-cols-12 gap-6 px-6 py-3 bg-gray-100/50 rounded-lg mb-3">
                <div className="col-span-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest pl-[30px]">Account</div>
                <div className="col-span-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Status / Last Synced</div>
                <div className="col-span-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Followers</div>
                <div className="col-span-2"></div>
              </div>
              
              {/* Table Body - 分組卡片 */}
              <div className="space-y-3">
              {(['twitter', 'linkedin', 'instagram'] as Platform[]).map((platform) => {
                const config = platformConfig[platform];
                const Icon = config.icon;
                const platformAccounts = getAccountsByPlatform(platform);
                const accountCount = platformAccounts.length;
                const expiredCount = platformAccounts.filter(acc => acc.status === 'expired').length;
                const maxCount = config.maxAccounts === Infinity ? '∞' : config.maxAccounts;
                
                return (
                  <div key={`platform-group-${platform}`} className="bg-gray-100/50 rounded-lg overflow-hidden">
                    {/* Platform Header */}
                    <GroupHeader
                      icon={Icon}
                      name={config.name}
                      color={config.color}
                      accountCount={accountCount}
                      maxAccounts={maxCount}
                      expiredCount={expiredCount}
                      onAddAccount={() => handleAddAccount(platform)}
                      expanded={platformExpanded[platform]}
                      onToggle={() => togglePlatformExpanded(platform)}
                      layoutStyle={layoutStyle}
                    />
                    
                    {/* Platform Accounts */}
                    {platformExpanded[platform] && (
                      <div className="pl-[46px] pr-3 pb-3 space-y-2">
                        {platformAccounts.map((account) => {
                          const instagramAccounts = getAccountsByPlatform('instagram');
                          return (
                            <AccountTableRow
                              key={account.id}
                              account={account}
                              platform={platform}
                              platformColor={config.color}
                              onTogglePrimary={togglePrimary}
                              singleInstagram={platform === 'instagram' && instagramAccounts.length === 1}
                              isLastInGroup={false}
                              isLastOfAllGroups={false}
                              layoutStyle={layoutStyle}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              </div>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-6 px-6 py-3 border-b border-gray-200 bg-[#EDF0F4]">
                <div className="col-span-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest pl-[22px]">Account</div>
                <div className="col-span-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Status / Last Synced</div>
                <div className="col-span-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Followers</div>
                <div className="col-span-2"></div>
              </div>

              {/* Table Body */}
              <div>
              {tableData.map((row, index) => {
                if (row.type === 'group' && row.platform) {
                  const config = platformConfig[row.platform];
                  const Icon = config.icon;
                  const platformAccounts = getAccountsByPlatform(row.platform);
                  const accountCount = platformAccounts.length;
                  const expiredCount = platformAccounts.filter(acc => acc.status === 'expired').length;
                  const maxCount = config.maxAccounts === Infinity ? '∞' : config.maxAccounts;
                  
                  return (
                    <GroupHeader
                      key={`group-${row.platform}`}
                      icon={Icon}
                      name={config.name}
                      color={config.color}
                      accountCount={accountCount}
                      maxAccounts={maxCount}
                      expiredCount={expiredCount}
                      onAddAccount={() => handleAddAccount(row.platform!)}
                      expanded={platformExpanded[row.platform!]}
                      onToggle={() => togglePlatformExpanded(row.platform!)}
                      layoutStyle={layoutStyle}
                    />
                  );
                }
                
                if (row.type === 'account' && row.account && platformExpanded[row.platform!]) {
                  const instagramAccounts = getAccountsByPlatform('instagram');
                  const config = platformConfig[row.platform!];
                  return (
                    <AccountTableRow
                      key={row.account.id}
                      account={row.account}
                      platform={row.platform!}
                      platformColor={config.color}
                      onTogglePrimary={togglePrimary}
                      singleInstagram={row.platform === 'instagram' && instagramAccounts.length === 1}
                      isLastInGroup={row.isLastInGroup || false}
                      isLastOfAllGroups={row.isLastOfAllGroups || false}
                      layoutStyle={layoutStyle}
                    />
                  );
                }
                
                return null;
              })}
              </div>
            </div>
          )}
          </div>
        </div>
        </main>
      </div>

      {/* Switch Account Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200/50 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Switch LinkedIn Account?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              You can only connect one LinkedIn company page at a time. To add a new account, you must remove the existing one first.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSwitchModal(false)}
                className="flex-1 px-5 py-3 bg-white/60 backdrop-blur-sm border-2 border-gray-200/80 rounded-xl hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-sm font-semibold text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Switching LinkedIn account');
                  setShowSwitchModal(false);
                }}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-[#1A929F] to-[#1A929F] text-white rounded-xl hover:shadow-xl hover:shadow-[#1A929F]/30 transition-all duration-200 text-sm font-bold shadow-lg cursor-pointer"
              >
                Switch Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layout Style Toggle Button */}
      <button
        onClick={() => setLayoutStyle(layoutStyle === 'current' ? 'new' : 'current')}
        className="fixed bottom-5 right-5 w-9 h-9 bg-gradient-to-br from-[#1A929F] to-[#168995] hover:from-[#168995] hover:to-[#147d89] rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer z-50 group flex items-center justify-center"
        title={`Switch to ${layoutStyle === 'current' ? 'new' : 'current'} layout`}
        aria-label="切換版型樣式"
      >
        <svg 
          className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-180" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <div className="absolute -top-9 right-0 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap">
          {layoutStyle === 'current' ? 'Switch to New' : 'Switch to Current'}
        </div>
      </button>
    </div>
  );
}

// 導航項目組件
function NavItem({ 
  icon: Icon, 
  label, 
  active = false, 
  expanded = true, 
  hasSubmenu = false, 
  submenuExpanded = false,
  isSubmenu = false,
  strokeWidth = 2,
  layoutStyle = 'current'
}: { 
  icon: any; 
  label: string; 
  active?: boolean; 
  expanded?: boolean;
  hasSubmenu?: boolean;
  submenuExpanded?: boolean;
  isSubmenu?: boolean;
  strokeWidth?: number;
  layoutStyle?: 'current' | 'new';
}) {
  const iconSize = layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-5 h-5';
  const iconColor = layoutStyle === 'new' && !active ? 'text-gray-500' : '';
  
  return (
    <div className="relative group">
      <button
        className={`w-full flex items-center gap-3 ${isSubmenu ? 'pl-11 pr-3 py-2' : 'px-3 py-2.5'} mb-1 rounded-lg transition-all duration-200 cursor-pointer ${
          active
            ? isSubmenu 
              ? 'bg-[#1A929F] text-white'
              : 'bg-gradient-to-r from-[#1A929F] to-[#1A929F] text-white'
            : isSubmenu
              ? 'text-gray-700 hover:bg-gray-100/80'
              : layoutStyle === 'new'
                ? 'text-gray-600 hover:bg-gray-100'
                : 'text-gray-700 hover:bg-gray-100'
        } ${expanded ? '' : 'justify-center'}`}
        title={!expanded ? label : undefined}
      >
        {!isSubmenu && <Icon className={`flex-shrink-0 ${iconSize} ${iconColor}`} strokeWidth={strokeWidth} />}
        {expanded && (
          <>
            <span className={`text-sm font-medium whitespace-nowrap flex-1 text-left ${isSubmenu ? 'text-xs' : ''}`}>{label}</span>
            {hasSubmenu && (
              submenuExpanded ? 
                <ChevronUp className="w-4 h-4" strokeWidth={strokeWidth} /> : 
                <ChevronDown className="w-4 h-4" strokeWidth={strokeWidth} />
            )}
          </>
        )}
      </button>
      
      {/* Tooltip 當收起時顯示 */}
      {!expanded && !isSubmenu && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
          {label}
        </div>
      )}
    </div>
  );
}

// Group Header 組件
function GroupHeader({
  icon: Icon,
  name,
  color,
  accountCount,
  maxAccounts,
  expiredCount,
  onAddAccount,
  expanded,
  onToggle,
  layoutStyle = 'current',
}: {
  icon: any;
  name: string;
  color: string;
  accountCount: number;
  maxAccounts: number | string;
  expiredCount: number;
  onAddAccount: () => void;
  expanded: boolean;
  onToggle: () => void;
  layoutStyle?: 'current' | 'new';
}) {
  return (
    <div className="relative">
      <div className={`grid grid-cols-12 gap-6 ${layoutStyle === 'new' ? 'px-3 py-3' : 'px-6 py-4'} ${layoutStyle === 'new' ? 'bg-transparent' : 'bg-white'}`}>
        <div className="col-span-4 flex items-center gap-2.5">
          {/* 展開/收起按鈕 */}
          <button
            onClick={onToggle}
            className={`${layoutStyle === 'new' ? 'w-6 h-6' : 'w-5 h-5'} flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer`}
          >
            {expanded ? (
              <ChevronDown className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'}`} />
            ) : (
              <ChevronRight className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'}`} />
            )}
          </button>
          
          <div className={`${layoutStyle === 'new' ? 'w-8 h-8' : 'w-7 h-7'} rounded-lg ${color === 'text-black' ? 'bg-gray-100 border border-gray-200' : color === 'text-[#0A66C2]' ? 'bg-blue-50 border border-blue-200' : 'bg-pink-50 border border-pink-200'} flex items-center justify-center`}>
            <Icon className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'} ${color}`} />
          </div>
          <div className="flex items-center gap-2.5">
            <span className={`${layoutStyle === 'new' ? 'text-base' : 'text-sm'} font-semibold text-gray-900`}>{name}</span>
            {expiredCount > 0 && (
              <div className={`flex items-center gap-1 ${layoutStyle === 'new' ? 'px-2.5 py-1' : 'px-2 py-0.5'} bg-orange-50 rounded-full`}>
                <AlertCircle className={`${layoutStyle === 'new' ? 'w-3.5 h-3.5' : 'w-3 h-3'} text-orange-600`} />
                <span className={`${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} font-medium text-orange-600`}>
                  {expiredCount} {expiredCount === 1 ? 'issue' : 'issues'} pending
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-8 flex items-center justify-end">
          <span className={`inline-flex items-center ${layoutStyle === 'new' ? 'px-3 py-1.5' : 'px-2.5 py-1'} bg-gray-100 rounded-md ${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} font-medium text-gray-600`}>
            {accountCount} / {maxAccounts} Connected
          </span>
        </div>
      </div>
    </div>
  );
}

// Account Table Row 組件
function AccountTableRow({
  account,
  platform,
  platformColor,
  onTogglePrimary,
  singleInstagram,
  isLastInGroup,
  isLastOfAllGroups,
  layoutStyle = 'current',
}: {
  account: SocialAccount;
  platform: Platform;
  platformColor: string;
  onTogglePrimary: (accountId: string) => void;
  singleInstagram: boolean;
  isLastInGroup: boolean;
  isLastOfAllGroups: boolean;
  layoutStyle?: 'current' | 'new';
}) {
  const isExpired = account.status === 'expired';
  
  return (
    <div className={`relative group ${isLastInGroup && !isLastOfAllGroups && layoutStyle !== 'new' ? 'border-b border-gray-200' : ''}`}>
      <div
        className={`relative grid grid-cols-12 gap-6 py-3 ${
          layoutStyle === 'new'
            ? isExpired
              ? 'bg-red-50 hover:bg-red-100/80 rounded-md border-2 border-red-200'
              : 'bg-white hover:bg-gray-50/50 rounded-md shadow-sm'
            : isExpired
              ? 'bg-red-50/40 bg-gray-50/80 hover:bg-gray-100/70'
              : 'bg-gray-50/80 hover:bg-gray-100/70'
        } transition-all duration-200 cursor-pointer ${isLastInGroup && layoutStyle !== 'new' ? 'pb-5' : ''}`}
      >
        {/* 垂直虛線 - 在最左側，1px 粗細 - 只在 current 版型顯示 */}
        {layoutStyle !== 'new' && (
          <div 
            className={`absolute left-[62px] top-0 border-l border-dashed border-gray-300 pointer-events-none ${
              isLastInGroup ? 'h-1/2' : 'bottom-0'
            }`}
          ></div>
        )}
        
        {/* L 形橫向虛線 - 只在最後一個子項目顯示 - 只在 current 版型顯示 */}
        {isLastInGroup && layoutStyle !== 'new' && (
          <div 
            className="absolute left-[62px] top-1/2 w-[8px] border-t border-dashed border-gray-300 pointer-events-none"
          ></div>
        )}
        
        {/* Account Column - 調整縮排 */}
        <div className={`col-span-4 flex items-center gap-2.5 ${layoutStyle === 'new' ? 'pl-5' : 'pl-[70px]'}`}>
          <div className={`${layoutStyle === 'new' ? 'w-8 h-8' : 'w-7 h-7'} rounded-full bg-gray-200 flex items-center justify-center ${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} font-semibold text-gray-700 flex-shrink-0`}>
            {account.accountName.substring(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-semibold text-gray-900 truncate group-hover:text-[#1A929F] transition-colors duration-200`}>{account.accountName}</div>
              {platform === 'instagram' && account.isPrimary && (
                <span className={`inline-flex items-center ${layoutStyle === 'new' ? 'px-2.5 py-0.5' : 'px-2 py-0'} rounded-full ${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} font-medium bg-[#1A929F] text-white flex-shrink-0`}>
                  Primary
                </span>
              )}
            </div>
            <div className={`${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} text-gray-500 truncate`}>{account.accountHandle}</div>
          </div>
        </div>

      {/* Status Column (含 Last Synced) */}
      <div className="col-span-3 flex flex-col gap-0.5 justify-center">
        <div className="flex items-center gap-2">
          {account.status === 'verified' ? (
            <>
              <div className={`${layoutStyle === 'new' ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full bg-emerald-600`}></div>
              <span className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-emerald-600`}>Connected</span>
            </>
          ) : (
            <>
              <div className={`${layoutStyle === 'new' ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full bg-red-600`}></div>
              <span className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-red-600`}>Expired</span>
            </>
          )}
        </div>
        {/* Last Synced 作為輔助資訊 */}
        <span className={`${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} text-gray-500`}>
          {account.lastSynced || '-'}
        </span>
      </div>

      {/* Followers Column */}
      <div className="col-span-3 flex items-center">
        <div className="flex items-center gap-1.5">
          <Users className={`${layoutStyle === 'new' ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-gray-400`} />
          <span className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-gray-900`}>
            {account.followers 
              ? account.followers >= 1000000 
                ? (account.followers / 1000000).toFixed(1) + 'M'
                : account.followers >= 1000 
                ? (account.followers / 1000).toFixed(1) + 'K'
                : account.followers.toLocaleString()
              : '-'}
          </span>
        </div>
      </div>

      {/* Actions Column */}
      <div className={`col-span-2 flex items-center justify-end gap-2 ${layoutStyle === 'new' ? 'pr-5' : 'pr-6'}`}>
        {account.status === 'expired' && (
          <button 
            className={`px-3 py-1.5 ${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5`}
            title="Reconnect account"
            aria-label="重新連接帳號"
          >
            <RefreshCw className={`${layoutStyle === 'new' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
            Reconnect
          </button>
        )}
        <button 
          className={`${layoutStyle === 'new' ? 'p-2' : 'p-1.5'} bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer border border-gray-200`}
          title="More"
          aria-label="更多選項"
        >
          <MoreHorizontal className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'} text-gray-600 hover:text-[#1A929F] transition-colors duration-200`} />
        </button>
      </div>
      </div>
    </div>
  );
}
