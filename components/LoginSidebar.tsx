import React, { useState } from 'react';
import { 
  User, Lock, Eye, EyeOff, Search, GripHorizontal, 
  List, MapPin, CreditCard, Phone, Mail, FileText, AlignLeft 
} from 'lucide-react';
import { TRACKING_OPTIONS } from '../constants';

interface LoginSidebarProps {
  onNavigate?: (viewId: string) => void;
}

const LoginSidebar: React.FC<LoginSidebarProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTrackingClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden border border-gray-100">
      
      {/* Auth Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${
            activeTab === 'login' 
              ? 'text-blue-700 bg-blue-50/50' 
              : 'text-gray-400 hover:text-blue-600 hover:bg-gray-50'
          }`}
        >
          Đăng nhập
          {activeTab === 'login' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${
            activeTab === 'register' 
              ? 'text-blue-700 bg-blue-50/50' 
              : 'text-gray-400 hover:text-blue-600 hover:bg-gray-50'
          }`}
        >
          Đăng Ký
          {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
      </div>

      {activeTab === 'login' ? (
        /* ================= LOGIN FORM ================= */
        <>
          <div className="p-6 space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Tên đăng nhập"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                />
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-gray-600 cursor-pointer select-none hover:text-blue-700">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Ghi nhớ đăng nhập
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Quên mật khẩu?</a>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-sm uppercase tracking-wide">
               Đăng nhập
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center px-6">
            <div className="flex-grow h-px bg-gray-100"></div>
            <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tiện ích tra cứu</span>
            <div className="flex-grow h-px bg-gray-100"></div>
          </div>

          {/* Quick Links Grid */}
          <div className="p-6 grid grid-cols-2 gap-2">
            {TRACKING_OPTIONS.map((opt) => (
              <a 
                key={opt.id} 
                href="#"
                onClick={(e) => handleTrackingClick(e, opt.id)}
                className="text-xs text-gray-600 hover:text-blue-700 hover:bg-blue-50 py-2 px-3 rounded-md transition-colors border border-transparent hover:border-blue-100 truncate"
                title={opt.label}
              >
                • {opt.label}
              </a>
            ))}
          </div>

          {/* Tracking Widget */}
          <div className="bg-gradient-to-b from-blue-50 to-white p-6 border-t border-gray-100">
            <h4 className="text-xs font-bold text-blue-800 uppercase mb-3 flex items-center">
              <Search className="w-3 h-3 mr-1" /> Tra cứu nhanh
            </h4>
            <div className="space-y-3">
              <div className="relative">
                <select className="w-full p-2.5 bg-white border border-blue-200 rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none shadow-sm">
                  <option>CHỌN CẢNG/HÃNG TÀU</option>
                  <option>Cảng Cát Lái</option>
                  <option>Cảng Hải Phòng</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                    <GripHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <input 
                type="text" 
                placeholder="NHẬP SỐ CONTAINER..." 
                className="w-full p-2.5 bg-white border border-blue-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase placeholder-gray-400 shadow-sm"
              />

              <div className="flex space-x-2">
                <div className="flex-1 bg-white border border-blue-200 rounded-md p-2 flex items-center justify-center font-mono text-lg font-bold text-blue-800 tracking-widest select-none shadow-sm opacity-80" style={{backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '10px 10px'}}>
                  5 4 4 9
                </div>
                <div className="flex-[2] relative">
                  <input 
                    type="text" 
                    placeholder="MÃ XÁC NHẬN" 
                    className="w-full h-full p-2 pl-3 border border-blue-200 rounded-md bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded p-1 hover:bg-blue-700 transition-colors shadow-sm">
                    <Search className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ================= REGISTER FORM ================= */
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            
            {/* Form Fields styled cleaner */}
            <div className="col-span-1">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Nhóm khách hàng</label>
               <select className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none">
                 <option>Doanh nghiệp</option>
                 <option>Cá nhân</option>
               </select>
            </div>
            
            <div className="col-span-1">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Tên đăng nhập *</label>
               <input type="text" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div className="col-span-1 relative">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Mật khẩu *</label>
               <input type={showRegisterPassword ? "text" : "password"} className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
             <div className="col-span-1 relative">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Nhập lại *</label>
               <input type={showConfirmPassword ? "text" : "password"} className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div className="col-span-2">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Họ và tên *</label>
               <input type="text" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div className="col-span-2">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Địa chỉ</label>
               <input type="text" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

             <div className="col-span-1">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">CMND/CCCD *</label>
               <input type="text" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
             <div className="col-span-1">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Điện thoại *</label>
               <input type="text" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div className="col-span-2">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Email *</label>
               <input type="email" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div className="col-span-2">
               <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Cảng đăng ký *</label>
               <select className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none">
                 <option>Cảng Cát Lái</option>
                 <option>Cảng Hải Phòng</option>
                 <option>Cảng Đà Nẵng</option>
               </select>
            </div>

            {/* Captcha */}
             <div className="col-span-2 flex items-end gap-2 mt-2">
                <div className="flex-grow">
                  <input type="text" placeholder="Nhập Captcha" className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase" />
                </div>
                 <div className="h-9 bg-gray-100 border border-gray-200 rounded px-3 flex items-center font-mono text-lg font-bold text-blue-600 tracking-widest select-none">
                  5 4 4 9
                </div>
            </div>

            {/* Terms Checkboxes */}
             <div className="col-span-2 space-y-2 mt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-[11px] font-bold text-orange-600 uppercase">CHƯA CÓ TÀI KHOẢN MB</span>
                </label>
                 <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-[11px] text-gray-600">Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">Điều khoản sử dụng</a></span>
                </label>
             </div>

            {/* Button */}
            <div className="col-span-2 mt-2">
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center text-sm uppercase tracking-wide">
               Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginSidebar;