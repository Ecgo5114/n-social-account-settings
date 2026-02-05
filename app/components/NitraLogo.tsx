export function NitraLogo({ className = "", collapsed = false }: { className?: string; collapsed?: boolean }) {
  if (collapsed) {
    // 收起時顯示簡化版圖標
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill="currentColor"
      >
        <path d="M20 20 L50 80 L50 20 Z M80 20 L80 80 L50 50 Z" />
      </svg>
    );
  }
  
  // 展開時顯示完整文字 Logo
  return (
    <svg 
      viewBox="0 0 400 100" 
      className={className}
      fill="currentColor"
    >
      {/* N */}
      <path d="M20 20 L20 80 L30 80 L30 40 L50 80 L60 80 L60 20 L50 20 L50 60 L30 20 Z" />
      {/* i */}
      <circle cx="85" cy="30" r="5" />
      <rect x="80" y="42" width="10" height="38" />
      {/* t */}
      <rect x="105" y="25" width="10" height="55" />
      <rect x="100" y="42" width="20" height="8" />
      {/* r */}
      <rect x="135" y="42" width="10" height="38" />
      <path d="M145 42 L145 50 Q145 42 155 42 L165 42" fill="none" stroke="currentColor" strokeWidth="10" />
      {/* a */}
      <circle cx="195" cy="61" r="19" fill="none" stroke="currentColor" strokeWidth="10" />
      <rect x="209" y="42" width="10" height="38" />
    </svg>
  );
}
