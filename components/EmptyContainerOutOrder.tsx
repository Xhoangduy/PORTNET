
import React, { useState } from 'react';
import { 
  CreditCard, CheckCircle, ArrowRight, User, Truck, Ship, 
  FileText, Calendar, Box, Smartphone, ShieldCheck, RefreshCw,
  Info
} from 'lucide-react';

const EmptyContainerOutOrder: React.FC = () => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Info, 2: Billing, 3: Payment, 4: Success
  
  // Step 1: Info
  const [bookingType, setBookingType] = useState<'specified' | 'unspecified'>('unspecified');
  const [bookingNo, setBookingNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isoSize, setIsoSize] = useState('20DC');
  const [transportMethod, setTransportMethod] = useState<'truck' | 'barge'>('truck');
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    rep: '',
    mst: '',
    phone: ''
  });

  // Step 2: Billing
  const [taxId, setTaxId] = useState('');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);

  // Helpers
  const unitPrice = isoSize.includes('40') ? 850000 : 550000;
  const totalAmount = quantity * unitPrice;

  const handleUpdateTaxInfo = () => {
    if (taxId === '0300000000') {
      setCompanyName('CÔNG TY TNHH THAY ĐỔI MỚI');
    } else {
      setCompanyName('CÔNG TY TNHH LOGISTICS MẪU');
    }
    setIsChangingTax(false);
  };

  // Render Progress Bar
  const renderProgressBar = () => (
    <div className="bg-white p-4 mb-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between px-4 md:px-10">
      <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>1</div>
        <span className="font-medium text-sm hidden sm:inline">Thông tin lệnh</span>
      </div>
      <div className={`flex-1 h-1 mx-2 rounded ${currentStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>2</div>
        <span className="font-medium text-sm hidden sm:inline">Tính cước</span>
      </div>
      <div className={`flex-1 h-1 mx-2 rounded ${currentStep >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>3</div>
        <span className="font-medium text-sm hidden sm:inline">Thanh toán</span>
      </div>
    </div>
  );

  // --- VIEW 1: REGISTRATION INFO ---
  if (currentStep === 1) {
    return (
      <div className="animate-fade-in relative">
        {renderProgressBar()}

        <div className="flex flex-col xl:flex-row gap-6 items-start h-full">
            
            {/* LEFT SIDEBAR: INPUTS */}
            <div className="w-full xl:w-[400px] bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden flex-shrink-0">
                <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase">Thông tin lệnh cấp rỗng</h3>
                    <Box className="w-4 h-4 text-white/80" />
                </div>
                
                <div className="p-5 space-y-6">
                    
                    {/* BOOKING INFO */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                            Loại Booking
                        </label>
                        <div className="flex gap-4 mb-2 bg-gray-50 p-2 rounded border border-gray-100">
                             <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    checked={bookingType === 'unspecified'} 
                                    onChange={() => setBookingType('unspecified')}
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="ml-2 text-xs font-bold text-gray-700">Chưa chỉ định</span>
                             </label>
                             <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    checked={bookingType === 'specified'} 
                                    onChange={() => setBookingType('specified')}
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="ml-2 text-xs font-bold text-gray-700">Chỉ định số Cont</span>
                             </label>
                        </div>

                        <input 
                            type="text" 
                            value={bookingNo}
                            onChange={(e) => setBookingNo(e.target.value)}
                            placeholder="Số Booking *"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm uppercase focus:ring-1 focus:ring-teal-500 outline-none"
                        />
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] text-gray-400 mb-1">Loại Container</label>
                                <select 
                                    value={isoSize}
                                    onChange={(e) => setIsoSize(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none"
                                >
                                    <option value="20DC">20DC</option>
                                    <option value="40DC">40DC</option>
                                    <option value="40HC">40HC</option>
                                    <option value="20RF">20RF</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] text-gray-400 mb-1">Số lượng</label>
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-[38px] bg-white border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <input 
                                        type="number" 
                                        value={quantity}
                                        readOnly
                                        className="w-full h-[38px] bg-gray-50 border-t border-b border-gray-300 text-center text-sm font-bold"
                                    />
                                    <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-8 h-[38px] bg-white border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] text-gray-400 mb-1">Hạn lệnh</label>
                            <input 
                                type="date" 
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" 
                            />
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
                        <input 
                            type="text" 
                            placeholder="Mã số thuế *" 
                            value={ownerInfo.mst}
                            onChange={(e) => {
                                setOwnerInfo({...ownerInfo, mst: e.target.value});
                                setTaxId(e.target.value);
                            }}
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
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    {/* TRANSPORT */}
                    <div className="space-y-3">
                       <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                            Phương thức vận chuyển
                       </label>
                       <div className="flex gap-4">
                            <label className="flex-1 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="transport_empty" 
                                    className="peer sr-only" 
                                    checked={transportMethod === 'truck'}
                                    onChange={() => setTransportMethod('truck')}
                                />
                                <div className="p-3 border border-gray-200 rounded-lg text-center peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:bg-gray-50">
                                    <Truck className="w-5 h-5 mx-auto mb-1 text-gray-600 peer-checked:text-teal-600" />
                                    <span className="text-xs font-bold text-gray-600 peer-checked:text-teal-700">Xe chủ hàng</span>
                                </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="transport_empty" 
                                    className="peer sr-only" 
                                    checked={transportMethod === 'barge'}
                                    onChange={() => setTransportMethod('barge')}
                                />
                                <div className="p-3 border border-gray-200 rounded-lg text-center peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:bg-gray-50">
                                    <Ship className="w-5 h-5 mx-auto mb-1 text-gray-600 peer-checked:text-teal-600" />
                                    <span className="text-xs font-bold text-gray-600 peer-checked:text-teal-700">Sà lan</span>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDEBAR: PREVIEW LIST */}
            <div className="flex-grow w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
                
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-teal-50/30 flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-600 text-xs font-bold">5</span>
                        <h3 className="font-bold text-gray-700 text-sm uppercase">Chi tiết yêu cầu</h3>
                     </div>
                </div>

                {/* Content */}
                <div className="flex-grow p-0 overflow-auto bg-gray-50/50">
                    {!bookingNo ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-10 h-10 opacity-20" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">Chưa có thông tin lệnh.</p>
                            <p className="text-xs text-gray-400 mt-1">Vui lòng nhập số Booking để tiếp tục</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left bg-white">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-3">Loại Container</th>
                                    <th className="px-6 py-3 text-center">Số lượng</th>
                                    <th className="px-6 py-3 text-right">Đơn giá (VND)</th>
                                    <th className="px-6 py-3 text-right">Thành tiền (VND)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-teal-50 transition-colors bg-white">
                                    <td className="px-6 py-4 font-bold text-blue-900">{isoSize}</td>
                                    <td className="px-6 py-4 text-center font-medium">{quantity}</td>
                                    <td className="px-6 py-4 text-right">{unitPrice.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-bold text-teal-600">{totalAmount.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
                     <div className="text-xs text-gray-500 flex items-center">
                         <Info className="w-3.5 h-3.5 mr-1" />
                         Tổng số lượng: <b className="text-gray-800 ml-1">{quantity}</b> container
                     </div>
                     <button 
                        onClick={() => setCurrentStep(2)}
                        disabled={!bookingNo}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center transition-all ${
                            bookingNo 
                            ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md' 
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

  // --- VIEW 2: BILLING (MST) ---
  if (currentStep === 2) {
      return (
          <div className="animate-fade-in max-w-4xl mx-auto">
             {renderProgressBar()}
             
             <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-teal-600" />
                        Xác nhận thông tin tính cước
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
                            <label className="block text-xs font-bold text-gray-700 mb-1">Tên công ty / Đơn vị</label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700">
                                {companyName}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Địa chỉ</label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600">
                                123 Đường Số 1, KCN Cát Lái, TP. Thủ Đức, TP.HCM
                            </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h4 className="font-bold text-sm uppercase text-gray-500 border-b border-gray-100 pb-2">
                            Chi tiết phí nâng rỗng
                        </h4>
                        <div className="bg-teal-50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Loại lệnh</span>
                                <span className="font-bold text-gray-800">CẤP RỖNG (EMPTY PICKUP)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Số lượng container</span>
                                <span className="font-bold">{quantity} x {isoSize}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Phí nâng (Chưa VAT)</span>
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
                        
                        <div className="flex gap-3">
                             <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-bold border border-gray-200">Quay lại</button>
                             <button onClick={() => setCurrentStep(3)} className="flex-[2] bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-sm font-bold shadow-md">Xác nhận</button>
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
                    Thanh toán
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Số tiền:</span>
                    <span className="text-xl font-bold text-teal-700 font-mono">{(totalAmount * 1.08).toLocaleString()} ₫</span>
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
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Tên chủ thẻ</label>
                        <input type="text" placeholder="NGUYEN VAN A" className="w-full p-3 border rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 uppercase" />
                    </div>
                </div>

                <button 
                    onClick={() => setCurrentStep(4)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-lg shadow-md mt-8 transition-colors text-sm uppercase tracking-wide"
                >
                    Thanh toán ngay
                </button>
             </div>
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
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                  Lệnh giao container rỗng (Empty Pickup) đã được khởi tạo.
                  <br/>Quý khách vui lòng kiểm tra email để nhận phiếu EDO.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-left max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Mã Booking</span>
                      <span className="font-mono font-bold text-teal-700">{bookingNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Số lượng</span>
                      <span className="font-medium text-gray-800">{quantity} x {isoSize}</span>
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
                        setBookingNo('');
                        setQuantity(1);
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                      Tạo lệnh mới
                  </button>
                  <button className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 shadow-md transition-colors">
                      In lệnh điện tử (EDO)
                  </button>
              </div>
          </div>
      );
  }

  return null;
};

export default EmptyContainerOutOrder;
