'use client';

import { useState, useRef, useCallback } from 'react';
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
import { NavItem } from './components/navigation/NavItem';
import { GroupHeader } from './components/social-accounts/GroupHeader';
import { AccountRow } from './components/social-accounts/AccountRow';
import { LayoutStyleToggle } from './components/social-accounts/LayoutStyleToggle';
import { AddAccountModal } from './components/social-accounts/AddAccountModal';
import { ConnectionLoadingOverlay } from './components/social-accounts/ConnectionLoadingOverlay';
import { Toast } from './components/social-accounts/Toast';
import { DisconnectConfirmationModal } from './components/social-accounts/DisconnectConfirmationModal';

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
    executeAddAccount,
    reconnectAccount,
    deleteAccount,
    setShowSwitchModal,
  } = useSocialAccounts();
  
  const { layoutStyle, setLayoutStyle } = useLayoutStyle('current');
  const { platformExpanded, togglePlatformExpanded, expandPlatform } = usePlatformExpanded();

  // UI 狀態（不屬於業務邏輯的 UI 狀態）
  const [activeTab, setActiveTab] = useState('social');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [settingsExpanded, setSettingsExpanded] = useState(true);

  // Add Account 流程狀態
  const [showAddModal, setShowAddModal] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<Platform | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [highlightedAccountId, setHighlightedAccountId] = useState<string | null>(null);
  const accountRowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Disconnect 確認 Modal
  const [accountToDisconnect, setAccountToDisconnect] = useState<SocialAccount | null>(null);

  const handleDisconnectConfirm = useCallback(() => {
    if (accountToDisconnect) {
      deleteAccount(accountToDisconnect.id);
      setAccountToDisconnect(null);
      setToastMessage('Account disconnected successfully.');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    }
  }, [accountToDisconnect, deleteAccount]);

  // 選擇平台後：模擬串聯 → 新增帳號 → 成功反饋
  const handleSelectPlatform = useCallback(async (platform: Platform) => {
    setShowAddModal(false);
    setConnectingPlatform(platform);
    await new Promise(r => setTimeout(r, 1800));
    const newAccount = await executeAddAccount(platform);
    setConnectingPlatform(null);
    expandPlatform(platform);
    setToastVisible(true);
    setToastMessage(`Successfully connected to ${platformConfig[platform].name}`);
    setHighlightedAccountId(newAccount.id);
    requestAnimationFrame(() => {
      accountRowRefs.current[newAccount.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    setTimeout(() => setHighlightedAccountId(null), 4500);
    setTimeout(() => setToastVisible(false), 4000);
  }, [executeAddAccount, expandPlatform]);

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
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1A929F] to-[#1A929F] text-white rounded-lg transition-all duration-200 text-sm font-semibold cursor-pointer hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  Add Account
                </button>
              </div>
            </div>

          {/* Grouped Table */}
          {layoutStyle === 'new' ? (
            <div>
              {/* Table Header - 獨立有圓角，對齊帳號列 */}
              <div className="grid grid-cols-12 gap-6 pl-[46px] pr-3 py-3 bg-gray-100/50 rounded-lg mb-3">
                <div className="col-span-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Account</div>
                <div className="col-span-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest pl-2">Status / Last Synced</div>
                <div className="col-span-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest pl-2">Followers</div>
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
                            <AccountRow
                              key={account.id}
                              ref={(el) => { accountRowRefs.current[account.id] = el; }}
                              account={account}
                              platform={platform}
                              platformColor={config.color}
                              onTogglePrimary={togglePrimary}
                              singleInstagram={platform === 'instagram' && instagramAccounts.length === 1}
                              isLastInGroup={false}
                              isLastOfAllGroups={false}
                              layoutStyle={layoutStyle}
                              isHighlighted={highlightedAccountId === account.id}
                              onDisconnectRequest={() => setAccountToDisconnect(account)}
                              onReconnect={async () => {
                                await reconnectAccount(account.id);
                                setToastMessage('Account reconnected successfully.');
                                setToastVisible(true);
                                setTimeout(() => setToastVisible(false), 4000);
                              }}
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
                    <AccountRow
                      key={row.account.id}
                      ref={(el) => { accountRowRefs.current[row.account!.id] = el; }}
                      account={row.account}
                      platform={row.platform!}
                      platformColor={config.color}
                      onTogglePrimary={togglePrimary}
                      singleInstagram={row.platform === 'instagram' && instagramAccounts.length === 1}
                      isLastInGroup={row.isLastInGroup || false}
                      isLastOfAllGroups={row.isLastOfAllGroups || false}
                      layoutStyle={layoutStyle}
                      isHighlighted={highlightedAccountId === row.account.id}
                      onDisconnectRequest={() => setAccountToDisconnect(row.account!)}
                      onReconnect={async () => {
                        await reconnectAccount(row.account!.id);
                        setToastMessage('Account reconnected successfully.');
                        setToastVisible(true);
                        setTimeout(() => setToastVisible(false), 4000);
                      }}
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

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSelectPlatform={handleSelectPlatform}
        linkedinCount={getAccountsByPlatform('linkedin').length}
        instagramCount={getAccountsByPlatform('instagram').length}
      />

      {/* Connection Loading Overlay */}
      <ConnectionLoadingOverlay isVisible={!!connectingPlatform} platform={connectingPlatform} />

      {/* Success Toast (新增帳號 / 解除連接) */}
      <Toast message={toastMessage} isVisible={toastVisible} />

      {/* Disconnect 確認 Modal */}
      <DisconnectConfirmationModal
        isOpen={!!accountToDisconnect}
        accountName={accountToDisconnect?.accountName}
        onConfirm={handleDisconnectConfirm}
        onCancel={() => setAccountToDisconnect(null)}
      />

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
      <LayoutStyleToggle 
        currentStyle={layoutStyle} 
        onToggle={() => setLayoutStyle(layoutStyle === 'current' ? 'new' : 'current')} 
      />
    </div>
  );
}
