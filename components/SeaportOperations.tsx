
import React, { useState } from 'react';
import { 
  Layers, ArrowDownCircle, ArrowUpCircle, Container, 
  Wrench, FileCheck, CheckCircle, Clock, AlertCircle, Box, Anchor, ArrowLeft
} from 'lucide-react';
import ImportContainerOrder from './ImportContainerOrder';
import ExportContainerOrder from './ExportContainerOrder';
import EmptyContainerOutOrder from './EmptyContainerOutOrder';
import EmptyContainerInOrder from './EmptyContainerInOrder';
import ServiceOrder from './ServiceOrder';
import UnstuffingOrder from './UnstuffingOrder';
import StuffingOrder from './StuffingOrder';

const SeaportOperations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('TÁC NGHIỆP');

  const menuItems = [
    { label: 'TÁC NGHIỆP', id: 'dashboard' },
    { label: 'Lệnh Giao Cont Hàng', id: 'import-order' },
    { label: 'Lệnh Giao Cont Rỗng', id: 'empty-out' },
    { label: 'Lệnh Hạ Cont Hàng', id: 'export-order' },
    { label: 'Lệnh Hạ Cont Rỗng', id: 'empty-in' },
    { label: 'Lệnh đóng hàng', id: 'stuffing' },
    { label: 'Lệnh rút hàng', id: 'unstuffing' },
    { label: 'Lệnh dịch vụ', id: 'service' },
  ];

  // Helper for rendering small stat pills
  const StatItem = ({ label, value, colorClass }: { label: string, value: string | number, colorClass?: string }) => (
    <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{label}</span>
      <span className={`text-lg font-bold ${colorClass || 'text-gray-800'}`}>{value}</span>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        
        {/* COL 1: CONTAINER FLOW (IMPORT/EXPORT) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-700 flex items-center text-sm uppercase">
                <Container className="w-4 h-4 mr-2 text-blue-600" />
                Thống kê Container
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">LIVE</span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              
              {/* IMPORT */}
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <ArrowDownCircle className="w-8 h-8 text-teal-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Container Nhập</p>
                    <p className="text-2xl font-bold text-gray-800">1,371</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <StatItem label="Dry" value="1158" />
                  <StatItem label="RF" value="147" colorClass="text-blue-600" />
                  <StatItem label="OOG" value="12" colorClass="text-orange-600" />
                  <StatItem label="DG" value="54" colorClass="text-red-600" />
                </div>
              </div>

              {/* Divider for desktop */}
              <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-gray-100 transform -translate-x-1/2"></div>

              {/* EXPORT */}
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <ArrowUpCircle className="w-8 h-8 text-indigo-500 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Container Xuất</p>
                    <p className="text-2xl font-bold text-gray-800">2,515</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <StatItem label="Dry" value="2206" />
                  <StatItem label="RF" value="234" colorClass="text-blue-600" />
                  <StatItem label="OOG" value="50" colorClass="text-orange-600" />
                  <StatItem label="DG" value="25" colorClass="text-red-600" />
                </div>
              </div>

            </div>
          </div>

          {/* SECONDARY ROW: EMPTY & REPAIR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Empty Containers */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="font-bold text-gray-700 text-sm flex items-center uppercase">
                      <Box className="w-4 h-4 mr-2 text-gray-500" /> Cấp Rỗng
                   </h4>
                   <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded font-medium">Khả dụng</span>
                </div>
                <div className="flex items-center justify-between bg-teal-50/30 p-4 rounded-lg border border-teal-100 mb-2">
                    <span className="text-sm font-medium text-gray-600">Tổng cộng</span>
                    <span className="text-xl font-bold text-teal-700">1,148</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-400 mb-1">Dry</div>
                        <div className="font-bold">1000</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-400 mb-1">RF</div>
                        <div className="font-bold">120</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-400 mb-1">OOG</div>
                        <div className="font-bold">28</div>
                    </div>
                </div>
             </div>

             {/* Repair & Cleaning */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="font-bold text-gray-700 text-sm flex items-center uppercase">
                      <Wrench className="w-4 h-4 mr-2 text-gray-500" /> Vệ sinh / Sửa chữa
                   </h4>
                </div>
                 <div className="flex items-center justify-between bg-orange-50/30 p-4 rounded-lg border border-orange-100 mb-2">
                    <span className="text-sm font-medium text-gray-600">Đang xử lý</span>
                    <span className="text-xl font-bold text-orange-600">185</span>
                </div>
                 <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-400 mb-1">Dry</div>
                        <div className="font-bold">172</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="text-gray-400 mb-1">RF</div>
                        <div className="font-bold">13</div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* COL 2: DOCUMENTATION & SEALS (Right Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Booking & EDO Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <h3 className="font-bold text-gray-700 text-sm flex items-center uppercase">
                 <FileCheck className="w-4 h-4 mr-2 text-purple-600" />
                 Chứng từ
               </h3>
             </div>
             
             <div className="p-0">
               {/* Booking Row */}
               <div className="p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-sm font-bold text-gray-700">BOOKING</span>
                     <span className="text-xs text-gray-400">Tổng: 993</span>
                  </div>
                  <div className="space-y-2">
                      <div className="flex justify-between text-xs items-center">
                          <span className="text-gray-500 flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-green-500"/> Đã cấp</span>
                          <span className="font-bold text-gray-800">262</span>
                      </div>
                       <div className="flex justify-between text-xs items-center">
                          <span className="text-gray-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1 text-orange-400"/> Chưa cấp</span>
                          <span className="font-bold text-gray-800">506</span>
                      </div>
                       <div className="flex justify-between text-xs items-center">
                          <span className="text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1 text-blue-500"/> Đang xử lý</span>
                          <span className="font-bold text-gray-800">225</span>
                      </div>
                  </div>
               </div>

               {/* EDO Row */}
               <div className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-sm font-bold text-gray-700">LỆNH EDO</span>
                     <span className="text-xs text-gray-400">Tổng: 492</span>
                  </div>
                  <div className="space-y-2">
                      <div className="flex justify-between text-xs items-center">
                          <span className="text-gray-500 flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-green-500"/> Đã cấp</span>
                          <span className="font-bold text-gray-800">19</span>
                      </div>
                       <div className="flex justify-between text-xs items-center">
                          <span className="text-gray-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1 text-orange-400"/> Chưa cấp</span>
                          <span className="font-bold text-gray-800">457</span>
                      </div>
                       <div className="flex justify-between text-xs items-center">
                          <span className="text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1 text-blue-500"/> Đang xử lý</span>
                          <span className="font-bold text-gray-800">16</span>
                      </div>
                  </div>
               </div>
             </div>
          </div>

          {/* SEAL Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <h3 className="font-bold text-gray-700 text-sm flex items-center uppercase">
                 <Anchor className="w-4 h-4 mr-2 text-gray-500" />
                 Quản lý Seal
               </h3>
             </div>
             <div className="p-5">
               <div className="flex items-center gap-4">
                  <div className="flex-1 text-center border-r border-gray-100">
                      <div className="text-3xl font-bold text-green-600 mb-1">43</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">Đã cấp</div>
                  </div>
                  <div className="flex-1 text-center">
                      <div className="text-3xl font-bold text-gray-400 mb-1">182</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">Chưa cấp</div>
                  </div>
               </div>
               <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Trả về / Hư hỏng</span>
                  <span className="font-bold text-gray-800">0</span>
               </div>
             </div>
          </div>

        </div>
      </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* 1. Operations Menu Bar (Visible only when on Dashboard) */}
      {activeTab === 'TÁC NGHIỆP' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max p-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.label)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wide transition-all rounded-lg mx-1 whitespace-nowrap ${
                  activeTab === item.label
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Back Button (Visible when NOT on Dashboard) */}
      {activeTab !== 'TÁC NGHIỆP' && (
        <div className="flex items-center mb-4">
           <button 
             onClick={() => setActiveTab('TÁC NGHIỆP')}
             className="text-gray-500 hover:text-blue-600 flex items-center text-sm font-bold transition-colors"
           >
             <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại Dashboard Tác Nghiệp
           </button>
           <div className="mx-3 h-4 w-px bg-gray-300"></div>
           <span className="text-gray-800 font-bold uppercase text-sm">{activeTab}</span>
        </div>
      )}

      {/* 2. Main Content based on Tab */}
      {activeTab === 'TÁC NGHIỆP' ? renderDashboard() : null}
      
      {activeTab === 'Lệnh Giao Cont Hàng' ? (
         <ImportContainerOrder />
      ) : null}

      {activeTab === 'Lệnh Giao Cont Rỗng' ? (
         <EmptyContainerOutOrder />
      ) : null}

      {activeTab === 'Lệnh Hạ Cont Hàng' ? (
         <ExportContainerOrder />
      ) : null}

      {activeTab === 'Lệnh Hạ Cont Rỗng' ? (
         <EmptyContainerInOrder />
      ) : null}

      {activeTab === 'Lệnh đóng hàng' ? (
         <StuffingOrder />
      ) : null}

      {activeTab === 'Lệnh dịch vụ' ? (
         <ServiceOrder />
      ) : null}

      {activeTab === 'Lệnh rút hàng' ? (
         <UnstuffingOrder />
      ) : null}

      {/* Placeholder for other tabs */}
      {activeTab !== 'TÁC NGHIỆP' && activeTab !== 'Lệnh Giao Cont Hàng' && activeTab !== 'Lệnh Hạ Cont Hàng' && activeTab !== 'Lệnh Giao Cont Rỗng' && activeTab !== 'Lệnh Hạ Cont Rỗng' && activeTab !== 'Lệnh dịch vụ' && activeTab !== 'Lệnh rút hàng' && activeTab !== 'Lệnh đóng hàng' && (
         <div className="bg-white p-20 text-center rounded-xl shadow-sm border border-gray-200">
             <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-gray-400">Chức năng đang phát triển</h3>
             <p className="text-gray-400">Vui lòng quay lại sau.</p>
         </div>
      )}

    </div>
  );
};

export default SeaportOperations;
