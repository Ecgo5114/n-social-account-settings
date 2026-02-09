'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, ChevronDown, Users } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { colors, shadows } from '@/app/constants/design-tokens';
import type { LayoutStyle } from '@/app/types/social-accounts';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-h2 font-bold text-gray-900 border-b border-gray-200 pb-2 mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, hex, className }: { name: string; hex: string; className?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-24 h-24 rounded-lg border border-gray-200 shadow-sm ${className ?? ''}`}
        style={className ? undefined : { backgroundColor: hex }}
      />
      <div className="text-center">
        <div className="text-body-base font-medium text-gray-900">{name}</div>
        <div className="text-body-small text-gray-500 font-mono">{hex}</div>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<LayoutStyle>('current');
  const [modalDemo, setModalDemo] = useState<'none' | 'standard' | 'confirm' | 'oauth'>('none');

  const isNewTheme = theme === 'new';

  const platformColors: { name: string; hex: string }[] = [
    { name: 'Twitter / X', hex: '#000000' },
    { name: 'LinkedIn', hex: '#0A66C2' },
    { name: 'Instagram', hex: '#E4405F' },
    { name: 'YouTube', hex: '#FF0000' },
  ];

  return (
    <div
      className={`min-h-screen ${
        isNewTheme ? 'bg-nitra-bg-new' : 'bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 border-b ${
          isNewTheme ? 'bg-transparent border-gray-200/50' : 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to App
          </Link>
          <h1 className="text-h3 font-bold text-gray-900">Nitra Design System</h1>
          {/* Theme Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 border border-gray-200">
            <button
              type="button"
              onClick={() => setTheme('current')}
              className={`px-4 py-2 rounded-md text-body-base font-medium transition-all cursor-pointer block ${
                theme === 'current' ? 'bg-nitra-primary text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Current Theme
            </button>
            <button
              type="button"
              onClick={() => setTheme('new')}
              className={`px-4 py-2 rounded-md text-body-base font-medium transition-all cursor-pointer block ${
                theme === 'new' ? 'bg-nitra-primary text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              New Theme
            </button>
          </div>
        </div>
      </header>

      <main
        className={`max-w-6xl mx-auto px-6 py-12 transition-all duration-300 ${
          isNewTheme ? 'ml-4 mr-4 mt-4 mb-8 bg-white rounded-[18px]' : ''
        }`}
        style={isNewTheme ? { boxShadow: shadows.cardNew } : undefined}
      >
        {/* ─── 1. Color Palette ─── */}
        <Section title="1. Color Palette">
          <div className="mb-10">
            <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-4">Brand / Primary (共用)</h3>
            <div className="flex flex-wrap gap-8">
              <Swatch name="Primary" hex={colors.primary} />
              <Swatch name="Primary Dark" hex={colors.primaryDark} />
              <Swatch name="Highlight BG" hex={colors.highlightBg} />
              <Swatch name="Highlight Border" hex={colors.highlightBorder} />
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-4">
              Surfaces — {isNewTheme ? 'New Theme' : 'Current Theme'}
            </h3>
            <div className="flex flex-wrap gap-8">
              {isNewTheme ? (
                <>
                  <Swatch name="Page BG" hex={colors.bgNewTheme} />
                  <Swatch name="Card BG" hex="#FFFFFF" />
                  <Swatch name="Row Hover (New theme)" hex="#85bac01a" />
                  <Swatch name="Group BG" hex="#f3f4f6" />
                </>
              ) : (
                <>
                  <Swatch name="Page BG" hex="#f8fafc" />
                  <Swatch name="Table Header" hex={colors.tableHeader} />
                  <Swatch name="Row Hover" hex={colors.rowHoverCurrent} />
                  <Swatch name="Sidebar" hex="rgba(255,255,255,0.8)" />
                </>
              )}
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-4">Semantic</h3>
            <div className="flex flex-wrap gap-8">
              <Swatch name="Success" hex={colors.success} />
              <Swatch name="Error" hex={colors.error} />
              <Swatch name="Warning" hex={colors.warning} />
            </div>
          </div>
          <div>
            <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-4">Platform Brand Colors</h3>
            <div className="flex flex-wrap gap-8">
              {platformColors.map((p) => (
                <Swatch key={p.name} name={p.name} hex={p.hex} />
              ))}
            </div>
          </div>
        </Section>

        {/* ─── 2. Button Variants ─── */}
        <Section title={`2. Button Variants — ${isNewTheme ? 'New Theme' : 'Current Theme'}`}>
          <div className="space-y-6">
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Primary</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  className={`px-4 py-2 rounded-lg text-body-base font-bold transition-all cursor-pointer ${
                    isNewTheme
                      ? 'bg-nitra-primary text-white hover:opacity-90'
                      : 'bg-nitra-primary text-white hover:opacity-90'
                  }`}
                >
                  Default
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-body-base font-bold opacity-90 cursor-pointer ${
                    isNewTheme ? 'bg-nitra-primary text-white' : 'bg-nitra-primary text-white'
                  }`}
                >
                  Hover
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-body-base font-bold opacity-70 cursor-not-allowed ${
                    isNewTheme ? 'bg-nitra-primary text-white' : 'bg-nitra-primary text-white'
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Secondary / Outline</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  className={`px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-body-base font-bold transition-all cursor-pointer ${
                    isNewTheme ? 'bg-white hover:bg-gray-50' : 'bg-white/80 backdrop-blur-sm hover:bg-white/90'
                  }`}
                >
                  Default
                </button>
                <button className="px-4 py-2 bg-white border border-nitra-primary text-nitra-primary rounded-lg text-body-base font-bold hover:bg-nitra-primary/5 transition-all cursor-pointer">
                  Primary Outline
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Ghost</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-transparent text-gray-700 rounded-lg text-body-base font-medium hover:bg-gray-100 transition-all cursor-pointer">
                  Default
                </button>
                <button className="px-2 py-1.5 bg-transparent text-gray-600 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                  Icon Button
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Destructive</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-body-base font-bold hover:bg-red-700 transition-all cursor-pointer">
                  Disconnect
                </button>
                <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-body-base font-bold hover:bg-red-50 transition-all cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── 3. Badge Variants ─── */}
        <Section title="3. Badge Variants">
          <div className="space-y-6">
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Status</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-body-small font-medium bg-nitra-primary text-white">
                  Primary
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-body-small font-medium bg-nitra-success-bg text-nitra-success border border-nitra-success/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-body-small font-medium bg-red-50 text-red-600 border border-red-200">
                  <XCircle className="w-3.5 h-3.5" /> Expired
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-body-small font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Warning
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Platform / Count</h3>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-detail font-medium bg-gray-100 text-gray-600">
                  2 / ∞ Connected
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-detail font-medium bg-gray-200 text-gray-500">
                  Maximum reached
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── 4. Table Component ─── */}
        <Section title={`4. Table Component — ${isNewTheme ? 'New Theme' : 'Current Theme'}`}>
          <div className="space-y-6">
            <p className="text-body-base text-gray-500">
              {isNewTheme
                ? 'New theme：獨立表頭、平台群組卡片 (bg-gray-100/50)、帳號列白底、hover teal tint、無虛線樹狀線'
                : 'Current theme：毛玻璃容器、標頭 nitra-table-header、平台群組展開/收起、帳號列 hover nitra-row-hover、虛線樹狀結構'}
            </p>

            {/* Table Header */}
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Table Header</h3>
              <div
                className={`grid grid-cols-12 gap-6 py-3 ${
                  isNewTheme
                    ? 'pl-[46px] pr-3 bg-gray-100/50 rounded-lg'
                    : 'px-6 bg-nitra-table-header border-b border-gray-200'
                } ${!isNewTheme ? 'rounded-t-lg' : ''}`}
              >
                <div className="col-span-4 text-detail font-bold text-gray-500 uppercase tracking-widest">
                  Account
                </div>
                <div className={`col-span-3 text-detail font-bold text-gray-500 uppercase tracking-widest ${isNewTheme ? 'pl-2' : ''}`}>
                  Status / Last Synced
                </div>
                <div className={`col-span-3 text-detail font-bold text-gray-500 uppercase tracking-widest ${isNewTheme ? 'pl-2' : ''}`}>
                  Followers
                </div>
                <div className="col-span-2" />
              </div>
            </div>

            {/* Platform Group */}
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Platform Group (GroupHeader)</h3>
              <div
                className={`overflow-hidden ${
                  isNewTheme ? 'bg-gray-100/50 rounded-lg' : 'bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-lg'
                }`}
              >
                <div className={`grid grid-cols-12 gap-6 ${isNewTheme ? 'px-3 py-3 bg-transparent' : 'px-6 py-4 bg-white'} items-center`}>
                  <div className="col-span-12 flex items-center gap-2.5">
                    <button className={`${isNewTheme ? 'w-6 h-6' : 'w-5 h-5'} flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer`}>
                      <ChevronDown className={isNewTheme ? 'w-[18px] h-[18px]' : 'w-4 h-4'} />
                    </button>
                    <div className={`${isNewTheme ? 'w-8 h-8' : 'w-7 h-7'} rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center`}>
                      <SiLinkedin className={`${isNewTheme ? 'w-[18px] h-[18px]' : 'w-4 h-4'} text-[#0A66C2]`} />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-body-base font-bold text-gray-900">LinkedIn</span>
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-detail font-medium text-gray-600 ${
                        isNewTheme ? 'bg-gray-200' : 'bg-gray-100'
                      }`}>
                        1 / 1 Connected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row States */}
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Row States</h3>
              <div className={`space-y-2 ${isNewTheme ? '' : 'p-4'}`}>
                {[
                  { label: 'Default', rowClass: isNewTheme ? 'bg-white' : 'bg-gray-50/80' },
                  { label: 'Hover', rowClass: isNewTheme ? 'bg-nitra-primary-tint' : 'bg-nitra-row-hover' },
                  { label: 'Highlighted', rowClass: 'bg-nitra-highlight-bg border border-nitra-highlight-border' },
                ].map(({ label, rowClass }) => (
                  <div key={label} className="flex items-center gap-4 mb-2">
                    <span className="w-24 text-body-small text-gray-500">{label}</span>
                    <div
                      className={`flex-1 grid grid-cols-12 gap-6 py-3 ${isNewTheme ? 'pl-[46px] pr-3 rounded-md' : 'px-6'} ${rowClass}`}
                    >
                      <div className="col-span-4 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-body-small font-bold ${
                          rowClass.includes('Highlighted') ? 'bg-nitra-primary/10 text-nitra-primary' : 'bg-gray-200 text-gray-600'
                        }`}>
                          TC
                        </div>
                        <div>
                          <div className="text-body-base font-medium text-gray-900">TechCorp Official</div>
                          <div className="text-body-small text-gray-400">@techcorp</div>
                        </div>
                      </div>
                      <div className="col-span-3 flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-nitra-success" />
                          <span className="text-body-base font-medium text-nitra-success">Connected</span>
                        </div>
                        <span className="text-body-small text-gray-400">Just now</span>
                      </div>
                      <div className="col-span-3 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-body-base font-medium text-gray-900">125.4K</span>
                      </div>
                      <div className="col-span-2" />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-24 text-body-small text-gray-500">Expired</span>
                  <div
                    className={`flex-1 grid grid-cols-12 gap-6 py-3 ${isNewTheme ? 'pl-[46px] pr-3 rounded-md bg-white' : 'px-6 bg-gray-50/80'}`}
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-body-small font-bold text-gray-600">TC</div>
                      <div>
                        <div className="text-body-base font-medium text-gray-900">TechCorp Careers</div>
                        <div className="text-body-small text-gray-400">@techcorp.careers</div>
                      </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-body-base font-medium text-red-600">Expired</span>
                      </div>
                      <span className="text-body-small text-gray-400">2 hours ago</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <button className="px-3 py-1.5 text-body-small font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer">
                        Reconnect
                      </button>
                    </div>
                    <div className="col-span-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Full Table Preview */}
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Full Table Preview</h3>
              <div
                className={`overflow-hidden ${
                  isNewTheme ? 'space-y-3' : 'bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-lg'
                }`}
              >
                {!isNewTheme && (
                  <div className="grid grid-cols-12 gap-6 px-6 py-3 bg-nitra-table-header border-b border-gray-200">
                    <div className="col-span-4 text-detail font-bold text-gray-500 uppercase tracking-widest pl-[22px]">Account</div>
                    <div className="col-span-3 text-detail font-bold text-gray-500 uppercase tracking-widest">Status / Last Synced</div>
                    <div className="col-span-3 text-detail font-bold text-gray-500 uppercase tracking-widest">Followers</div>
                    <div className="col-span-2" />
                  </div>
                )}
                {isNewTheme && (
                  <div className="grid grid-cols-12 gap-6 pl-[46px] pr-3 py-3 bg-gray-100/50 rounded-lg mb-3">
                    <div className="col-span-4 text-detail font-bold text-gray-500 uppercase tracking-widest">Account</div>
                    <div className="col-span-3 text-detail font-bold text-gray-500 uppercase tracking-widest pl-2">Status / Last Synced</div>
                    <div className="col-span-3 text-detail font-bold text-gray-500 uppercase tracking-widest pl-2">Followers</div>
                    <div className="col-span-2" />
                  </div>
                )}
                <div className={isNewTheme ? 'bg-gray-100/50 rounded-lg overflow-hidden' : ''}>
                  <div className={`grid grid-cols-12 gap-6 px-6 py-3 border-b border-gray-200 ${isNewTheme ? 'pl-[46px] pr-3 border-0' : ''} ${isNewTheme ? 'bg-white hover:bg-nitra-primary-tint' : 'bg-gray-50/80 hover:bg-nitra-row-hover'} transition-colors cursor-pointer`}>
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-nitra-primary/10 text-nitra-primary flex items-center justify-center text-body-small font-bold">TC</div>
                      <div>
                        <div className="text-body-base font-medium text-gray-900">TechCorp Official</div>
                        <div className="text-body-small text-gray-400">@techcorp</div>
                      </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-nitra-success" />
                        <span className="text-body-base font-medium text-nitra-success">Connected</span>
                      </div>
                      <span className="text-body-small text-gray-400">Just now</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-body-base font-medium text-gray-900">125.4K</span>
                    </div>
                    <div className="col-span-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── 5. Modal Variants ─── */}
        <Section title="5. Modal Variants">
          <p className="text-body-base text-gray-500 mb-4">點擊按鈕預覽 Modal 樣式</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setModalDemo('standard')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-body-base font-medium hover:bg-gray-300 cursor-pointer"
            >
              Standard Modal
            </button>
            <button
              onClick={() => setModalDemo('confirm')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-body-base font-medium hover:bg-gray-300 cursor-pointer"
            >
              Confirm Modal
            </button>
            <button
              onClick={() => setModalDemo('oauth')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-body-base font-medium hover:bg-gray-300 cursor-pointer"
            >
              OAuth-style Modal
            </button>
          </div>
          {/* Modal preview cards (static) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border-2 border-gray-200 p-4 bg-white">
              <h4 className="text-body-base font-bold text-gray-700 mb-2">Standard (Add Account)</h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between mb-4">
                  <span className="text-body-base font-bold">Choose Platform</span>
                  <span className="text-body-small text-gray-400">×</span>
                </div>
                <div className="text-body-small text-gray-500 mb-4">Connect your social media accounts...</div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-lg border border-gray-200 bg-white" />
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-xl border-2 border-gray-200 p-4 bg-white">
              <h4 className="text-body-base font-bold text-gray-700 mb-2">Confirm (Disconnect)</h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-body-base font-bold mb-2">Disconnect LinkedIn?</div>
                <div className="flex gap-2 mb-4 text-body-small">Account info...</div>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 rounded-lg bg-gray-200" />
                  <div className="flex-1 h-8 rounded-lg bg-red-100" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border-2 border-gray-200 p-4 bg-white">
              <h4 className="text-body-base font-bold text-gray-700 mb-2">OAuth (Dark variant)</h4>
              <div className="rounded-lg overflow-hidden border border-gray-700" style={{ backgroundColor: '#15202B' }}>
                <div className="px-3 py-2 border-b border-gray-700/50 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
                <div className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-white mx-auto mb-2" />
                  <div className="text-white text-body-base font-bold">Authorize Nitra</div>
                  <div className="h-8 mt-2 rounded-full bg-white/20 w-full" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── 6. Typography ─── */}
        <Section title="6. Typography">
          <div className="space-y-6">
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Headings</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-h1 font-bold text-gray-900">Heading 1 — h1 24/32</div>
                  <div className="text-body-small text-gray-400 font-mono mt-0.5">text-h1 font-bold</div>
                </div>
                <div>
                  <div className="text-h2 font-bold text-gray-900">Heading 2 — h2 20/28</div>
                  <div className="text-body-small text-gray-400 font-mono mt-0.5">text-h2 font-bold</div>
                </div>
                <div>
                  <div className="text-h3 font-bold text-gray-900">Heading 3 — h3 18/28</div>
                  <div className="text-body-small text-gray-400 font-mono mt-0.5">text-h3 font-bold</div>
                </div>
                <div>
                  <div className="text-h4 font-bold text-gray-900">Heading 4 — 14px / Bold</div>
                  <div className="text-body-small text-gray-400 font-mono mt-0.5">text-h4 font-bold</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Body</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-body-base text-gray-900">Body — body-base / Regular. Connect your social media accounts to automate content publishing.</div>
                  <div className="text-body-small text-gray-400 font-mono mt-0.5">text-body-base</div>
                </div>
                <div>
                  <div className="text-body-small text-gray-500">Caption — body-small / Muted. 5 connected accounts • Last synced Just now</div>
                  <div className="text-body-small text-gray-400 font-mono mt-0.5">text-body-small text-gray-500</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-body-base font-bold text-gray-500 uppercase tracking-wider mb-3">Labels</h3>
              <div className="flex flex-wrap gap-4">
                <span className="text-detail font-bold text-gray-500 uppercase tracking-widest">ACCOUNT</span>
                <span className="text-detail font-bold text-gray-500 uppercase tracking-widest">STATUS / LAST SYNCED</span>
                <span className="text-detail font-bold text-gray-500 uppercase tracking-widest">FOLLOWERS</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── 7. Radius, Spacing, Shadows ─── */}
        <Section title="7. Border Radius">
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-md bg-nitra-primary" />
              <div className="text-body-small font-mono text-gray-500">rounded-md (0.375rem)</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-lg bg-nitra-primary" />
              <div className="text-body-small font-mono text-gray-500">rounded-lg (0.5rem)</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-xl bg-nitra-primary" />
              <div className="text-body-small font-mono text-gray-500">rounded-xl (0.75rem)</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl bg-nitra-primary" />
              <div className="text-body-small font-mono text-gray-500">rounded-2xl (1rem)</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-[18px] bg-nitra-primary" />
              <div className="text-body-small font-mono text-gray-500">rounded-[18px] (Card)</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-nitra-primary" />
              <div className="text-body-small font-mono text-gray-500">rounded-full</div>
            </div>
          </div>
        </Section>

        <Section title="8. Spacing">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 text-body-small font-mono text-gray-500">p-2 (8px)</div>
              <div className="h-8 rounded bg-gray-200" style={{ padding: 8 }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-body-small font-mono text-gray-500">p-3 (12px)</div>
              <div className="h-8 rounded bg-gray-200" style={{ padding: 12 }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-body-small font-mono text-gray-500">p-4 (16px)</div>
              <div className="h-8 rounded bg-gray-200" style={{ padding: 16 }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-body-small font-mono text-gray-500">p-6 (24px)</div>
              <div className="h-8 rounded bg-gray-200" style={{ padding: 24 }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-body-small font-mono text-gray-500">gap-4 (16px)</div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded bg-nitra-primary" />
                <div className="w-8 h-8 rounded bg-nitra-primary" />
                <div className="w-8 h-8 rounded bg-nitra-primary" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="9. Shadows">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="text-body-base font-bold text-gray-900 mb-1">shadow-sm</div>
              <div className="text-body-small text-gray-500">Subtle elevation</div>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
              <div className="text-body-base font-bold text-gray-900 mb-1">shadow-md</div>
              <div className="text-body-small text-gray-500">Cards, dropdowns</div>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-100">
              <div className="text-body-base font-bold text-gray-900 mb-1">shadow-lg</div>
              <div className="text-body-small text-gray-500">Modals, overlays</div>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-2xl border border-gray-100">
              <div className="text-body-base font-bold text-gray-900 mb-1">shadow-2xl</div>
              <div className="text-body-small text-gray-500">Modal dialogs</div>
            </div>
            <div
              className="p-6 rounded-xl bg-white col-span-2"
              style={{ boxShadow: shadows.cardNew }}
            >
              <div className="text-body-base font-bold text-gray-900 mb-1">shadow-nitra-card</div>
              <div className="text-body-small text-gray-500">New theme main content card</div>
            </div>
          </div>
        </Section>
      </main>

      {/* Modal Demo Overlay */}
      {modalDemo !== 'none' && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setModalDemo('none')}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-h3 font-bold text-gray-900">
                {modalDemo === 'standard' && 'Choose Platform'}
                {modalDemo === 'confirm' && 'Disconnect account?'}
                {modalDemo === 'oauth' && 'Authorize Nitra'}
              </h3>
              <button
                onClick={() => setModalDemo('none')}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500"
              >
                ×
              </button>
            </div>
            <p className="text-body-base text-gray-600 mb-6">
              {modalDemo === 'standard' && 'Connect your social media accounts to automate content publishing.'}
              {modalDemo === 'confirm' && 'This will disconnect the account and stop syncing. Scheduled posts will be affected.'}
              {modalDemo === 'oauth' && 'Nitra would like to access your account to post content and view insights.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModalDemo('none')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-body-base font-bold hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalDemo('none')}
                className={`flex-1 px-4 py-2 rounded-lg text-body-base font-bold cursor-pointer ${
                  modalDemo === 'confirm' ? 'bg-nitra-error hover:bg-red-700 text-white' : 'bg-nitra-primary hover:opacity-90 text-white'
                }`}
              >
                {modalDemo === 'confirm' ? 'Disconnect' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
