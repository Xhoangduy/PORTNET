
import React, { useState } from 'react';
import { 
  Plus, Upload, Trash2, Ship, Truck, User, FileText, 
  CreditCard, CheckCircle, ArrowRight, Save, X, Calendar, 
  RefreshCw, Sheet, Check, Box, ChevronRight, QrCode, Copy, Layers, ArrowLeft
} from 'lucide-react';
import { ExportContainer } from '../types';

const ExportContainerOrder: React.FC = () => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); 
  
  // Step 1: Order Information
  const [vesselInfo, setVesselInfo] = useState('');
  const [transportMethod, setTransportMethod] = useState<'truck' | 'barge'>('truck');
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    rep: '',
    phone: '',
    note: ''
  });

  // Step 2: Container List
  const [containers, setContainers] = useState<ExportContainer[]>([]);
  
  // Modal State for Manual Entry
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Extended state for the modal form to include all new fields
  const [newContainer, setNewContainer] = useState<any>({
    bookingNo: '', 
    containerNo: '', 
    size: '20DC', 
    operator: 'MAERSK',
    weight: '', 
    commodity: 'General',
    transshipmentPort: '',
    seal: '', 
    customsSeal: '',
    pod: '',
    type: 'Ngoại'
  });

  // Step 3: Billing & Payment
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false);

  // Helpers
  const subTotal = containers.reduce((sum, c) => sum + (c.fee || 0), 0);
  const vatAmount = subTotal * 0.08;
  const totalAmount = subTotal + vatAmount;

  const handleAddContainer = () => {
    if (!newContainer.containerNo || !newContainer.bookingNo) return;
    
    const container: ExportContainer = {
      id: Date.now().toString(),
      bookingNo: newContainer.bookingNo || '',
      containerNo: newContainer.containerNo || '',
      size: newContainer.size || '20DC',
      seal: newContainer.seal || '',
      weight: Number(newContainer.weight) || 0,
      pod: newContainer.pod || '',
      fee: newContainer.size?.includes('40') ? 1200000 : 850000, // Mock fee
    };

    setContainers([...containers, container]);
    setIsModalOpen(false);
    // Reset form but keep booking no for convenience
    setNewContainer({ 
        ...newContainer, 
        containerNo: '', 
        seal: '', 
        customsSeal: '',
        weight: '' 
    });
  };

  const handleRemoveContainer = (id: string) => {
    setContainers(containers.filter(c => c.id !== id));
  };

  const handleUpdateTaxInfo = () => {
    if (taxId === '0300000000') {
      setCompanyName('CÔNG TY TNHH THAY ĐỔI MỚI');
    } else {
      setCompanyName('CÔNG TY TNHH LOGISTICS MẪU');
    }
    setIsChangingTax(false);
  };

  const handleConfirmBilling = () => {
      setShowPaymentQR(true);
  };

  // --- RENDER SECTIONS ---

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
        {renderProgressBar()}

        <div className="w-full">
            
            {/* STEP 1: INFO */}
            {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                    {/* SECTION 1 */}
                    <div className="mb-8">
                         <h3 className="text-blue-700 font-bold text-sm uppercase mb-4 pb-2 border-b border-gray-100 flex items-center">
                             <Layers className="w-4 h-4 mr-2" /> 1. Thông tin lệnh hạ hàng
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Chọn Tàu / Chuyến <span className="text-red-500">*</span></label>
                                    <select 
                                        value={vesselInfo}
                                        onChange={(e) => setVesselInfo(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">-- Chọn tàu --</option>
                                        <option value="KOTA LIHAT/KLI01N">KOTA LIHAT / KLI01N</option>
                                        <option value="WAN HAI 305/W305N">WAN HAI 305 / W305N</option>
                                        <option value="ST EVER/088N">ST EVER / 088N</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">ETB (Dự kiến)</label>
                                        <input type="text" disabled value={vesselInfo ? "16/11/2021" : ""} className="w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-500" />
                                     </div>
                                     <div>
                                        <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">ETD (Dự kiến)</label>
                                        <input type="text" disabled value={vesselInfo ? "17/11/2021" : ""} className="w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-500" />
                                     </div>
                                </div>
                             </div>

                             <div className="space-y-4">
                                 <div>
                                     <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Phương thức vận chuyển</label>
                                     <div className="flex gap-4">
                                        <label className={`flex-1 flex items-center cursor-pointer p-3 border rounded-lg transition-colors ${transportMethod === 'truck' ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                                            <input type="radio" checked={transportMethod === 'truck'} onChange={() => setTransportMethod('truck')} className="text-blue-600 focus:ring-blue-500" />
                                            <span className={`ml-2 text-sm font-medium ${transportMethod === 'truck' ? 'text-blue-700' : 'text-gray-900'}`}>Xe chủ hàng</span>
                                        </label>
                                        <label className={`flex-1 flex items-center cursor-pointer p-3 border rounded-lg transition-colors ${transportMethod === 'barge' ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                                            <input type="radio" checked={transportMethod === 'barge'} onChange={() => setTransportMethod('barge')} className="text-blue-600 focus:ring-blue-500" />
                                            <span className={`ml-2 text-sm font-medium ${transportMethod === 'barge' ? 'text-blue-700' : 'text-gray-900'}`}>Sà lan</span>
                                        </label>
                                    </div>
                                 </div>
                             </div>
                         </div>
                    </div>

                    {/* SECTION 2 */}
                    <div className="mb-6">
                         <h3 className="text-blue-700 font-bold text-sm uppercase mb-4 pb-2 border-b border-gray-100 flex items-center">
                             <User className="w-4 h-4 mr-2" /> 2. Thông tin chủ hàng
                         </h3>
                         
                         <div className="space-y-4">
                             <div>
                                <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Tên chủ hàng <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={ownerInfo.name}
                                    onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})}
                                    placeholder="Nhập tên chủ hàng..."
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                />
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Người đại diện</label>
                                    <input 
                                        type="text" 
                                        value={ownerInfo.rep}
                                        onChange={(e) => setOwnerInfo({...ownerInfo, rep: e.target.value})}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Tên người làm thủ tục"
                                    />
                                 </div>
                                 <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        value={ownerInfo.phone}
                                        onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="SĐT liên hệ"
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
                                    placeholder="Ghi chú thêm..."
                                ></textarea>
                             </div>
                         </div>
                    </div>
                    
                    {/* FOOTER */}
                    <div className="flex justify-end pt-4 border-t border-gray-100">
                         <button 
                            disabled={!vesselInfo}
                            onClick={() => setCurrentStep(2)}
                            className={`px-6 py-2.5 rounded-lg shadow-md font-bold text-sm flex items-center transition-all ${
                                vesselInfo 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
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
                             <h3 className="font-bold text-gray-800 text-lg">Danh sách Container Hạ</h3>
                             <p className="text-xs text-gray-500 mt-1">Quản lý danh sách container cần hạ bãi</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors">
                                <Sheet className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Excel
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors shadow-sm"
                            >
                                <Plus className="w-3.5 h-3.5 mr-1.5" /> Thêm Container
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-grow overflow-auto p-0">
                        {containers.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10">
                                <Upload className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-sm font-medium text-gray-500">Chưa có container nào.</p>
                                <p className="text-xs text-gray-400 mt-1">Vui lòng thêm thủ công hoặc tải lên file Excel</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left bg-white">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Booking No</th>
                                        <th className="px-6 py-4">Số Container</th>
                                        <th className="px-6 py-4 text-center">Size/Type</th>
                                        <th className="px-6 py-4">Seal</th>
                                        <th className="px-6 py-4 text-center">Trọng lượng (KG)</th>
                                        <th className="px-6 py-4">POD</th>
                                        <th className="px-6 py-4 text-right">Phí (VND)</th>
                                        <th className="px-6 py-4 text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {containers.map((cont) => (
                                        <tr key={cont.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{cont.bookingNo}</td>
                                            <td className="px-6 py-4 font-bold text-blue-900 font-mono">{cont.containerNo}</td>
                                            <td className="px-6 py-4 text-center text-gray-900">{cont.size}</td>
                                            <td className="px-6 py-4 font-mono text-gray-900">{cont.seal}</td>
                                            <td className="px-6 py-4 text-center text-gray-900">{cont.weight}</td>
                                            <td className="px-6 py-4 text-gray-900">{cont.pod}</td>
                                            <td className="px-6 py-4 text-right font-medium text-gray-900">{cont.fee.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button 
                                                    onClick={() => handleRemoveContainer(cont.id)}
                                                    className="text-red-400 hover:text-red-600 p-1 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                        <button onClick={() => setCurrentStep(1)} className="px-5 py-2.5 text-gray-600 font-bold text-sm hover:text-gray-800 transition-colors">
                            Quay lại
                        </button>
                        <button 
                            disabled={containers.length === 0}
                            onClick={() => setCurrentStep(3)}
                            className={`px-8 py-2.5 rounded-lg font-bold text-sm text-white shadow-md flex items-center transition-all ${
                                containers.length > 0 
                                ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg' 
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            Tiếp tục <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
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
                                         <th className="px-4 py-3 text-center">Số lượng</th>
                                         <th className="px-4 py-3 text-right">Đơn giá</th>
                                         <th className="px-4 py-3 text-right">Thành tiền</th>
                                         <th className="px-4 py-3 text-center">VAT(%)</th>
                                         <th className="px-4 py-3 text-right">Tiền thuế</th>
                                         <th className="px-4 py-3 text-right">Tổng tiền</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-100 bg-white">
                                     {containers.map((cont) => (
                                        <tr key={cont.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-center">
                                                <input type="checkbox" checked readOnly className="rounded border-gray-300 text-blue-600 bg-white" />
                                            </td>
                                            <td className="px-4 py-3 text-gray-900">Cước nâng hàng cont tại bãi (Lift on cont at yard)</td>
                                            <td className="px-4 py-3 text-center text-gray-900">{cont.size}</td>
                                            <td className="px-4 py-3 text-center text-gray-900">1</td>
                                            <td className="px-4 py-3 text-right text-gray-900">{cont.fee.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right text-gray-900">{cont.fee.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center text-gray-900">8</td>
                                            <td className="px-4 py-3 text-right text-gray-900">{(cont.fee * 0.08).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900">{(cont.fee * 1.08).toLocaleString()}</td>
                                        </tr>
                                     ))}
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
                                {/* Left: Payment Options */}
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
                                                Thanh toan lenh EXPORT
                                                <button className="text-gray-400 hover:text-blue-600"><Copy className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-4 mb-2">Sau khi thanh toán, nhấn vào nút bên dưới</p>

                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setShowPaymentQR(false)} 
                                            className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 text-sm"
                                        >
                                            Hủy
                                        </button>
                                        <button 
                                            onClick={() => setCurrentStep(4)}
                                            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all text-sm"
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
                        Lệnh hạ container đã được khởi tạo thành công. Mã giao dịch của bạn là <span className="font-mono font-bold text-gray-800">EXP-2023-9988</span>. 
                        <br/>Vui lòng kiểm tra email để nhận E-Ticket.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => { setCurrentStep(1); setContainers([]); setShowPaymentQR(false); }} className="px-6 py-3 border border-gray-200 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">
                            Tạo lệnh mới
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-colors flex items-center">
                            <Box className="w-4 h-4 mr-2" />
                            Xem chi tiết lệnh
                        </button>
                    </div>
                </div>
            )}

        </div>

        {/* MODAL ADD MANUAL */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl animate-scale-in">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg">Thêm mới container</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6"/></button>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* ROW 1 */}
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                   <FileText className="w-4 h-4"/> SỐ BOOKING *
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase" 
                                    value={newContainer.bookingNo}
                                    onChange={e => setNewContainer({...newContainer, bookingNo: e.target.value})}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                   <Box className="w-4 h-4"/> SỐ CONTAINER *
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase"
                                    value={newContainer.containerNo}
                                    onChange={e => setNewContainer({...newContainer, containerNo: e.target.value})}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                    <Layers className="w-4 h-4"/> KÍCH CỠ ISO *
                                </label>
                                <select 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newContainer.size}
                                    onChange={e => setNewContainer({...newContainer, size: e.target.value})}
                                >
                                    <option value="20DC">20DC</option>
                                    <option value="40DC">40DC</option>
                                    <option value="40HC">40HC</option>
                                    <option value="45HC">45HC</option>
                                </select>
                            </div>

                            {/* ROW 2 */}
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                    <User className="w-4 h-4"/> HÃNG KHAI THÁC *
                                </label>
                                <select 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newContainer.operator}
                                    onChange={e => setNewContainer({...newContainer, operator: e.target.value})}
                                >
                                    <option value="MAERSK">MAERSK</option>
                                    <option value="MSC">MSC</option>
                                    <option value="ONE">ONE</option>
                                    <option value="COSCO">COSCO</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                    <Box className="w-4 h-4"/> TRỌNG LƯỢNG (TẤN) (VGM) *
                                </label>
                                <input 
                                    type="number" 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newContainer.weight}
                                    onChange={e => setNewContainer({...newContainer, weight: e.target.value})}
                                />
                            </div>
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                   <Layers className="w-4 h-4"/> HÀNG HÓA *
                                </label>
                                <select 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newContainer.commodity}
                                    onChange={e => setNewContainer({...newContainer, commodity: e.target.value})}
                                >
                                    <option value="General">Bách Hóa (General)</option>
                                    <option value="Reefer">Lạnh (Reefer)</option>
                                    <option value="DG">Nguy hiểm (DG)</option>
                                </select>
                            </div>

                            {/* ROW 3 */}
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                    <Ship className="w-4 h-4"/> CẢNG CHUYỂN TẢI *
                                </label>
                                <select 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newContainer.transshipmentPort}
                                    onChange={e => setNewContainer({...newContainer, transshipmentPort: e.target.value})}
                                >
                                    <option value="">-- Chọn Cảng --</option>
                                    <option value="SGSIN">SINGAPORE</option>
                                    <option value="MYPKG">PORT KLANG</option>
                                    <option value="CNSHA">SHANGHAI</option>
                                </select>
                            </div>
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                    <Box className="w-4 h-4"/> SỐ CHÌ HÃNG TÀU *
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase"
                                    value={newContainer.seal}
                                    onChange={e => setNewContainer({...newContainer, seal: e.target.value})}
                                />
                            </div>
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                    <Box className="w-4 h-4"/> SỐ CHÌ HẢI QUAN
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 uppercase"
                                    value={newContainer.customsSeal}
                                    onChange={e => setNewContainer({...newContainer, customsSeal: e.target.value})}
                                />
                            </div>

                             {/* ROW 4 */}
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                   <Ship className="w-4 h-4"/> CẢNG ĐÍCH *
                                </label>
                                <select 
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={newContainer.pod}
                                    onChange={e => setNewContainer({...newContainer, pod: e.target.value})}
                                >
                                    <option value="">-- Chọn Cảng --</option>
                                    <option value="USLAX">LOS ANGELES, CA</option>
                                    <option value="USNYC">NEW YORK, NY</option>
                                    <option value="DEHAM">HAMBURG</option>
                                </select>
                            </div>
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1">
                                   <Layers className="w-4 h-4"/> NỘI / NGOẠI
                                </label>
                                <div className="flex gap-4 h-[42px] items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="contType"
                                            checked={newContainer.type === 'Nội địa'} 
                                            onChange={() => setNewContainer({...newContainer, type: 'Nội địa'})}
                                            className="mr-2 text-blue-600 focus:ring-blue-500" 
                                        /> 
                                        <span className="text-sm font-medium text-gray-700">Nội địa</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="contType"
                                            checked={newContainer.type === 'Ngoại'} 
                                            onChange={() => setNewContainer({...newContainer, type: 'Ngoại'})}
                                            className="mr-2 text-blue-600 focus:ring-blue-500" 
                                        /> 
                                        <span className="text-sm font-medium text-gray-700">Ngoại</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-200 rounded font-bold">Hủy bỏ</button>
                        <button 
                            onClick={handleAddContainer} 
                            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 flex items-center shadow-md"
                        >
                            <Save className="w-4 h-4 mr-2" /> Lưu Container
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ExportContainerOrder;
