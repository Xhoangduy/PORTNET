
import React, { useState } from 'react';
import { 
  Search, User, Truck, Ship, Calendar, FileText, 
  CreditCard, CheckCircle, AlertCircle, ArrowRight,
  Database, RefreshCw, Smartphone
} from 'lucide-react';
import { ImportContainer } from '../types';

const ImportContainerOrder: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1); // 1: List, 2: Payment, 3: Success
  const [containers, setContainers] = useState<ImportContainer[]>([]);
  const [selectedContainerIds, setSelectedContainerIds] = useState<string[]>([]);
  
  // Step 6: Billing Info
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);

  // OTP
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  // Mock loading data (Step 4)
  const handleLoadData = () => {
    // Simulate API call
    const mockData: ImportContainer[] = [
      { id: '1', containerNo: 'TCNU5802853', size: '20DC', seal: 'VN123456', weight: 18.5, vessel: 'KOTA LIHAT', status: 'Tại bãi', fee: 1500000 },
      { id: '2', containerNo: 'MSKU9876543', size: '40HC', seal: 'VN654321', weight: 22.0, vessel: 'KOTA LIHAT', status: 'Tại bãi', fee: 2800000 },
      { id: '3', containerNo: 'PONU1122334', size: '20DC', seal: 'VN112233', weight: 15.0, vessel: 'KOTA LIHAT', status: 'Tại bãi', fee: 1500000 },
    ];
    setContainers(mockData);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedContainerIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleUpdateTaxInfo = () => {
    // Mock updating tax info logic (Step 6 Note)
    if (taxId === '0300000000') {
      setCompanyName('CÔNG TY TNHH THAY ĐỔI MỚI');
    } else {
      setCompanyName('CÔNG TY TNHH LOGISTICS MẪU');
    }
    setIsChangingTax(false);
  };

  const totalAmount = containers
    .filter(c => selectedContainerIds.includes(c.id))
    .reduce((sum, c) => sum + c.fee, 0);

  const handlePayment = () => {
    setShowOtpInput(true);
  };

  const verifyOtp = () => {
    // Simulate OTP verification (Step 7)
    setTimeout(() => {
        setCurrentStep(3); // Go to Success (Step 8)
    }, 1000);
  };

  // --- RENDER HELPERS ---

  const renderProgressBar = () => (
    <div className="bg-white p-4 mb-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between px-10">
      <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>1</div>
        <span className="font-medium text-sm hidden md:inline">Danh sách container</span>
      </div>
      <div className={`flex-1 h-1 mx-4 rounded ${currentStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>2</div>
        <span className="font-medium text-sm hidden md:inline">Thanh toán</span>
      </div>
       <div className={`flex-1 h-1 mx-4 rounded ${currentStep >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>3</div>
        <span className="font-medium text-sm hidden md:inline">Hoàn tất</span>
      </div>
    </div>
  );

  // --- VIEW 1: SELECTION (STEPS 1-5) ---
  if (currentStep === 1) {
    return (
      <div className="animate-fade-in relative">
        {renderProgressBar()}
        
        <div className="flex flex-col xl:flex-row gap-6 items-start h-full">
            
          {/* LEFT SIDEBAR: STEPS 1, 2, 3 - COMPACT DESIGN */}
          <div className="w-full xl:w-[400px] bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden flex-shrink-0">
             <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
                 <h3 className="font-bold text-sm uppercase">Thông tin lệnh giao hàng</h3>
                 <FileText className="w-4 h-4 text-white/80" />
             </div>
             
             <div className="p-5 space-y-4">
                {/* STEP 1: ORDER INFO */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Chi tiết Lệnh
                    </label>
                    
                    {/* Bill Type Radio - Compact */}
                    <div className="flex gap-6 items-center bg-gray-50 p-2 rounded border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Loại Bill:</span>
                        <label className="flex items-center text-sm cursor-pointer">
                            <input type="radio" name="billType" className="mr-2 text-teal-600 focus:ring-teal-500" defaultChecked /> 
                            <span className="font-medium text-gray-700">MASTER</span>
                        </label>
                        <label className="flex items-center text-sm cursor-pointer">
                            <input type="radio" name="billType" className="mr-2 text-teal-600 focus:ring-teal-500" /> 
                            <span className="font-medium text-gray-700">HOUSE</span>
                        </label>
                    </div>

                    {/* Grid for D/O and BL */}
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Số D/O (Mã lệnh)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none uppercase" />
                        <input type="text" placeholder="Số BL/Booking" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none uppercase" />
                    </div>
                    
                    <input type="text" placeholder="Số Container (Tùy chọn)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none uppercase" />
                    
                    {/* Grid for Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] text-gray-400 mb-1">Hạn lệnh</label>
                            <input type="date" className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                        </div>
                         <div>
                            <label className="block text-[10px] text-gray-400 mb-1">Hạn lưu cont</label>
                            <input type="date" className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* STEP 2: OWNER INFO */}
                <div className="space-y-3">
                     <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Thông tin chủ hàng
                    </label>
                    <input type="text" placeholder="Tên chủ hàng *" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                     <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Người đại diện" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                        <input type="text" placeholder="Số điện thoại" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                     </div>
                     <input type="text" placeholder="Ghi chú (nếu có)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* STEP 3: TRANSPORT */}
                <div className="space-y-3">
                     <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Phương thức vận chuyển
                    </label>
                    <div className="flex gap-3">
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="transport" className="peer sr-only" defaultChecked />
                            <div className="p-2 border border-gray-200 rounded-lg text-center peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:bg-gray-50">
                                <div className="flex items-center justify-center gap-2">
                                    <Truck className="w-4 h-4 text-gray-500 peer-checked:text-teal-600" />
                                    <span className="text-xs font-bold text-gray-600 peer-checked:text-teal-700">Xe chủ hàng</span>
                                </div>
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="transport" className="peer sr-only" />
                            <div className="p-2 border border-gray-200 rounded-lg text-center peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:bg-gray-50">
                                <div className="flex items-center justify-center gap-2">
                                    <Ship className="w-4 h-4 text-gray-500 peer-checked:text-teal-600" />
                                    <span className="text-xs font-bold text-gray-600 peer-checked:text-teal-700">Sà lan</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* STEP 4: ACTION */}
                <button 
                    onClick={handleLoadData}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                    <Database className="w-4 h-4" />
                    NẠP DỮ LIỆU
                </button>
             </div>
          </div>

          {/* RIGHT CONTENT: STEP 5 (LIST) */}
          <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
             {/* Header */}
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-teal-50/30">
                 <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-600 text-xs font-bold">5</span>
                    <h3 className="font-bold text-gray-700 text-sm uppercase">Danh sách Container</h3>
                 </div>
                 {containers.length > 0 && (
                     <div className="text-xs text-gray-500">
                         Đã chọn: <b className="text-teal-600">{selectedContainerIds.length}</b> / {containers.length}
                     </div>
                 )}
             </div>

             {/* Content */}
             <div className="flex-grow p-0 overflow-auto">
                {containers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="text-sm">Vui lòng nhập thông tin và bấm "Nạp dữ liệu"</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 w-10">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedContainerIds(containers.map(c => c.id));
                                            else setSelectedContainerIds([]);
                                        }}
                                        checked={selectedContainerIds.length === containers.length && containers.length > 0}
                                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                    />
                                </th>
                                <th className="px-4 py-3">Container No</th>
                                <th className="px-4 py-3">Size/Type</th>
                                <th className="px-4 py-3">Seal</th>
                                <th className="px-4 py-3">Vị trí</th>
                                <th className="px-4 py-3 text-right">Phí dự kiến</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((cont) => (
                                <tr key={cont.id} className={`border-b hover:bg-teal-50 transition-colors ${selectedContainerIds.includes(cont.id) ? 'bg-teal-50/50' : 'bg-white'}`}>
                                    <td className="px-4 py-3">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedContainerIds.includes(cont.id)}
                                            onChange={() => handleCheckboxChange(cont.id)}
                                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-bold text-blue-900 font-mono">{cont.containerNo}</td>
                                    <td className="px-4 py-3">{cont.size}</td>
                                    <td className="px-4 py-3 font-mono">{cont.seal}</td>
                                    <td className="px-4 py-3 text-gray-500">{cont.status}</td>
                                    <td className="px-4 py-3 text-right font-medium">{cont.fee.toLocaleString()} ₫</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
             </div>

             {/* Footer Actions */}
             <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                 <div className="text-xs text-gray-500">
                     * Vui lòng kiểm tra kỹ thông tin trước khi thanh toán
                 </div>
                 <button 
                    disabled={selectedContainerIds.length === 0}
                    onClick={() => setCurrentStep(2)}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center transition-all ${
                        selectedContainerIds.length > 0 
                        ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                 >
                     Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: PAYMENT (STEPS 6-7) ---
  if (currentStep === 2) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        {renderProgressBar()}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
             <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-800 text-lg flex items-center">
                   <CreditCard className="w-5 h-5 mr-2 text-teal-600" />
                   Thanh toán & Xuất hóa đơn
                </h3>
             </div>
             
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* LEFT: INVOICE INFO (STEP 6) */}
                 <div className="space-y-6">
                     <h4 className="font-bold text-sm uppercase text-gray-500 border-b border-gray-100 pb-2">
                        Thông tin xuất hóa đơn
                     </h4>
                     
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Mã số thuế</label>
                        <div className="flex gap-2">
                           <input 
                              type="text" 
                              value={taxId}
                              onChange={(e) => setTaxId(e.target.value)}
                              disabled={!isChangingTax}
                              className={`flex-grow p-2.5 border rounded text-sm outline-none font-mono ${isChangingTax ? 'bg-white border-teal-500 ring-1 ring-teal-200' : 'bg-gray-50 border-gray-200'}`}
                           />
                           {isChangingTax ? (
                               <button 
                                 onClick={handleUpdateTaxInfo}
                                 className="px-4 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700"
                               >
                                 Check
                               </button>
                           ) : (
                               <button 
                                 onClick={() => setIsChangingTax(true)}
                                 className="px-4 bg-gray-200 text-gray-600 rounded text-xs font-bold hover:bg-gray-300 flex items-center"
                               >
                                 <RefreshCw className="w-3 h-3 mr-1" /> Đổi MST
                               </button>
                           )}
                        </div>
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Tên công ty / Đơn vị</label>
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700 min-h-[50px]">
                           {companyName}
                        </div>
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Địa chỉ email nhận HĐĐT</label>
                        <input type="email" defaultValue="accounting@logistics-sample.com" className="w-full p-2.5 border border-gray-200 rounded text-sm bg-white" />
                     </div>
                 </div>

                 {/* RIGHT: BILLING SUMMARY */}
                 <div className="space-y-6">
                     <h4 className="font-bold text-sm uppercase text-gray-500 border-b border-gray-100 pb-2">
                        Chi tiết thanh toán
                     </h4>
                     
                     <div className="bg-teal-50 p-4 rounded-lg space-y-3">
                         <div className="flex justify-between text-sm">
                             <span className="text-gray-600">Số lượng container</span>
                             <span className="font-bold">{selectedContainerIds.length}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                             <span className="text-gray-600">Thành tiền (trước VAT)</span>
                             <span className="font-mono">{totalAmount.toLocaleString()} ₫</span>
                         </div>
                         <div className="flex justify-between text-sm">
                             <span className="text-gray-600">VAT (8%)</span>
                             <span className="font-mono">{(totalAmount * 0.08).toLocaleString()} ₫</span>
                         </div>
                         <div className="border-t border-teal-200 pt-3 flex justify-between items-center">
                             <span className="text-teal-900 font-bold uppercase">Tổng thanh toán</span>
                             <span className="text-xl font-bold text-teal-700 font-mono">
                                 {(totalAmount * 1.08).toLocaleString()} ₫
                             </span>
                         </div>
                     </div>

                     {/* STEP 7: PAYMENT */}
                     <div>
                        <button 
                            onClick={handlePayment}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                        >
                            <CreditCard className="w-5 h-5" />
                            Thanh toán ngay
                        </button>
                        <button 
                             onClick={() => setCurrentStep(1)}
                             className="w-full mt-3 text-gray-500 hover:text-gray-700 text-xs font-medium text-center underline"
                        >
                            Quay lại bước trước
                        </button>
                     </div>
                 </div>
             </div>
        </div>

        {/* OTP MODAL OVERLAY */}
        {showOtpInput && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Smartphone className="w-8 h-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Xác thực OTP</h3>
                        <p className="text-sm text-gray-500 mt-1">Mã xác thực đã được gửi đến SĐT 090****888</p>
                    </div>

                    <div className="flex gap-2 justify-center mb-6">
                        {[0,1,2,3,4,5].map((i) => (
                            <input 
                                key={i}
                                type="text" 
                                maxLength={1}
                                className="w-10 h-12 border border-gray-300 rounded text-center text-xl font-bold focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                            />
                        ))}
                    </div>

                    <button 
                        onClick={verifyOtp}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Xác nhận
                    </button>
                     <button 
                        onClick={() => setShowOtpInput(false)}
                        className="w-full mt-3 text-gray-500 text-sm hover:text-gray-800"
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- VIEW 3: SUCCESS (STEP 8) ---
  if (currentStep === 3) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto text-center pt-10">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
             <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Giao dịch thành công!</h2>
          <p className="text-gray-500 mb-8">
              Yêu cầu lệnh giao container của quý khách đã được ghi nhận. 
              <br/>Email xác nhận và hóa đơn điện tử đã được gửi tới <span className="font-bold text-gray-800">accounting@logistics-sample.com</span>.
          </p>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-left max-w-md mx-auto">
              <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                  <span className="text-gray-500 text-sm">Mã giao dịch</span>
                  <span className="font-mono font-bold">TRX-2023-889911</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                  <span className="text-gray-500 text-sm">Thời gian</span>
                  <span className="font-medium text-gray-800">{new Date().toLocaleString()}</span>
              </div>
               <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Tổng tiền</span>
                  <span className="font-bold text-teal-600">{(totalAmount * 1.08).toLocaleString()} ₫</span>
              </div>
          </div>

          <div className="flex gap-4 justify-center">
              <button 
                onClick={() => {
                    setCurrentStep(1);
                    setContainers([]);
                    setSelectedContainerIds([]);
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                  Về trang chủ
              </button>
              <button className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 shadow-md transition-colors flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> Xem lệnh điện tử
              </button>
          </div>
      </div>
    );
  }

  return null;
};

export default ImportContainerOrder;
