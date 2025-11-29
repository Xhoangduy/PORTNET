import React from 'react';
import { ServiceItem } from '../types';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  item: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors z-10" />
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-blue-900 mb-2 uppercase group-hover:text-cyan-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm flex-grow leading-relaxed">
          {item.description}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
          Xem chi tiết <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;