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
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 sticky top-24">
      
      {/* Auth Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-4 text-base font-bold tracking-wide transition-colors ${
            activeTab === 'login' 
              ? 'text-cyan-800 border-b-2 border-cyan-600 bg-cyan-50/30' 
              : 'text-gray-400 hover:text-cyan-600'
          }`}
        >
          Đăng nhập
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-4 text-base font-bold tracking-wide transition-colors ${
            activeTab === 'register' 
              ? 'text-cyan-800 border-b-2 border-cyan-600 bg-cyan-50/30' 
              : 'text-gray-400 hover:text-cyan-600'
          }`}
        >
          Đăng Ký
        </button>
      </div>

      {activeTab === 'login' ? (
        /* ================= LOGIN FORM ================= */
        <>
          <div className="p-6 space-y-6">
            <div className="space-y-6">
              <div className="relative group">
                <User className="absolute left-0 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="TÊN ĐĂNG NHẬP"
                  className="w-full py-3 pl-8 border-b border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-400 text-sm transition-colors"
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-0 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="MẬT KHẨU"
                  className="w-full py-3 pl-8 pr-8 border-b border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-400 text-sm transition-colors"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-gray-400 hover:text-blue-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-gray-600 cursor-pointer select-none">
                <input type="checkbox" className="mr-2 rounded text-blue-600 focus:ring-blue-500" />
                Ghi nhớ
              </label>
              <a href="#" className="text-cyan-600 hover:underline">Quên mật khẩu?</a>
            </div>

            <button className="w-full bg-[#8bc34a] hover:bg-[#7cb342] text-white font-bold py-3 px-4 rounded shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center uppercase text-sm tracking-wider">
               Đăng nhập
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center px-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3 text-xs font-medium text-orange-500 uppercase">Tra cứu</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Quick Links Grid */}
          <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-2">
            {TRACKING_OPTIONS.map((opt) => (
              <a 
                key={opt.id} 
                href="#"
                onClick={(e) => handleTrackingClick(e, opt.id)}
                className="text-xs text-gray-700 hover:text-blue-700 hover:bg-blue-50 py-1 px-2 rounded transition-colors text-right odd:text-left odd:font-medium block"
              >
                {opt.label}
              </a>
            ))}
          </div>

          {/* Tracking Widget */}
          <div className="bg-blue-50 p-6 border-t border-blue-100">
            <div className="space-y-4">
              <div className="relative">
                <select className="w-full p-2.5 bg-white border border-blue-200 rounded text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none">
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
                className="w-full p-2.5 bg-white border border-blue-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none uppercase placeholder-gray-400"
              />

              <div className="flex space-x-2">
                <div className="flex-1 bg-white border border-blue-200 rounded p-2 flex items-center justify-center font-mono text-lg font-bold text-blue-800 tracking-widest select-none bg-opacity-50" style={{backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+")'}}>
                  5 4 4 9
                </div>
                <div className="flex-[2] relative">
                  <input 
                    type="text" 
                    placeholder="MÃ XÁC NHẬN" 
                    className="w-full h-full p-2 border-b border-blue-300 bg-transparent text-sm focus:border-blue-600 outline-none"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ================= REGISTER FORM ================= */
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            
            {/* Row 1: Group & Username */}
            <div className="relative group col-span-1">
               <List className="absolute left-0 bottom-2 w-5 h-5 text-slate-500" />
               <select className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 focus:outline-none bg-transparent text-[13px] font-medium uppercase text-slate-700 appearance-none rounded-none">
                 <option>NHÓM KHÁCH HÀNG</option>
                 <option>Doanh nghiệp</option>
                 <option>Cá nhân</option>
               </select>
            </div>
            
            <div className="relative group col-span-1">
               <User className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input type="text" placeholder="TÊN ĐĂNG NHẬP *" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
            </div>

            {/* Row 2: Passwords */}
            <div className="relative group col-span-1">
               <Lock className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input 
                 type={showRegisterPassword ? "text" : "password"} 
                 placeholder="MẬT KHẨU *" 
                 className="w-full py-2 pl-8 pr-6 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" 
               />
               <button onClick={() => setShowRegisterPassword(!showRegisterPassword)} className="absolute right-0 bottom-2 text-slate-400 hover:text-blue-600">
                  {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
               </button>
            </div>
             <div className="relative group col-span-1">
               <Lock className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input 
                 type={showConfirmPassword ? "text" : "password"} 
                 placeholder="NHẬP LẠI *" 
                 className="w-full py-2 pl-8 pr-6 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" 
               />
               <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 bottom-2 text-slate-400 hover:text-blue-600">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
               </button>
            </div>

            {/* Row 3 - Full Name */}
            <div className="relative group col-span-2">
               <FileText className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input type="text" placeholder="HỌ VÀ TÊN *" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
            </div>

            {/* Row 4 - Address */}
            <div className="relative group col-span-2">
               <MapPin className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input type="text" placeholder="ĐỊA CHỈ" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
            </div>

            {/* Row 5 - CMND & Phone */}
             <div className="relative group col-span-1">
               <CreditCard className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input type="text" placeholder="SỐ CMND *" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
            </div>
             <div className="relative group col-span-1">
               <Phone className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input type="text" placeholder="SỐ ĐIỆN THOẠI *" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
            </div>

             {/* Row 6 - Email */}
            <div className="relative group col-span-2">
               <Mail className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
               <input type="email" placeholder="EMAIL *" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
            </div>

             {/* Row 7 - Port Select */}
            <div className="relative group col-span-2">
               <List className="absolute left-0 bottom-2 w-5 h-5 text-slate-500" />
               <select className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 focus:outline-none bg-transparent text-[13px] font-medium uppercase text-slate-700 appearance-none rounded-none">
                 <option>CHỌN CẢNG ĐĂNG KÝ *</option>
                 <option>Cảng Cát Lái</option>
                 <option>Cảng Hải Phòng</option>
                 <option>Cảng Đà Nẵng</option>
               </select>
               <div className="absolute right-0 bottom-3 text-slate-400 pointer-events-none">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </div>
            </div>

            {/* Row 8 - Captcha */}
             <div className="col-span-2 flex items-end gap-2">
                <div className="relative group flex-grow">
                  <AlignLeft className="absolute left-0 bottom-2 w-5 h-5 text-slate-500 group-focus-within:text-blue-600" />
                  <input type="text" placeholder="NHẬP CAPTCHA" className="w-full py-2 pl-8 border-b border-slate-300 focus:border-blue-600 outline-none bg-transparent placeholder-slate-500 text-[13px] uppercase font-medium" />
                </div>
                 <div className="h-8 flex items-center justify-center font-mono text-xl font-bold text-blue-600 tracking-widest px-2 select-none">
                  5 4 4 9
                </div>
            </div>

            {/* Terms Checkboxes */}
             <div className="col-span-2 space-y-3 mt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-4 h-4 border-2 border-gray-400 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500 appearance-none transition-colors" />
                    <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">CHƯA CÓ TÀI KHOẢN MB</span>
                </label>
                 <label className="flex items-center space-x-2 cursor-pointer select-none">
                   <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-4 h-4 border-2 border-gray-400 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500 appearance-none transition-colors" />
                    <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-xs text-gray-700">Tôi đã đọc và đồng ý thỏa thuận này - <a href="#" className="text-blue-600 hover:underline flex-inline items-center gap-0.5"><FileText className="w-3 h-3 inline"/> Điều khoản</a></span>
                </label>
             </div>

            {/* Button */}
            <div className="col-span-2 mt-2">
               <button className="w-full bg-[#8bc34a] hover:bg-[#7cb342] text-white font-bold py-3 px-4 rounded shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center uppercase text-sm tracking-wider">
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