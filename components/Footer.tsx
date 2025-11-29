import React from 'react';
import { Phone, Facebook, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* App Downloads */}
          <div className="flex gap-6">
            <div className="flex items-center gap-3 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PortnetClient" alt="QR Client" className="w-16 h-16 bg-white rounded p-1" />
              <div className="flex flex-col text-xs text-gray-300 gap-1">
                <span className="text-cyan-400 font-bold mb-1">Ứng dụng Khách hàng</span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1"> App Store</span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">🤖 Google Play</span>
              </div>
            </div>
            
             <div className="flex items-center gap-3 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PortnetDriver" alt="QR Driver" className="w-16 h-16 bg-white rounded p-1" />
              <div className="flex flex-col text-xs text-gray-300 gap-1">
                <span className="text-cyan-400 font-bold mb-1">Ứng dụng Vận tải</span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1"> App Store</span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">🤖 Google Play</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="text-center md:text-right text-sm text-gray-400 space-y-1">
             <h4 className="font-bold text-white text-lg mb-2">PORTNET TECHNOLOGY JSC</h4>
             <p>Kết nối doanh nghiệp cảng</p>
             <p>DUNS: 626110364</p>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end">
             <span className="text-sm font-semibold mb-3 uppercase tracking-widest text-gray-400">Kết nối với chúng tôi</span>
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                 <Phone className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 bg-white rounded flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-colors">
                 <MessageCircle className="w-6 h-6 fill-current" />
               </a>
               <a href="#" className="w-10 h-10 bg-white rounded flex items-center justify-center text-blue-800 hover:bg-blue-600 hover:text-white transition-colors">
                 <Facebook className="w-5 h-5" />
               </a>
             </div>
          </div>

        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Portnet Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;