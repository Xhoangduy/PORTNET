
import React, { useState } from 'react';
import { 
  Search, User, Truck, Ship, Calendar, FileText, 
  CreditCard, CheckCircle, ArrowRight,
  Database, RefreshCw, Smartphone, MapPin, Layers, Info, Check,
  ChevronRight, QrCode, Copy
} from 'lucide-react';
import { ImportContainer } from '../types';

const ImportContainerOrder: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  // Extend ImportContainer locally for the extra fields requested
  const [containers, setContainers] = useState<(ImportContainer & { commodity?: string; type?: string; note?: string })[]>([]);
  const [selectedContainerIds, setSelectedContainerIds] = useState<string[]>([]);
  
  // Form State
  const [billType, setBillType] = useState<'master' | 'house'>('master');
  const [doNumber, setDoNumber] = useState('');
  const [blNumber, setBlNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [storageExpiryDate, setStorageExpiryDate] = useState(''); // New state for Storage Expiry
  const [transportType, setTransportType] = useState<'truck' | 'barge'>('truck');
  
  const [ownerInfo, setOwnerInfo] = useState({
      name: '',
      rep: '',
      phone: '',
      note: ''
  });

  // Billing & Payment State
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false);

  // --- ACTIONS ---

  const handleLoadData = () => {
    // Simulate API call
    const mockData = [
      { id: '1', containerNo: 'MSC123456', size: '20DC', seal: 'MSC123456', weight: 18.5, vessel: 'MSC', status: 'Tại bãi', fee: 1500000, commodity: 'General', type: 'Nội địa', note: '' },
      { id: '2', containerNo: 'MAE654321', size: '40HC', seal: 'MAE654321', weight: 22.0, vessel: 'Maersk', status: 'Tại bãi', fee: 2800000, commodity: 'Reefer', type: 'Ngoại', note: '' },
      { id: '3', containerNo: 'EGL112233', size: '20DC', seal: 'EGL112233', weight: 15.0, vessel: 'Evergreen', status: 'Tại bãi', fee: 1500000, commodity: 'General', type: 'Nội địa', note: '' },
    ];
    setContainers(mockData);
    setCurrentStep(2); // Move to next step automatically on success
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedContainerIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const selectedContainers = containers.filter(c => selectedContainerIds.includes(c.id));
  
  // Calculate totals for the Invoice Table
  const subTotal = selectedContainers.reduce((sum, c) => sum + c.fee, 0);
  const vatAmount = subTotal * 0.08;
  const totalAmount = subTotal + vatAmount;

  const handleUpdateTaxInfo = () => {
    // Mock tax info update
    if (taxId === '0300000000') {
        setCompanyName('CÔNG TY TNHH KHÁCH HÀNG MỚI');
    } else {
        setCompanyName('CÔNG TY TNHH LOGISTICS MẪU');
    }
  };

  const handleConfirmBilling = () => {
      setShowPaymentQR(true);
  };

  // --- RENDER HELPERS ---

  const steps = [
      { id: 1, title: 'Thông tin lệnh' },
      { id: 2, title: 'Danh sách container' },
      { id: 3, title: 'Tính cước & Thanh toán' },
      { id: 4, title: 'Hoàn tất' },
  ];

  const renderProgressBar = () => (
    <div className="mb-10 mt-4 w-full max-w-4xl mx-auto px-4">
        <div className="flex items-center w-full">
            {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                    <React.Fragment key={step.id}>
                        {/* Step Node */}
                        <div className="relative flex flex-col items-center group cursor-pointer" onClick={() => isCompleted && setCurrentStep(step.id as any)}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all z-10 ${
                                isActive ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-110' : 
                                isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 
                                'bg-white border-gray-300 text-gray-400 group-hover:border-gray-400'
                            }`}>
                                {isCompleted ? <Check className="w-4 h-4"/> : step.id}
                            </div>
                            
                            {/* Label */}
                            <div className={`absolute top-10 w-32 text-center text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                isActive ? 'text-blue-700' : 
                                isCompleted ? 'text-blue-600' : 'text-gray-400'
                            }`}>
                                {step.title}
                            </div>
                        </div>

                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-2 transition-all duration-500 ${
                                isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                            }`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 animate-fade-in font-inter">
        
        {/* TOP: HORIZONTAL STEPPER */}
        {renderProgressBar()}

        {/* CONTENT AREA */}
        <div className="w-full">
            
            {/* STEP 1: INFORMATION FORM */}
            {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                    
                    {/* SECTION 1: LỆNH & VẬN CHUYỂN */}
                    <div className="mb-8">
                         <h3 className="text-blue-700 font-bold text-sm uppercase mb-4 pb-2 border-b border-gray-100 flex items-center">
                             <Layers className="w-4 h-4 mr-2" /> 1. Thông tin lệnh giao hàng
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Col 1 */}
                             <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Loại chứng từ</label>
                                    <div className="flex gap-3">
                                        <label className={`flex-1 flex items-center cursor-pointer p-3 border rounded-lg transition-colors ${billType === 'master' ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                                            <input type="radio" name="billType" checked={billType === 'master'} onChange={() => setBillType('master')} className="text-blue-600 focus:ring-blue-500" />
                                            <span className={`ml-2 text-sm font-medium ${billType === 'master' ? 'text-blue-700' : 'text-gray-900'}`}>Master Bill</span>
                                        </label>
                                        <label className={`flex-1 flex items-center cursor-pointer p-3 border rounded-lg transition-colors ${billType === 'house' ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                                            <input type="radio" name="billType" checked={billType === 'house'} onChange={() => setBillType('house')} className="text-blue-600 focus:ring-blue-500" />
                                            <span className={`ml-2 text-sm font-medium ${billType === 'house' ? 'text-blue-700' : 'text-gray-900'}`}>House Bill</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Số Vận Đơn (Bill No) <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        value={blNumber}
                                        onChange={(e) => setBlNumber(e.target.value)}
                                        placeholder="Nhập số Bill"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase placeholder-gray-400"
                                    />
                                </div>
                             </div>

                             {/* Col 2 */}
                             <div className="space-y-4">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Mã lệnh (D/O) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={doNumber}
                                            onChange={(e) => setDoNumber(e.target.value)}
                                            placeholder="Nhập số D/O"
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase placeholder-gray-400"
                                        />
                                        <span className="absolute right-3 top-2.5 text-gray-400"><FileText className="w-4 h-4" /></span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Hạn lệnh</label>
                                        <input 
                                            type="date" 
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Hạn lưu cont</label>
                                        <input 
                                            type="date" 
                                            value={storageExpiryDate}
                                            onChange={(e) => setStorageExpiryDate(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                         <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Phương thức</label>
                                         <div className="relative">
                                            <select 
                                                value={transportType}
                                                onChange={(e) => setTransportType(e.target.value as any)}
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                            >
                                                <option value="truck">Xe chủ hàng</option>
                                                <option value="barge">Sà lan</option>
                                            </select>
                                            <Truck className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                                         </div>
                                    </div>
                                </div>
                             </div>
                         </div>
                    </div>

                    {/* SECTION 2: CHỦ HÀNG */}
                    <div className="mb-6">
                         <h3 className="text-blue-700 font-bold text-sm uppercase mb-4 pb-2 border-b border-gray-100 flex items-center">
                             <User className="w-4 h-4 mr-2" /> 2. Thông tin chủ hàng
                         </h3>
                         
                         <div className="space-y-4">
                             <div>
                                <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Tên chủ hàng (Consignee) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={ownerInfo.name}
                                        onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})}
                                        placeholder="Nhập tên chủ hàng hoặc MST để tìm kiếm..."
                                        className="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                    />
                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Người đại diện</label>
                                    <input 
                                        type="text" 
                                        value={ownerInfo.rep}
                                        onChange={(e) => setOwnerInfo({...ownerInfo, rep: e.target.value})}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập tên người làm thủ tục"
                                    />
                                 </div>
                                 <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        value={ownerInfo.phone}
                                        onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập số điện thoại liên hệ"
                                    />
                                 </div>
                             </div>

                             <div>
                                <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Ghi chú</label>
                                <textarea 
                                    rows={2}
                                    value={ownerInfo.note}
                                    onChange={(e) => setOwnerInfo({...ownerInfo, note: e.target.value})}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    placeholder="Nhập ghi chú thêm..."
                                ></textarea>
                             </div>
                         </div>
                    </div>
                    
                    {/* FOOTER */}
                    <div className="flex justify-end pt-4 border-t border-gray-100">
                         <button 
                            onClick={handleLoadData}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center text-sm"
                        >
                            Tiếp theo <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>

                </div>
            )}

            {/* STEP 2: CONTAINER LIST */}
            {currentStep === 2 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                        <div>
                             <h3 className="font-bold text-gray-800 text-lg">Danh sách Container</h3>
                             <p className="text-xs text-gray-500 mt-1">Chọn container bạn muốn nhận hàng</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                            <span className="text-gray-500">Đã chọn:</span> 
                            <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded">{selectedContainerIds.length}</span> 
                            <span className="text-gray-400">/ {containers.length}</span>
                        </div>
                    </div>
                    
                    <div className="flex-grow overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 w-12 text-center">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 cursor-pointer accent-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedContainerIds(containers.map(c => c.id));
                                                else setSelectedContainerIds([]);
                                            }}
                                            checked={selectedContainerIds.length === containers.length && containers.length > 0}
                                        />
                                    </th>
                                    <th className="px-6 py-4">Container No</th>
                                    <th className="px-6 py-4 text-gray-900">Kích cỡ</th>
                                    <th className="px-6 py-4">Hãng tàu</th>
                                    <th className="px-6 py-4">Loại hàng</th>
                                    <th className="px-6 py-4">Nội/Ngoại</th>
                                    <th className="px-6 py-4">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {containers.map(cont => (
                                    <tr 
                                        key={cont.id} 
                                        className={`hover:bg-blue-50/50 transition-colors ${selectedContainerIds.includes(cont.id) ? 'bg-blue-50/30' : ''}`}
                                    >
                                        <td className="px-6 py-4 text-center">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 cursor-pointer accent-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                                                checked={selectedContainerIds.includes(cont.id)}
                                                onChange={() => handleCheckboxChange(cont.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-bold text-blue-900 font-mono">{cont.containerNo}</td>
                                        <td className="px-6 py-4 text-gray-900">{cont.size}</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">{cont.vessel}</td>
                                        <td className="px-6 py-4 text-gray-900">{cont.commodity}</td>
                                        <td className="px-6 py-4 text-gray-900">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${cont.type === 'Nội địa' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {cont.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">
                                            {cont.note}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                        <button onClick={() => setCurrentStep(1)} className="px-5 py-2.5 text-gray-600 font-bold text-sm hover:text-gray-800 transition-colors">
                            Quay lại
                        </button>
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => setCurrentStep(3)}
                                disabled={selectedContainerIds.length === 0}
                                className={`px-8 py-2.5 rounded-lg font-bold text-sm text-white shadow-md transition-all flex items-center ${selectedContainerIds.length > 0 ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
                            >
                                Tiếp tục <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 3: BILLING & PAYMENT */}
            {currentStep === 3 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h3 className="font-bold text-gray-800 text-lg mb-8 flex items-center border-b border-gray-100 pb-4">
                        <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                        Tính cước & Thanh toán
                    </h3>

                    {/* Top Section: Billing Info */}
                    <div className="mb-8">
                         <h4 className="font-bold text-sm text-gray-700 uppercase mb-4">Thông tin xuất hóa đơn</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Mã số thuế</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={taxId}
                                        onChange={(e) => setTaxId(e.target.value)}
                                        className="flex-grow p-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 outline-none"
                                    />
                                     <button 
                                        onClick={handleUpdateTaxInfo}
                                        className="px-3 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-200 font-medium text-xs"
                                     >
                                        Check
                                    </button>
                                </div>
                             </div>
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Thông tin khách hàng</label>
                                <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-medium min-h-[42px] flex items-center">
                                    {companyName}
                                </div>
                             </div>
                             <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Địa chỉ</label>
                                <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                                    123 Đường Số 1, KCN Cát Lái, TP. Thủ Đức, TP.HCM
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Middle Section: Detailed Fee Table */}
                    <div className="mb-8">
                         <div className="flex justify-between items-end mb-4">
                             <h4 className="font-bold text-sm text-gray-700 uppercase">Chi tiết cước phí</h4>
                             <div className="flex gap-4 text-sm">
                                 <span className="text-gray-500">Thành tiền: <b className="text-gray-900">{subTotal.toLocaleString()}</b></span>
                                 <span className="text-gray-500">Tiền thuế: <b className="text-gray-900">{vatAmount.toLocaleString()}</b></span>
                                 <span className="text-gray-500">Tổng tiền: <b className="text-blue-700 text-lg">{totalAmount.toLocaleString()}</b></span>
                             </div>
                         </div>
                         
                         <div className="overflow-x-auto border border-gray-200 rounded-lg">
                             <table className="w-full text-sm text-left">
                                 <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-bold">
                                     <tr>
                                         <th className="px-4 py-3 text-center w-10">
                                             <input type="checkbox" checked readOnly className="rounded border-gray-300 text-blue-600 bg-white" />
                                         </th>
                                         <th className="px-4 py-3">Diễn giải</th>
                                         <th className="px-4 py-3 text-center">Kích cỡ ISO</th>
                                         <th className="px-4 py-3 text-center">Loại hàng</th>
                                         <th className="px-4 py-3 text-center">Số lượng</th>
                                         <th className="px-4 py-3 text-right">Đơn giá</th>
                                         <th className="px-4 py-3 text-right">Thành tiền</th>
                                         <th className="px-4 py-3 text-center">VAT(%)</th>
                                         <th className="px-4 py-3 text-right">Tiền thuế</th>
                                         <th className="px-4 py-3 text-right">Tổng tiền</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-100 bg-white">
                                     {selectedContainers.map((cont) => (
                                        <tr key={cont.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-center">
                                                <input type="checkbox" checked readOnly className="rounded border-gray-300 text-blue-600 bg-white" />
                                            </td>
                                            <td className="px-4 py-3 text-gray-900">Cước hạ hàng cont tại bãi (Lift off cont at yard)</td>
                                            <td className="px-4 py-3 text-center text-gray-900">{cont.size}</td>
                                            <td className="px-4 py-3 text-center text-gray-900">{cont.commodity === 'General' ? 'GP' : cont.commodity}</td>
                                            <td className="px-4 py-3 text-center text-gray-900">1</td>
                                            <td className="px-4 py-3 text-right text-gray-900">{cont.fee.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right text-gray-900">{cont.fee.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center text-gray-900">8</td>
                                            <td className="px-4 py-3 text-right text-gray-900">{(cont.fee * 0.08).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900">{(cont.fee * 1.08).toLocaleString()}</td>
                                        </tr>
                                     ))}
                                     {/* Mock Additional Service Line for visual completeness */}
                                     <tr className="hover:bg-gray-50">
                                         <td className="px-4 py-3 text-center">
                                             <input type="checkbox" className="rounded border-gray-300 text-blue-600 bg-white" />
                                         </td>
                                         <td className="px-4 py-3 text-gray-900 underline decoration-dotted cursor-pointer hover:text-blue-600">Phí cắt seal tại bãi trung tâm (Cutting Seal at container yard)</td>
                                         <td className="px-4 py-3 text-center text-gray-900">22G0</td>
                                         <td className="px-4 py-3 text-center text-gray-900">*</td>
                                         <td className="px-4 py-3 text-center text-gray-900">0</td>
                                         <td className="px-4 py-3 text-right text-gray-900">45,000</td>
                                         <td className="px-4 py-3 text-right text-gray-900">0</td>
                                         <td className="px-4 py-3 text-center text-gray-900">8</td>
                                         <td className="px-4 py-3 text-right text-gray-900">0</td>
                                         <td className="px-4 py-3 text-right font-medium text-gray-900">0</td>
                                     </tr>
                                     <tr className="hover:bg-gray-50">
                                         <td className="px-4 py-3 text-center">
                                             <input type="checkbox" className="rounded border-gray-300 text-blue-600 bg-white" />
                                         </td>
                                         <td className="px-4 py-3 text-gray-900 underline decoration-dotted cursor-pointer hover:text-blue-600">Phí hạ bãi hun trùng</td>
                                         <td className="px-4 py-3 text-center text-gray-900">22G0</td>
                                         <td className="px-4 py-3 text-center text-gray-900">GP</td>
                                         <td className="px-4 py-3 text-center text-gray-900">0</td>
                                         <td className="px-4 py-3 text-right text-gray-900">290,000</td>
                                         <td className="px-4 py-3 text-right text-gray-900">0</td>
                                         <td className="px-4 py-3 text-center text-gray-900">8</td>
                                         <td className="px-4 py-3 text-right text-gray-900">0</td>
                                         <td className="px-4 py-3 text-right font-medium text-gray-900">0</td>
                                     </tr>
                                     <tr className="hover:bg-gray-50">
                                         <td className="px-4 py-3 text-center">
                                             <input type="checkbox" className="rounded border-gray-300 text-blue-600 bg-white" />
                                         </td>
                                         <td className="px-4 py-3 text-gray-900 underline decoration-dotted cursor-pointer hover:text-blue-600">Cước lắp thiết bị container treo - 01 lớp (Installing hanging platform into container - 01 platform)</td>
                                         <td className="px-4 py-3 text-center text-gray-900">22G0</td>
                                         <td className="px-4 py-3 text-center text-gray-900">*</td>
                                         <td className="px-4 py-3 text-center text-gray-900">0</td>
                                         <td className="px-4 py-3 text-right text-gray-900">10,000</td>
                                         <td className="px-4 py-3 text-right text-gray-900">0</td>
                                         <td className="px-4 py-3 text-center text-gray-900">8</td>
                                         <td className="px-4 py-3 text-right text-gray-900">0</td>
                                         <td className="px-4 py-3 text-right font-medium text-gray-900">0</td>
                                     </tr>
                                 </tbody>
                             </table>
                         </div>
                    </div>

                    {/* Bottom Action / QR Section */}
                    {!showPaymentQR ? (
                        <div className="flex justify-end pt-4 border-t border-gray-100 bg-white">
                             <div className="flex gap-4">
                                <button 
                                    onClick={() => setCurrentStep(2)}
                                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Quay lại
                                </button>
                                <button 
                                    onClick={handleConfirmBilling}
                                    className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md transition-colors text-sm"
                                >
                                    Xác nhận thanh toán
                                </button>
                             </div>
                        </div>
                    ) : (
                        <>
                            <div className="border-t border-gray-100 my-8"></div>
                            
                            <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
                                {/* Left: Payment Options & Instructions */}
                                <div className="w-full lg:w-1/3 space-y-4">
                                     <h4 className="font-bold text-sm text-gray-700 uppercase mb-2">Phương thức thanh toán</h4>
                                     <div className="flex items-center p-4 border border-blue-500 bg-blue-50 rounded-lg cursor-pointer shadow-sm relative">
                                         <div className="bg-white p-1 rounded border border-blue-100 mr-3">
                                            <QrCode className="w-6 h-6 text-blue-600" />
                                         </div>
                                         <span className="font-bold text-blue-800 text-sm">Thanh toán bằng mã QR - BIDV QR</span>
                                         <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-lg"></div>
                                     </div>

                                     <div className="flex items-center p-4 border border-transparent hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                                         <div className="bg-gray-100 p-1 rounded border border-gray-200 mr-3 group-hover:bg-white">
                                            <QrCode className="w-6 h-6 text-gray-500" />
                                         </div>
                                         <span className="font-medium text-gray-600 text-sm">Thanh toán bằng mã QR - MBBank QR</span>
                                     </div>
                                </div>

                                {/* Right: QR Display & Details */}
                                <div className="w-full lg:w-2/3 flex flex-col items-center border-l border-gray-100 pl-0 lg:pl-8">
                                    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-6">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_DEMO_BIDV" alt="Payment QR" className="w-48 h-48 mix-blend-multiply" />
                                    </div>

                                    <div className="w-full max-w-lg bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                        <div className="grid grid-cols-3 border-b border-gray-100">
                                            <div className="p-3 bg-gray-50 text-xs font-medium text-gray-500">Ngân hàng</div>
                                            <div className="col-span-2 p-3 text-sm font-bold text-blue-800">BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam</div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-100">
                                            <div className="p-3 bg-gray-50 text-xs font-medium text-gray-500">Số TK</div>
                                            <div className="col-span-2 p-3 text-sm font-mono font-medium text-gray-800 flex items-center justify-between">
                                                ITCITC25112
                                                <button className="text-gray-400 hover:text-blue-600"><Copy className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 border-b border-gray-100">
                                            <div className="p-3 bg-gray-50 text-xs font-medium text-gray-500">Số tiền</div>
                                            <div className="col-span-2 p-3 text-sm font-bold text-gray-800 flex items-center justify-between">
                                                {totalAmount.toLocaleString()} VND
                                                <button className="text-gray-400 hover:text-blue-600"><Copy className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <div className="p-3 bg-gray-50 text-xs font-medium text-gray-500">Nội dung</div>
                                            <div className="col-span-2 p-3 text-sm text-gray-600 flex items-center justify-between">
                                                Thanh toan lenh {blNumber}
                                                <button className="text-gray-400 hover:text-blue-600"><Copy className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-4 mb-2">Sau khi thanh toán, nhấn vào nút bên dưới</p>

                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setShowPaymentQR(false)} // Cancel / Go back to table
                                            className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 text-sm"
                                        >
                                            Hủy
                                        </button>
                                        <button 
                                            onClick={() => setCurrentStep(4)}
                                            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition-all text-sm"
                                        >
                                            Tôi đã hoàn tất thanh toán trên App
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* STEP 4: SUCCESS */}
            {currentStep === 4 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce-small">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Giao dịch thành công!</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                        Lệnh giao container đã được khởi tạo thành công. Mã giao dịch của bạn là <span className="font-mono font-bold text-gray-800">IMP-2023-8899</span>. 
                        <br/>Vui lòng kiểm tra email để nhận E-Ticket.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => { setCurrentStep(1); setContainers([]); setShowPaymentQR(false); }} className="px-6 py-3 border border-gray-200 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">
                            Tạo lệnh mới
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-colors flex items-center">
                            <Info className="w-4 h-4 mr-2" />
                            Xem chi tiết lệnh
                        </button>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};

export default ImportContainerOrder;
