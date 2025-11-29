
import React, { useState } from 'react';
import { 
  Search, Package, Calendar, FileText, 
  CreditCard, CheckCircle, ArrowRight, Database, 
  Smartphone, RefreshCw, Truck, Anchor, Upload, X, Filter
} from 'lucide-react';
import { StuffingContainer } from '../types';

const StuffingOrder: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Info/List, 2: Billing, 3: Payment, 4: Success
  
  // Vessel & Booking Type
  const [vessel, setVessel] = useState('');
  const [bookingType, setBookingType] = useState<'specified' | 'unspecified'>('specified');
  
  // Common Inputs
  const [bookingNo, setBookingNo] = useState('');
  const [commodity, setCommodity] = useState('BachHoa');
  const [stuffingPlan, setStuffingPlan] = useState('DongTaiBai');
  const [deliveryMethod, setDeliveryMethod] = useState('XeChuHang');
  const [expiryDate, setExpiryDate] = useState('');
  
  // Specific: Unspecified Inputs
  const [operator, setOperator] = useState('');
  const [isoSize, setIsoSize] = useState('20DC');
  const [condition, setCondition] = useState('A');
  
  // Specific: Specified Inputs
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // Owner Info
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    rep: '',
    phone: '',
    note: ''
  });

  // Data List & Modal
  const [containers, setContainers] = useState<StuffingContainer[]>([]);
  const [selectedContainerIds, setSelectedContainerIds] = useState<string[]>([]);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockContainers, setStockContainers] = useState<StuffingContainer[]>([]); // Mock stock for selection

  // Step 2: Billing
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);

  // Step 3: Payment
  const [showOtpInput, setShowOtpInput] = useState(false);

  // --- HELPERS ---

  const getCommodityLabel = (val: string) => {
      switch(val) {
          case 'BachHoa': return 'Hàng Bách Hóa';
          case 'DongLanh': return 'Hàng Đông Lạnh';
          case 'NguyHiem': return 'Hàng Nguy Hiểm';
          default: return val;
      }
  };

  const getPlanLabel = (val: string) => {
      switch(val) {
          case 'DongTaiBai': return 'Đóng tại bãi';
          case 'DongTaiKho': return 'Đóng tại kho';
          default: return val;
      }
  };

  const handleOpenStockModal = () => {
      // Generate mock stock based on criteria
      const mockStock: StuffingContainer[] = [
          { id: 'S1', containerNo: 'TCNU100001', isoSize: isoSize, condition: condition, commodity: '', stuffingPlan: '', fee: 0 },
          { id: 'S2', containerNo: 'TCNU100002', isoSize: isoSize, condition: condition, commodity: '', stuffingPlan: '', fee: 0 },
          { id: 'S3', containerNo: 'MSKU200001', isoSize: isoSize, condition: condition, commodity: '', stuffingPlan: '', fee: 0 },
          { id: 'S4', containerNo: 'MSKU200002', isoSize: isoSize, condition: condition, commodity: '', stuffingPlan: '', fee: 0 },
      ];
      setStockContainers(mockStock);
      setIsStockModalOpen(true);
  };

  const handleSelectFromStock = (selectedIds: string[]) => {
      const selected = stockContainers.filter(c => selectedIds.includes(c.id));
      const formatted = selected.map(c => ({
          ...c,
          commodity: getCommodityLabel(commodity),
          stuffingPlan: getPlanLabel(stuffingPlan),
          fee: isoSize.includes('40') ? 1200000 : 800000
      }));
      setContainers([...containers, ...formatted]);
      setIsStockModalOpen(false);
  };

  const handleLoadData = () => {
    if (bookingType === 'unspecified') {
        // For unspecified, user should have used the modal. 
        // If they click Load Data without selecting, warn them or just show nothing.
        if (containers.length === 0) alert("Vui lòng chọn container từ danh sách tồn bãi trước.");
        return;
    }

    // Specified Flow: Mock a container tied to the booking
    const baseFee = 900000;
    const mockData: StuffingContainer[] = [
      { 
          id: '1', 
          containerNo: 'SPEC998877', 
          isoSize: '40HC', 
          condition: 'A', 
          commodity: getCommodityLabel(commodity), 
          stuffingPlan: getPlanLabel(stuffingPlan), 
          fee: baseFee 
      },
    ];
    setContainers(mockData);
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

  const totalAmount = containers.reduce((sum, c) => sum + c.fee, 0);

  const handlePayment = () => {
    setShowOtpInput(true);
  };

  const verifyOtp = () => {
    setTimeout(() => {
        setCurrentStep(4);
    }, 1000);
  };

  // Render Progress Bar
  const renderProgressBar = () => (
    <div className="bg-white p-4 mb-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between px-4 md:px-10">
      <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
        <span className="font-medium text-sm hidden sm:inline">Thông tin & Container</span>
      </div>
      <div className={`flex-1 h-1 mx-2 rounded ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
        <span className="font-medium text-sm hidden sm:inline">Tính cước</span>
      </div>
       <div className={`flex-1 h-1 mx-2 rounded ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
        <span className="font-medium text-sm hidden sm:inline">Thanh toán</span>
      </div>
    </div>
  );

  // --- VIEW 1: INFO & LIST ---
  if (currentStep === 1) {
    return (
      <div className="animate-fade-in relative">
        {renderProgressBar()}

        <div className="flex flex-col xl:flex-row gap-6 items-start h-full">
            
          {/* LEFT: ORDER INFO */}
          <div className="w-full xl:w-[450px] bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden flex-shrink-0">
             <div className="bg-amber-500 p-4 text-white flex justify-between items-center">
                 <h3 className="font-bold text-sm uppercase">Thông tin lệnh đóng hàng</h3>
                 <Package className="w-4 h-4 text-white/80" />
             </div>
             
             <div className="p-5 space-y-5">
                
                {/* VESSEL */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                        Chọn Tàu / Chuyến
                   </label>
                   <select 
                      value={vessel}
                      onChange={(e) => setVessel(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                   >
                       <option value="">-- Chọn tàu --</option>
                       <option value="KOTA LIHAT">KOTA LIHAT / KLI01N</option>
                       <option value="WAN HAI 305">WAN HAI 305 / W305N</option>
                   </select>
                </div>

                {/* BOOKING TYPE */}
                <div className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            name="bkType"
                            checked={bookingType === 'specified'} 
                            onChange={() => setBookingType('specified')}
                            className="mr-2 text-amber-600 focus:ring-amber-500" 
                        /> 
                        <span className="text-sm font-bold text-gray-700">Booking Chỉ định</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            name="bkType"
                            checked={bookingType === 'unspecified'} 
                            onChange={() => setBookingType('unspecified')}
                            className="mr-2 text-amber-600 focus:ring-amber-500" 
                        /> 
                        <span className="text-sm font-bold text-gray-700">Không Chỉ định</span>
                    </label>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* DYNAMIC FORM */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                        Thông tin Container
                    </label>
                    
                    <input 
                        type="text" 
                        placeholder="Số Booking *" 
                        value={bookingNo}
                        onChange={(e) => setBookingNo(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none uppercase" 
                    />

                    {bookingType === 'unspecified' && (
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                                type="text" 
                                placeholder="Hãng khai thác"
                                value={operator}
                                onChange={(e) => setOperator(e.target.value)}
                                className="col-span-2 w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none uppercase" 
                            />
                            <select 
                                value={isoSize} 
                                onChange={(e) => setIsoSize(e.target.value)}
                                className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                            >
                                <option value="20DC">20DC</option>
                                <option value="40HC">40HC</option>
                            </select>
                            <select 
                                value={condition} 
                                onChange={(e) => setCondition(e.target.value)}
                                className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                            >
                                <option value="A">Loại A</option>
                                <option value="B">Loại B</option>
                                <option value="C">Loại C</option>
                            </select>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                         <select 
                            value={commodity} 
                            onChange={(e) => setCommodity(e.target.value)}
                            className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                        >
                             <option value="BachHoa">Hàng Bách Hóa</option>
                             <option value="DongLanh">Hàng Đông Lạnh</option>
                             <option value="NguyHiem">Hàng Nguy Hiểm</option>
                         </select>
                         <select 
                            value={deliveryMethod} 
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                            className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                        >
                             <option value="XeChuHang">Xe chủ hàng</option>
                             <option value="XeCang">Xe cảng</option>
                         </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <select 
                            value={stuffingPlan} 
                            onChange={(e) => setStuffingPlan(e.target.value)}
                            className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                        >
                             <option value="DongTaiBai">Đóng tại bãi</option>
                             <option value="DongTaiKho">Đóng tại kho</option>
                         </select>
                         <input 
                            type="date" 
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none" 
                        />
                    </div>

                    {bookingType === 'specified' && (
                         <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-50 hover:bg-white transition-colors cursor-pointer">
                             <input type="file" className="hidden" id="file-upload" onChange={(e) => setAttachedFile(e.target.files?.[0] || null)} />
                             <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                                 <Upload className="w-5 h-5 text-gray-400 mb-1" />
                                 <span className="text-xs text-gray-500">{attachedFile ? attachedFile.name : 'Đính kèm file Booking'}</span>
                             </label>
                         </div>
                    )}
                    
                    {bookingType === 'unspecified' && (
                         <button 
                            onClick={handleOpenStockModal}
                            className="w-full py-2 bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-sm font-bold hover:bg-amber-200 flex items-center justify-center gap-2"
                         >
                             <Search className="w-4 h-4" /> Chọn Container Tồn Bãi
                         </button>
                    )}
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* OWNER INFO */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                        Thông tin chủ hàng
                    </label>
                    <input 
                        type="text" 
                        placeholder="Tên chủ hàng *" 
                        value={ownerInfo.name}
                        onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none" 
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input 
                            type="text" 
                            placeholder="Người đại diện" 
                            value={ownerInfo.rep}
                            onChange={(e) => setOwnerInfo({...ownerInfo, rep: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none" 
                        />
                        <input 
                            type="text" 
                            placeholder="Số điện thoại" 
                            value={ownerInfo.phone}
                            onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none" 
                        />
                    </div>
                </div>

                 {/* ACTION: Specified only here. Unspecified adds via modal. */}
                {bookingType === 'specified' && (
                    <button 
                        onClick={handleLoadData}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        <Database className="w-4 h-4" />
                        NẠP DỮ LIỆU
                    </button>
                )}

             </div>
          </div>

          {/* RIGHT: CONTAINER LIST */}
          <div className="flex-grow w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
             
             {/* Header */}
             <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold">5</span>
                    <h3 className="font-bold text-gray-700 text-sm uppercase">Danh sách Container Đóng Hàng</h3>
                 </div>
                 <div className="text-xs text-gray-500">
                     Tổng: <b className="text-amber-600">{containers.length}</b> container
                 </div>
             </div>

             {/* Content */}
             <div className="flex-grow p-0 overflow-auto bg-gray-50/50">
                {containers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Package className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Chưa có container.</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {bookingType === 'specified' ? 'Vui lòng nhập thông tin và bấm "Nạp dữ liệu"' : 'Vui lòng chọn container từ danh sách tồn bãi'}
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left bg-white">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">Container No</th>
                                <th className="px-4 py-3">Size</th>
                                <th className="px-4 py-3">Tình trạng</th>
                                <th className="px-4 py-3">Hàng hóa</th>
                                <th className="px-4 py-3">Phương án</th>
                                <th className="px-4 py-3 text-right">Phí đóng (VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((cont) => (
                                <tr key={cont.id} className="border-b hover:bg-amber-50 transition-colors">
                                    <td className="px-4 py-3 font-bold text-blue-900 font-mono">{cont.containerNo}</td>
                                    <td className="px-4 py-3">{cont.isoSize}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">
                                            {cont.condition}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-600">{cont.commodity}</td>
                                    <td className="px-4 py-3 text-amber-600">{cont.stuffingPlan}</td>
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
                     * Phí đóng hàng đã bao gồm phí nâng hạ
                 </div>
                 <button 
                    disabled={containers.length === 0}
                    onClick={() => setCurrentStep(2)}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center transition-all ${
                        containers.length > 0 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                 >
                     Tiếp theo <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
             </div>
          </div>
        </div>

        {/* MODAL: STOCK SELECTION */}
        {isStockModalOpen && (
             <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-scale-in flex flex-col max-h-[80vh]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Anchor className="w-5 h-5 text-amber-500" />
                            Chọn Container Tồn Bãi
                        </h3>
                        <button onClick={() => setIsStockModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-4 text-sm">
                        <div className="flex items-center gap-2"><span className="text-gray-500">Booking:</span> <b className="text-gray-800">{bookingNo}</b></div>
                        <div className="flex items-center gap-2"><span className="text-gray-500">Size:</span> <b className="text-gray-800">{isoSize}</b></div>
                        <div className="flex items-center gap-2"><span className="text-gray-500">Cond:</span> <b className="text-gray-800">{condition}</b></div>
                    </div>

                    <div className="flex-grow overflow-auto p-0">
                        <table className="w-full text-sm text-left">
                             <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0">
                                 <tr>
                                     <th className="px-4 py-3 w-10">#</th>
                                     <th className="px-4 py-3">Container No</th>
                                     <th className="px-4 py-3">Size</th>
                                     <th className="px-4 py-3">Vị trí</th>
                                     <th className="px-4 py-3">Ngày nhập</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {stockContainers.map(c => {
                                     const isSelected = selectedContainerIds.includes(c.id);
                                     return (
                                        <tr 
                                            key={c.id} 
                                            onClick={() => handleCheckboxChange(c.id)}
                                            className={`border-b cursor-pointer transition-colors ${isSelected ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
                                        >
                                            <td className="px-4 py-3">
                                                <input 
                                                    type="checkbox" 
                                                    checked={isSelected}
                                                    onChange={() => {}} // Handled by row click
                                                    className="rounded text-amber-600 focus:ring-amber-500"
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-bold font-mono text-blue-900">{c.containerNo}</td>
                                            <td className="px-4 py-3">{c.isoSize}</td>
                                            <td className="px-4 py-3 text-gray-500">A-02-0{c.id.slice(-1)}</td>
                                            <td className="px-4 py-3 text-gray-500">12/10/2023</td>
                                        </tr>
                                     );
                                 })}
                             </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
                        <span className="text-sm text-gray-600">Đã chọn: <b>{selectedContainerIds.length}</b></span>
                        <div className="flex gap-2">
                             <button onClick={() => setIsStockModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">Hủy</button>
                             <button 
                                onClick={() => {
                                    handleSelectFromStock(selectedContainerIds);
                                    setSelectedContainerIds([]); // Clear selection for next time
                                }}
                                className="px-6 py-2 bg-amber-600 text-white text-sm font-bold rounded hover:bg-amber-700"
                             >
                                Xác nhận
                             </button>
                        </div>
                    </div>
                </div>
             </div>
        )}
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
                        <FileText className="w-5 h-5 mr-2 text-amber-600" />
                        Xác nhận & Tính cước
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
                        <div className="bg-amber-50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Dịch vụ</span>
                                <span className="font-bold text-gray-800 uppercase">Đóng Hàng (Stuffing)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Số lượng container</span>
                                <span className="font-bold">{containers.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Thành tiền (Chưa VAT)</span>
                                <span className="font-mono">{totalAmount.toLocaleString()} ₫</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">VAT (8%)</span>
                                <span className="font-mono">{(totalAmount * 0.08).toLocaleString()} ₫</span>
                            </div>
                            <div className="border-t border-amber-200 pt-3 flex justify-between items-center">
                                <span className="text-amber-900 font-bold uppercase">Tổng thanh toán</span>
                                <span className="text-xl font-bold text-amber-700 font-mono">
                                    {(totalAmount * 1.08).toLocaleString()} ₫
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                             <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-bold border border-gray-200">Quay lại</button>
                             <button onClick={() => setCurrentStep(3)} className="flex-[2] bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg text-sm font-bold shadow-md">Xác nhận & Thanh toán</button>
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
                    <CreditCard className="w-6 h-6 mr-2 text-amber-600" />
                    Thanh toán
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Số tiền:</span>
                    <span className="text-xl font-bold text-amber-700 font-mono">{(totalAmount * 1.08).toLocaleString()} ₫</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Số thẻ</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-lg font-mono text-lg outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Ngày hết hạn</label>
                            <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg font-mono outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">CVV</label>
                            <input type="text" placeholder="123" maxLength={3} className="w-full p-3 border rounded-lg font-mono outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg shadow-md mt-8 transition-colors text-sm uppercase tracking-wide"
                >
                    Thanh toán ngay
                </button>
             </div>

             {/* OTP MODAL */}
            {showOtpInput && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Smartphone className="w-8 h-8 text-amber-600" />
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
                                    className="w-10 h-12 border border-gray-300 rounded text-center text-xl font-bold focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                />
                            ))}
                        </div>

                        <button 
                            onClick={verifyOtp}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors"
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
                  <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký lệnh đóng hàng thành công!</h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                  Lệnh đóng hàng đã được xác nhận.
                  <br/>Quý khách vui lòng kiểm tra email để nhận phiếu xác nhận dịch vụ.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-left max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Mã giao dịch</span>
                      <span className="font-mono font-bold text-amber-700">STF-2023-112233</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Loại Booking</span>
                      <span className="font-medium text-gray-800">{bookingType === 'specified' ? 'Chỉ định' : 'Không chỉ định'}</span>
                  </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Tổng tiền</span>
                      <span className="font-bold text-blue-600">{(totalAmount * 1.08).toLocaleString()} ₫</span>
                  </div>
              </div>

              <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                        setCurrentStep(1);
                        setContainers([]);
                        setSelectedContainerIds([]);
                        setBookingNo('');
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                      Tạo lệnh mới
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-colors">
                      Xem Phiếu
                  </button>
              </div>
          </div>
      );
  }

  return null;
};

export default StuffingOrder;
