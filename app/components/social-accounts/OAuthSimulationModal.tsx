'use client';

import { SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Camera, Check } from 'lucide-react';

type OAuthPlatform = 'twitter' | 'linkedin' | 'instagram';

interface OAuthSimulationModalProps {
  isOpen: boolean;
  platform: OAuthPlatform | null;
  onAuthorize: () => void;
  onCancel: () => void;
}

function TwitterOAuthContent({ onAuthorize, onCancel }: { onAuthorize: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[340px] mx-auto">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
        <SiX className="w-7 h-7 text-black" />
      </div>
      <h2 className="text-h2 font-bold text-white text-center mb-2">Authorize Nitra to access your X account</h2>
      <p className="text-[15px] text-gray-400 text-center mb-6">
        This will allow Nitra to:
      </p>
      <ul className="w-full space-y-3 mb-6">
        {['Read your profile and tweets', 'Post tweets on your behalf', 'Access your followers and engagement data'].map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-300 text-body-base">
            <Check className="w-4 h-4 text-white flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="w-full space-y-3">
        <button
          onClick={(e) => { e.stopPropagation(); onAuthorize(); }}
          className="w-full py-3 px-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Authorize app
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onCancel(); }}
          className="w-full py-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-body-base"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function LinkedInOAuthContent({ onAuthorize, onCancel }: { onAuthorize: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col w-full max-w-[400px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-lg bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
          <SiLinkedin className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-h3 font-bold text-gray-900">Nitra</h2>
          <p className="text-body-base text-gray-500">wants to access your LinkedIn profile</p>
        </div>
      </div>
      <p className="text-body-base text-gray-600 mb-4">Nitra will be able to:</p>
      <ul className="space-y-3 mb-6">
        {['View your profile and account info', 'Post content on your behalf', 'Manage your company pages (if applicable)'].map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-700 text-body-base">
            <Check className="w-4 h-4 text-[#0A66C2] flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="flex gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); onCancel(); }}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onAuthorize(); }}
          className="flex-1 py-3 px-4 bg-[#0A66C2] text-white font-semibold rounded-full hover:bg-[#004182] transition-colors cursor-pointer"
        >
          Allow
        </button>
      </div>
    </div>
  );
}

function InstagramOAuthContent({ onAuthorize, onCancel }: { onAuthorize: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[360px] mx-auto">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{
        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
      }}>
        <Camera className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-h3 font-bold text-gray-900 text-center mb-1">Continue with Instagram</h2>
      <p className="text-body-base text-gray-600 text-center mb-6">
        Nitra would like to access your Instagram account to post content and view insights.
      </p>
      <ul className="w-full space-y-2.5 mb-6">
        {['View your profile and media', 'Create and manage posts', 'Access basic analytics'].map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-600 text-body-base">
            <Check className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="w-full space-y-2">
        <button
          onClick={(e) => { e.stopPropagation(); onAuthorize(); }}
          className="w-full py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer"
          style={{ background: 'linear-gradient(45deg, #f09433, #e6683c)' }}
        >
          <span className="text-white">Continue as Echo H</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onCancel(); }}
          className="w-full py-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-body-base"
        >
          Cancel
        </button>
      </div>
      <p className="text-detail text-gray-400 mt-6 text-center">
        By continuing, you agree to Nitra&apos;s Terms and Meta&apos;s Data Policy.
      </p>
    </div>
  );
}

export function OAuthSimulationModal(props: OAuthSimulationModalProps) {
  const { isOpen, platform, onAuthorize, onCancel } = props;

  if (!isOpen || !platform) return null;

  const handleAuthorize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onAuthorize();
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onCancel();
  };

  const renderContent = () => {
    const handlers = { onAuthorize: handleAuthorize, onCancel: handleCancel };
    switch (platform) {
      case 'twitter':
        return <TwitterOAuthContent {...handlers} />;
      case 'linkedin':
        return <LinkedInOAuthContent {...handlers} />;
      case 'instagram':
        return <InstagramOAuthContent {...handlers} />;
      default:
        return null;
    }
  };

  const isTwitter = platform === 'twitter';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${platform} authorization`}
    >
      {/* Backdrop - mimics OAuth being in a new window/overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleCancel}
        aria-hidden
      />
      {/* OAuth window - platform-specific styling */}
      <div
        className={`relative rounded-2xl shadow-2xl overflow-hidden w-[min(420px,92vw)] ${
          isTwitter
            ? 'bg-[#15202B] border border-gray-700/50'
            : 'bg-white border border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser chrome / header bar - mimics OAuth popup window */}
        <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${
          isTwitter ? 'border-gray-700/50 bg-black/30' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className={`flex-1 flex justify-center text-body-small ${isTwitter ? 'text-gray-500' : 'text-gray-400'}`}>
            {platform === 'twitter' && 'api.x.com'}
            {platform === 'linkedin' && 'www.linkedin.com'}
            {platform === 'instagram' && 'www.facebook.com'}
          </div>
        </div>
        {/* Content area */}
        <div className={`p-6 ${isTwitter ? 'py-8' : ''}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
