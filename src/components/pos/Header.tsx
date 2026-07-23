import React, { useState, useEffect } from 'react';
import { RefreshCcw, HelpCircle, Maximize, Menu, RotateCcw, Clock, LogOut, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { translations } from '@/utils/translations';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onReturnsClick?: () => void;
  onCloseShiftClick?: () => void;
  onHelpClick?: () => void;
  onSignOutClick?: () => void;
  language?: 'EN' | 'AR';
  onLanguageChange?: (lang: 'EN' | 'AR') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  onReturnsClick,
  onCloseShiftClick,
  onHelpClick,
  onSignOutClick,
  language: initialLanguage = 'EN',
  onLanguageChange,
}) => {
  const [time, setTime] = useState(new Date());
  const [language, setLanguage] = useState<'EN' | 'AR'>(initialLanguage);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const t = translations[language];

  return (
    <header className="h-13 bg-slate-900 border-b border-slate-800/90 flex items-center justify-between px-4 z-30 sticky top-0 shadow-md text-slate-100 select-none shrink-0">
      {/* Left Group: Brand Logo & Search Input */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="flex items-center space-x-2 shrink-0">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg h-8 w-8 p-0">
            <Menu className="w-4.5 h-4.5" />
          </Button>
          <span className="text-lg font-black tracking-tight text-white hidden sm:inline-block">
            KSA<span className="text-blue-500">POS</span>
          </span>
        </div>

        {/* Search Bar with barcode scanner icon and F3 badge */}
        <div className="relative w-64 sm:w-80 lg:w-96">
          <Input 
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-slate-800/90 border-slate-700/80 text-white focus:bg-slate-800 focus:border-blue-500 rounded-lg pl-3 pr-14 h-8.5 text-xs font-medium placeholder:text-slate-400 shadow-inner transition-all" 
            placeholder={t.searchPlaceholder} 
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1 pointer-events-none text-slate-400">
            <ScanLine className="w-3.5 h-3.5 text-blue-400" />
            <kbd className="hidden md:inline-block text-[9px] font-mono bg-slate-700 text-slate-300 px-1 py-0.2 rounded border border-slate-600">F3</kbd>
          </div>
        </div>
      </div>

      {/* Right Group: Neatly Spaced Toolbar Items */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 text-xs font-medium">
        
        {/* Terminal Station info badge */}
        <div className="hidden lg:flex items-center bg-slate-800/90 px-2.5 py-1 rounded-md text-slate-300 font-mono font-bold text-[11px] border border-slate-700/80 shadow-2xs">
          <span className="text-blue-400">{t.hq}</span>
          <span className="mx-1 text-slate-500">·</span>
          <span>{t.pos01}</span>
        </div>

        {/* Vertical Divider */}
        <div className="h-4 w-px bg-slate-800 hidden lg:block" />

        {/* Quick Action Link Buttons */}
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={onReturnsClick}
            className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.returns}</span>
          </button>

          <button 
            type="button"
            onClick={onCloseShiftClick}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-white font-semibold text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700/80 px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-2xs"
          >
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{t.closeShift}</span>
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        {/* Live Clock & Sync Indicator */}
        <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700/80 text-slate-200 font-bold font-mono text-xs shadow-2xs">
          <span className="relative flex h-2 w-2 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{formattedTime}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4.5 w-4.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-transform active:rotate-180 p-0"
            title="Sync Data"
          >
            <RefreshCcw className="w-3 h-3" />
          </Button>
        </div>

        {/* Vertical Divider */}
        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        {/* Utility Icon Buttons */}
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onHelpClick}
            className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors p-0 cursor-pointer"
            title="Help & Keyboard Shortcuts"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors p-0"
            onClick={handleFullscreen}
            title="Toggle Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Language Switcher AR / EN (Matching User Reference Image) */}
        <div className="flex items-center bg-[#111827] p-0.5 rounded-xl border border-slate-700/80 font-black text-xs shadow-inner select-none">
          <button 
            type="button"
            onClick={() => {
              setLanguage('AR');
              onLanguageChange?.('AR');
            }}
            className={`px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
              language === 'AR' 
                ? 'bg-[#2563EB] text-white font-extrabold shadow-md' 
                : 'text-slate-400 font-extrabold hover:text-slate-200'
            }`}
          >
            AR
          </button>
          <button 
            type="button"
            onClick={() => {
              setLanguage('EN');
              onLanguageChange?.('EN');
            }}
            className={`px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
              language === 'EN' 
                ? 'bg-[#2563EB] text-white font-extrabold shadow-md' 
                : 'text-slate-400 font-extrabold hover:text-slate-200'
            }`}
          >
            EN
          </button>
        </div>

        {/* Sign Out */}
        <button 
          type="button"
          onClick={onSignOutClick}
          className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 font-medium transition-colors cursor-pointer text-xs ml-0.5"
          title={t.signOut}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden xl:inline-block">{t.signOut}</span>
        </button>
      </div>
    </header>
  );
};





