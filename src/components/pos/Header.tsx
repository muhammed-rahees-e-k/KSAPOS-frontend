import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, Maximize, RefreshCcw, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

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

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 md:px-4 lg:px-8 z-30 sticky top-0 shadow-md transition-all text-slate-100">
      {/* Left: Logo & Menu */}
      <div className="flex items-center space-x-2 md:space-x-4 w-auto lg:w-1/4">
        <Button variant="ghost" size="icon" className="text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl h-10 w-10 transition-colors">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center select-none">
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
            KSA<span className="text-blue-500">POS</span>
          </h1>
        </div>
      </div>
      
      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl px-2 md:px-4 flex justify-center hidden sm:flex">
        <div className="relative w-full max-w-lg group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
          <Input 
            className="w-full bg-slate-800/80 border-transparent text-slate-100 focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all rounded-full pl-11 pr-12 h-11 text-[13px] font-semibold placeholder:text-slate-400 shadow-inner" 
            placeholder="Search products, orders, or customers..." 
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded bg-slate-700 px-1.5 font-mono text-[10px] font-medium text-slate-300 border-none">
              F3
            </kbd>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Icon */}
      <div className="flex sm:hidden flex-1 justify-end pr-2">
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl h-10 w-10">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center justify-end space-x-1 md:space-x-3 w-auto lg:w-1/4">
        <div className="hidden md:flex items-center space-x-1 border-r border-slate-700 pr-3 mr-1">
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl h-10 w-10 transition-all">
            <RefreshCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl h-10 w-10 transition-all" onClick={handleFullscreen}>
            <Maximize className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl h-10 w-10 relative transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
          </Button>
        </div>
        
        <Button variant="ghost" className="h-11 px-2 md:pl-2 md:pr-4 bg-transparent hover:bg-slate-800 rounded-xl transition-all border border-transparent">
          <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center md:mr-2 shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-[13px] font-bold leading-none mb-0.5 text-slate-100">M.Rahees</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </Button>
      </div>
    </header>
  );
};

