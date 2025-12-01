
import React, { useState } from 'react';
import { 
  Search, User, Wrench, Calendar, FileText, 
  CreditCard, CheckCircle, ArrowRight, Zap, 
  Database, RefreshCw, Smartphone, Thermometer, ShieldCheck, Check
} from 'lucide-react';
import { ServiceContainer } from '../types';

const ServiceOrder: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Info/List, 2: Billing, 3: Payment, 4: Success
  
  // Step 1: Inputs
  const [docType, setDocType] = useState<'bl' | 'booking'>('bl');
  const [docNumber, setDocNumber] = useState('');
  const [containerInput, setContainerInput] = useState('');
  const [serviceType, setServiceType] = useState('vesinh');
  const [expiryDate, setExpiryDate] = useState('');
  
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    rep: '',
    phone: '',
    note: ''
  });

  // Data List
  const [containers, setContainers] = useState<ServiceContainer[]>([]);
  const [selectedContainerIds, setSelectedContainerIds] = useState<string[]>([]);

  // Step 2: Billing
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);

  // Step 3: Payment
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Helpers
  const getServiceLabel = (type: string) => {
      switch(type) {
          case 'vesinh': return 'Vệ sinh Container (Cleaning)';
          case 'suachua': return 'Sửa chữa (Repair)';
          case 'camdien': return 'Cắm điện (Power Supply)';
          case 'giamsat': return 'Giám sát / Kiểm hóa';
          default: return type;
      }
  };

  const handleLoadData = () => {
    // Mock Data based on inputs
    const mockData: ServiceContainer[] = [
      { id: '1', containerNo: 'TCNU5802853', isoSize: '20DC', location: 'A-01-02', serviceName: getServiceLabel(serviceType), fee: 350000 },
      { id: '2', containerNo: 'MSKU9876543', isoSize: '40HC', location: 'B-05-11', serviceName: getServiceLabel(serviceType), fee: 550000 },
      { id: '3', containerNo: 'PONU1122334', isoSize: '20DC', location: 'A-02-04', serviceName: getServiceLabel(serviceType), fee: 350000 },
    ];
    
    // Filter if container input is present
    const filtered = containerInput 
        ? mockData.filter(c => c.containerNo.includes(containerInput.toUpperCase())) 
        : mockData;

    setContainers(filtered);
    setSelectedContainerIds([]); // Reset selection
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedContainerIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleUpdateTaxInfo = () => {
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
    setTimeout(() => {
        setCurrentStep(4);
    }, 1000);
  };

  // Render Progress Bar
  const renderProgressBar = () => {
      const steps = [
          { id: 1, title: 'Thông tin & Dịch vụ' },
          { id: 2, title: 'Tính cước' },
          { id: 3, title: 'Thanh toán' },
      ];

      return (
        <div className="mb-8 mt-2">
            <div className="flex items-center justify-between px-4 md:px-24 relative">
                 {/* Connecting Line */}
                <div className="absolute left-10 right-10 top-4 h-[2px] bg-gray-200 -z-10"></div>
                
                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    
                    return (
                        <div key={step.id} className="flex flex-col items-center cursor-pointer group" onClick={() => isCompleted && setCurrentStep(step.id as any)}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                                isActive ? 'bg-teal-600 text-white ring-4 ring-teal-50 shadow-md scale-110' : 
                                isCompleted ? 'bg-teal-600 text-white' : 
                                'bg-white border-2 border-gray-200 text-gray-400 group-hover:border-gray-300'
                            }`}>
                                {isCompleted ? <Check className="w-4 h-4"/> : step.id}
                            </div>
                            <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                isActive ? 'text-teal-700' : 
                                isCompleted ? 'text-teal-600' : 'text-gray-400'
                            } hidden sm:block`}>
                                {step.title}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
      );
  }

  // --- VIEW 1: INFO & LIST ---
  if (currentStep === 1) {
    return (
      <div className="animate-fade-in relative">
        {renderProgressBar()}

        <div className="flex flex-col xl:flex-row gap-6 items-start h-full">
            
          {/* LEFT: ORDER INFO */}
          <div className="w-full xl:w-[400px] bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden flex-shrink-0">
             <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
                 <h3 className="font-bold text-sm uppercase">Thông tin lệnh dịch vụ</h3>
                 <Wrench className="w-4 h-4 text-white/80" />
             </div>
             
             <div className="p-5 space-y-6">
                
                {/* DOC INFO */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Chi tiết lô hàng
                    </label>
                    <div className="flex gap-4 mb-2">
                        <label className="flex items-center text-sm cursor-pointer">
                            <input 
                                type="radio" 
                                checked={docType === 'bl'} 
                                onChange={() => setDocType('bl')}
                                className="mr-2 text-teal-600 focus:ring-teal-500" 
                            /> 
                            Số Vận Đơn (B/L)
                        </label>
                        <label className="flex items-center text-sm cursor-pointer">
                            <input 
                                type="radio" 
                                checked={docType === 'booking'} 
                                onChange={() => setDocType('booking')}
                                className="mr-2 text-teal-600 focus:ring-teal-500" 
                            /> 
                            Số Booking
                        </label>
                    </div>
                    <input 
                        type="text" 
                        placeholder={`Nhập số ${docType === 'bl' ? 'Vận đơn' : 'Booking'}`} 
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none uppercase" 
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Số Container (Tùy chọn)" 
                        value={containerInput}
                        onChange={(e) => setContainerInput(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none uppercase" 
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                         <div className="col-span-2">
                             <label className="block text-[10px] text-gray-400 mb-1">Loại dịch vụ</label>
                             <select 
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none"
                             >
                                 <option value="vesinh">Vệ sinh Container</option>
                                 <option value="suachua">Sửa chữa Container</option>
                                 <option value="camdien">Cắm điện (Chạy lạnh)</option>
                                 <option value="giamsat">Giám sát / Kiểm hóa</option>
                             </select>
                         </div>
                         <div className="col-span-2">
                            <label className="block text-[10px] text-gray-400 mb-1">Hạn lệnh</label>
                            <input 
                                type="date" 
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" 
                            />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* OWNER INFO */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Thông tin chủ hàng
                    </label>
                    <input 
                        type="text" 
                        placeholder="Tên chủ hàng *" 
                        value={ownerInfo.name}
                        onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" 
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input 
                            type="text" 
                            placeholder="Người đại diện" 
                            value={ownerInfo.rep}
                            onChange={(e) => setOwnerInfo({...ownerInfo, rep: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" 
                        />
                        <input 
                            type="text" 
                            placeholder="Số điện thoại" 
                            value={ownerInfo.phone}
                            onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" 
                        />
                    </div>
                    <textarea 
                        placeholder="Ghi chú (nếu có)" 
                        rows={2} 
                        value={ownerInfo.note}
                        onChange={(e) => setOwnerInfo({...ownerInfo, note: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none"
                    ></textarea>
                </div>

                 {/* ACTION */}
                <button 
                    onClick={handleLoadData}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                    <Database className="w-4 h-4" />
                    NẠP DỮ LIỆU
                </button>

             </div>
          </div>

          {/* RIGHT: CONTAINER LIST */}
          <div className="flex-grow w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
             
             {/* Header */}
             <div className="p-4 border-b border-gray-100 bg-teal-50/30 flex justify-between items-center">
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
             <div className="flex-grow p-0 overflow-auto bg-gray-50/50">
                {containers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Chưa có dữ liệu.</p>
                        <p className="text-xs text-gray-400 mt-1">Vui lòng nhập thông tin và bấm "Nạp dữ liệu"</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left bg-white">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
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
                                <th className="px-4 py-3">Vị trí</th>
                                <th className="px-4 py-3">Dịch vụ</th>
                                <th className="px-4 py-3 text-right">Phí (VND)</th>
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
                                    <td className="px-4 py-3">{cont.isoSize}</td>
                                    <td className="px-4 py-3 font-mono text-gray-500">{cont.location}</td>
                                    <td className="px-4 py-3 text-teal-600 font-medium">{cont.serviceName}</td>
                                    <td className="px-4 py-3 text-right font-medium">{cont.fee.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
             </div>

             {/* Footer Actions */}
             <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
                 <div className="text-xs text-gray-500">
                     * Đơn giá có thể thay đổi tùy thuộc vào tình trạng container
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
                     Tiếp theo <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: BILLING ---
  if (currentStep === 2) {
      return (
          <div className="animate-fade-in max-w-4xl mx-auto">
             {renderProgressBar()}
             
             <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-teal-600" />
                        Xác nhận & Tính cước dịch vụ
                    </h3>
                 </div>

                 <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
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
                                    className={`flex-grow p-2.5 border rounded text-sm outline-none font-mono ${isChangingTax ? 'bg-white border-blue-500 ring-1 ring-blue-200' : 'bg-gray-50 border-gray-200'}`}
                                />
                                {isChangingTax ? (
                                    <button onClick={handleUpdateTaxInfo} className="px-4 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700">Check</button>
                                ) : (
                                    <button onClick={() => setIsChangingTax(true)} className="px-4 bg-gray-200 text-gray-600 rounded text-xs font-bold hover:bg-gray-300 flex items-center"><RefreshCw className="w-3 h-3 mr-1" /> Đổi MST</button>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Tên công ty</label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700">{companyName}</div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h4 className="font-bold text-sm uppercase text-gray-500 border-b border-gray-100 pb-2">
                            Chi tiết thanh toán
                        </h4>
                        <div className="bg-teal-50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Dịch vụ</span>
                                <span className="font-bold text-gray-800 uppercase">{getServiceLabel(serviceType)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Số lượng container</span>
                                <span className="font-bold">{selectedContainerIds.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Thành tiền (Chưa VAT)</span>
                                <span className="font-mono">{totalAmount.toLocaleString()} ₫</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">VAT (10%)</span>
                                <span className="font-mono">{(totalAmount * 0.1).toLocaleString()} ₫</span>
                            </div>
                            <div className="border-t border-teal-200 pt-3 flex justify-between items-center">
                                <span className="text-teal-900 font-bold uppercase">Tổng thanh toán</span>
                                <span className="text-xl font-bold text-teal-700 font-mono">
                                    {(totalAmount * 1.1).toLocaleString()} ₫
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                             <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-bold border border-gray-200">Quay lại</button>
                             <button onClick={() => setCurrentStep(3)} className="flex-[2] bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-sm font-bold shadow-md">Xác nhận & Thanh toán</button>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
      );
  }

  // --- VIEW 3: PAYMENT FORM ---
  if (currentStep === 3) {
      return (
        <div className="animate-fade-in max-w-2xl mx-auto">
             {renderProgressBar()}
             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="font-bold text-gray-800 text-lg flex items-center mb-6">
                    <CreditCard className="w-6 h-6 mr-2 text-teal-600" />
                    Thanh toán Dịch vụ
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Số tiền:</span>
                    <span className="text-xl font-bold text-teal-700 font-mono">{(totalAmount * 1.1).toLocaleString()} ₫</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Số thẻ</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-lg font-mono text-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Ngày hết hạn</label>
                            <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg font-mono outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">CVV</label>
                            <input type="text" placeholder="123" maxLength={3} className="w-full p-3 border rounded-lg font-mono outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-lg shadow-md mt-8 transition-colors text-sm uppercase tracking-wide"
                >
                    Thanh toán ngay
                </button>
             </div>

             {/* OTP MODAL */}
            {showOtpInput && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Smartphone className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Xác thực OTP</h3>
                            <p className="text-sm text-gray-500 mt-1">Mã xác thực đã được gửi đến SĐT của bạn</p>
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

  // --- VIEW 4: SUCCESS ---
  if (currentStep === 4) {
      return (
          <div className="animate-fade-in max-w-2xl mx-auto text-center pt-10">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                  <ShieldCheck className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký dịch vụ thành công!</h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                  Lệnh dịch vụ <span className="font-bold">{getServiceLabel(serviceType)}</span> đã được xác nhận.
                  <br/>Bộ phận hiện trường sẽ tiến hành thực hiện dịch vụ cho các container đã đăng ký.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-left max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Mã giao dịch</span>
                      <span className="font-mono font-bold text-teal-700">SVC-2023-998811</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Số lượng</span>
                      <span className="font-medium text-gray-800">{selectedContainerIds.length} Container</span>
                  </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Tổng tiền</span>
                      <span className="font-bold text-teal-600">{(totalAmount * 1.1).toLocaleString()} ₫</span>
                  </div>
              </div>

              <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                        setCurrentStep(1);
                        setContainers([]);
                        setSelectedContainerIds([]);
                        setDocNumber('');
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                      Tạo lệnh mới
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-colors">
                      Xem hóa đơn
                  </button>
              </div>
          </div>
      );
  }

  return null;
};

export default ServiceOrder;
