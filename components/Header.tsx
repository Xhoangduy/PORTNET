import React from 'react';
import { Anchor, Globe, Menu } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (viewId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gradient-to-r from-cyan-600 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <div 
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => onNavigate?.('home')}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <Anchor className="text-blue-800 w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight uppercase leading-none">
              Portnet
            </h1>
            <span className="text-xs md:text-sm text-cyan-100 font-light uppercase tracking-wider">
              Cộng đồng doanh nghiệp cảng Việt Nam
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-1 cursor-pointer hover:text-cyan-200 transition-colors">
            <span className="font-semibold">VN</span>
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-yellow-400">
               <span className="text-yellow-400 text-[10px] leading-none">★</span>
            </div>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;