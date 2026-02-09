// 主題配置系統
export type ThemeName = 'glassmorphism' | 'minimalism' | 'soft-ui';

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  background: string;
  sidebar: {
    bg: string;
    border: string;
    shadow: string;
  };
  header: {
    bg: string;
    border: string;
    shadow: string;
  };
  nav: {
    active: string;
    inactive: string;
    hover: string;
  };
  card: {
    bg: string;
    border: string;
    shadow: string;
    hover: string;
  };
  button: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    shadow: string;
  };
  badge: {
    verified: string;
    expired: string;
    primary: string;
  };
  search: {
    bg: string;
    border: string;
    focus: string;
    shadow: string;
  };
  font: {
    family: string;
    import: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transition: string;
}

// Glassmorphism 主題（現有版本）
export const glassmorphismTheme: Theme = {
  name: 'glassmorphism',
  displayName: 'Glassmorphism',
  description: '毛玻璃效果',
  background: 'bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100',
  sidebar: {
    bg: 'bg-white/80 backdrop-blur-xl',
    border: 'border-gray-200/50',
    shadow: 'shadow-lg',
  },
  header: {
    bg: 'bg-white/80 backdrop-blur-xl',
    border: 'border-gray-200/50',
    shadow: 'shadow-sm',
  },
  nav: {
    active: 'bg-gradient-to-r from-[#1A4D3E] to-[#2D5F4F] text-white shadow-md',
    inactive: 'text-gray-600 hover:bg-gray-100/80',
    hover: 'hover:bg-gray-100/80',
  },
  card: {
    bg: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100',
    border: 'border border-gray-200/60',
    shadow: 'shadow-sm backdrop-blur-sm',
    hover: 'hover:bg-gray-50/50',
  },
  button: {
    primary: 'bg-gradient-to-r from-[#1A4D3E] to-[#2D5F4F] text-white',
    primaryHover: 'hover:from-[#153d32] hover:to-[#244c3f]',
    secondary: 'bg-white/80 backdrop-blur-sm',
    secondaryHover: 'hover:bg-white/90',
    shadow: 'shadow-lg shadow-[#1A4D3E]/20',
  },
  badge: {
    verified: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200/60 backdrop-blur-sm',
    expired: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200/60 backdrop-blur-sm',
    primary: 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 text-amber-700 border border-amber-200/60 backdrop-blur-sm',
  },
  search: {
    bg: 'bg-white/80 backdrop-blur-sm',
    border: 'border-gray-200/60',
    focus: 'focus:border-[#1A4D3E] focus:ring-2 focus:ring-[#1A4D3E]/20',
    shadow: 'shadow-sm',
  },
  font: {
    family: 'font-sans',
    import: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap",
  },
  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
  },
  transition: 'transition-all duration-200',
};

// Minimalism & Swiss Style 主題
export const minimalismTheme: Theme = {
  name: 'minimalism',
  displayName: 'Minimalism',
  description: '極簡瑞士風格',
  background: 'bg-white',
  sidebar: {
    bg: 'bg-white',
    border: 'border-black',
    shadow: '',
  },
  header: {
    bg: 'bg-white',
    border: 'border-black',
    shadow: '',
  },
  nav: {
    active: 'bg-black text-white',
    inactive: 'text-gray-900 hover:bg-gray-100',
    hover: 'hover:bg-gray-100',
  },
  card: {
    bg: 'bg-white',
    border: 'border border-gray-300',
    shadow: '',
    hover: 'hover:bg-gray-50',
  },
  button: {
    primary: 'bg-black text-white',
    primaryHover: 'hover:bg-gray-800',
    secondary: 'bg-white border-2 border-black',
    secondaryHover: 'hover:bg-gray-50',
    shadow: '',
  },
  badge: {
    verified: 'bg-black text-white',
    expired: 'bg-red-600 text-white',
    primary: 'bg-black text-white',
  },
  search: {
    bg: 'bg-white',
    border: 'border-2 border-gray-300',
    focus: 'focus:border-black',
    shadow: '',
  },
  font: {
    family: 'font-sans',
    import: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap",
  },
  borderRadius: {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  },
  transition: 'transition-all duration-150',
};

// Soft UI Evolution 主題（新擬態改良版）
export const softUITheme: Theme = {
  name: 'soft-ui',
  displayName: 'Soft UI',
  description: '柔和新擬態',
  background: 'bg-[#f0f4f8]',
  sidebar: {
    bg: 'bg-[#f0f4f8]',
    border: 'border-transparent',
    shadow: 'shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]',
  },
  header: {
    bg: 'bg-[#f0f4f8]',
    border: 'border-transparent',
    shadow: 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
  },
  nav: {
    active: 'bg-gradient-to-br from-[#1A4D3E] to-[#2D5F4F] text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]',
    inactive: 'text-gray-700 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]',
    hover: 'hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]',
  },
  card: {
    bg: 'bg-[#f0f4f8]',
    border: 'border-transparent',
    shadow: 'shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]',
    hover: 'hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1)]',
  },
  button: {
    primary: 'bg-gradient-to-br from-[#1A4D3E] to-[#2D5F4F] text-white',
    primaryHover: 'hover:shadow-xl',
    secondary: 'bg-[#f0f4f8]',
    secondaryHover: 'hover:bg-white',
    shadow: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.1)]',
  },
  badge: {
    verified: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    expired: 'bg-red-100 text-red-700 border border-red-200',
    primary: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
  search: {
    bg: 'bg-[#f0f4f8]',
    border: 'border-transparent',
    focus: 'focus:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]',
    shadow: 'shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]',
  },
  font: {
    family: 'font-sans',
    import: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap",
  },
  borderRadius: {
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    xl: 'rounded-[2rem]',
  },
  transition: 'transition-all duration-300',
};

// 主題集合
export const themes: Record<ThemeName, Theme> = {
  'glassmorphism': glassmorphismTheme,
  'minimalism': minimalismTheme,
  'soft-ui': softUITheme,
};
