
import React from 'react';
import { ServiceItem } from '../types';
import { ArrowRight, Box, Anchor, Plane, FileText, TrendingUp, Archive } from 'lucide-react';

interface ServiceCardProps {
  item: ServiceItem;
  onClick?: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, onClick }) => {
  // Helper to get icon based on ID (since we don't have icon data in types yet)
  const getIcon = (id: string) => {
    switch(id) {
      case '1': return <Anchor className="w-6 h-6 text-blue-600" />;
      case '2': return <Plane className="w-6 h-6 text-cyan-600" />;
      case '3': return <TrendingUp className="w-6 h-6 text-indigo-600" />;
      case '4': return <FileText className="w-6 h-6 text-orange-600" />;
      case '5': return <Box className="w-6 h-6 text-green-600" />;
      case '6': return <Archive className="w-6 h-6 text-purple-600" />;
      default: return <Box className="w-6 h-6 text-blue-600" />;
    }
  };

  const getBgColor = (id: string) => {
    switch(id) {
        case '1': return 'bg-blue-50';
        case '2': return 'bg-cyan-50';
        case '3': return 'bg-indigo-50';
        case '4': return 'bg-orange-50';
        case '5': return 'bg-green-50';
        case '6': return 'bg-purple-50';
        default: return 'bg-blue-50';
    }
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.2)] transition-all duration-300 flex flex-col h-full border border-gray-100 group cursor-pointer"
      onClick={() => onClick && onClick(item.id)}
    >
      
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
            {/* Icon Box */}
            <div className={`w-12 h-12 rounded-lg ${getBgColor(item.id)} flex items-center justify-center transition-transform group-hover:scale-110`}>
                {getIcon(item.id)}
            </div>
            {/* Optional Image Thumbnail for context */}
            <div className="w-12 h-12 rounded-lg overflow-hidden opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
        </div>

        <h3 className="text-gray-800 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {item.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>

        {/* Fake Stat for Visual similarity to reference */}
        <div className="mt-4 flex items-center gap-2">
           <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Hoạt động
           </span>
           <span className="text-xs text-gray-400">Cập nhật 1p trước</span>
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="px-6 pb-6 pt-0">
        <button className="w-full py-2.5 rounded-lg border border-blue-200 text-blue-600 font-medium text-sm hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
           Chi tiết
           <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
