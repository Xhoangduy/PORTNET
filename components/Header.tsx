import React from 'react';
import { Bell, ChevronDown, User, Layers } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (viewId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gradient-to-r from-[#2c7be5] to-[#0f4c81] text-white shadow-md relative z-50">
      <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
        
        {/* Left: Brand / Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate?.('home')}
        >
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all border border-white/20">
            <Layers className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight leading-none text-white">
              PORTNET
            </h1>
            <span className="text-[10px] text-blue-100 font-light uppercase tracking-wider opacity-90">
              Nền tảng Cảng Biển Số Việt Nam
            </span>
          </div>
        </div>

        {/* Center: System Title (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-lg pointer-events-none">
          <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-sm whitespace-nowrap">
            Port Community System - PCS
          </h2>
          <p className="text-xs text-blue-200 italic font-light tracking-wide">
            “Kết nối quốc gia - liên thông toàn cầu”
          </p>
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center gap-4">
          
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0f4c81]"></span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full border border-white/20 shadow-sm">3</span>
          </button>

          {/* Language Selector */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
            <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border border-white/30 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-yellow-400 text-[10px]">★</span>
               </div>
            </div>
            <span className="text-sm font-medium">Tiếng Việt</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 bg-white/10 pl-2 pr-4 py-1.5 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
            <div className="w-7 h-7 bg-blue-500/50 rounded-full flex items-center justify-center border border-white/30 text-white">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-semibold leading-none">dev-admin</span>
            </div>
             <ChevronDown className="w-3 h-3 opacity-70 ml-1" />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;