
import React, { useState } from 'react';
import { 
  Plus, Trash2, Truck, Ship, User, FileText, 
  CreditCard, CheckCircle, ArrowRight, Calendar, 
  Smartphone, Save, RefreshCw, X
} from 'lucide-react';
import { EmptyReturnContainer } from '../types';

const EmptyContainerInOrder: React.FC = () => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Info/List, 2: Billing, 3: Payment, 4: Success
  
  // Step 1: Info & List
  const [returnDate, setReturnDate] = useState('');
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    rep: '',
    phone: '',
    note: ''
  });
  const [transportMethod, setTransportMethod] = useState<'truck' | 'barge'>('truck');
  
  const [containers, setContainers] = useState<EmptyReturnContainer[]>([]);
  
  // Modal/Form for Add Container
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContainer, setNewContainer] = useState<Partial<EmptyReturnContainer>>({
    operator: '', containerNo: '', isoSize: '20DC'
  });

  // Step 2: Billing
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);

  // Step 3: Payment
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  // Helpers
  const totalAmount = containers.reduce((sum, c) => sum + c.fee, 0);

  const handleAddContainer = () => {
    if (!newContainer.containerNo || !newContainer.operator) return;
    
    const fee = newContainer.isoSize?.includes('40') ? 800000 : 500000;

    const container: EmptyReturnContainer = {
      id: Date.now().toString(),
      operator: newContainer.operator,
      containerNo: newContainer.containerNo,
      isoSize: newContainer.isoSize || '20DC',
      fee: fee
    };

    setContainers([...containers, container]);
    setIsModalOpen(false);
    setNewContainer({ operator: '', containerNo: '', isoSize: '20DC' });
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
          <div className="w-full xl:w-[400px] bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden flex-shrink-0">
             <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
                 <h3 className="font-bold text-sm uppercase">Thông tin lệnh hạ rỗng</h3>
                 <Calendar className="w-4 h-4 text-white/80" />
             </div>
             
             <div className="p-5 space-y-6">
                
                {/* DATE */}
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div>
                        Hạn trả rỗng
                   </label>
                   <div className="relative">
                      <input 
                        type="date" 
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none" 
                      />
                   </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* OWNER INFO */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div>
                        Thông tin chủ hàng
                   </label>
                   <input 
                        type="text" 
                        placeholder="Tên chủ hàng *" 
                        value={ownerInfo.name}
                        onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none" 
                   />
                   <div className="grid grid-cols-2 gap-3">
                        <input 
                            type="text" 
                            placeholder="Người đại diện" 
                            value={ownerInfo.rep}
                            onChange={(e) => setOwnerInfo({...ownerInfo, rep: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none" 
                        />
                        <input 
                            type="text" 
                            placeholder="Số điện thoại" 
                            value={ownerInfo.phone}
                            onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none" 
                        />
                   </div>
                   <textarea 
                        placeholder="Ghi chú (nếu có)" 
                        rows={2} 
                        value={ownerInfo.note}
                        onChange={(e) => setOwnerInfo({...ownerInfo, note: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                   ></textarea>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* TRANSPORT METHOD */}
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div>
                        Phương tiện vận chuyển
                   </label>
                   <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                            <input 
                                type="radio" 
                                name="transport_return" 
                                className="peer sr-only" 
                                checked={transportMethod === 'truck'}
                                onChange={() => setTransportMethod('truck')}
                            />
                            <div className="p-3 border border-gray-200 rounded-lg text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:bg-gray-50">
                                <Truck className="w-5 h-5 mx-auto mb-1 text-gray-600 peer-checked:text-orange-600" />
                                <span className="text-xs font-bold text-gray-600 peer-checked:text-orange-700">Xe chủ hàng</span>
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input 
                                type="radio" 
                                name="transport_return" 
                                className="peer sr-only" 
                                checked={transportMethod === 'barge'}
                                onChange={() => setTransportMethod('barge')}
                            />
                            <div className="p-3 border border-gray-200 rounded-lg text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:bg-gray-50">
                                <Ship className="w-5 h-5 mx-auto mb-1 text-gray-600 peer-checked:text-orange-600" />
                                <span className="text-xs font-bold text-gray-600 peer-checked:text-orange-700">Sà lan</span>
                            </div>
                        </label>
                    </div>
                </div>

             </div>
          </div>

          {/* RIGHT: CONTAINER LIST */}
          <div className="flex-grow w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
             
             {/* Header */}
             <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">4</span>
                    <h3 className="font-bold text-gray-700 text-sm uppercase">Danh sách Container Trả</h3>
                 </div>
                 
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors shadow-sm"
                 >
                    <Plus className="w-3.5 h-3.5 mr-1.5" /> Thêm Container
                 </button>
             </div>

             {/* Content */}
             <div className="flex-grow p-0 overflow-auto bg-gray-50/50">
                {containers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 border-2 border-dashed border-gray-200 m-4 rounded-xl">
                        <RefreshCw className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm font-medium text-gray-500">Chưa có container nào.</p>
                        <p className="text-xs text-gray-400 mt-1">Vui lòng bấm "Thêm Container" để nhập dữ liệu</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left bg-white">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">Hãng KT</th>
                                <th className="px-4 py-3">Số Container</th>
                                <th className="px-4 py-3">Kích cỡ</th>
                                <th className="px-4 py-3 text-right">Phí (VND)</th>
                                <th className="px-4 py-3 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((cont) => (
                                <tr key={cont.id} className="border-b hover:bg-orange-50 transition-colors">
                                    <td className="px-4 py-3 font-medium">{cont.operator}</td>
                                    <td className="px-4 py-3 font-bold text-blue-900 font-mono">{cont.containerNo}</td>
                                    <td className="px-4 py-3">{cont.isoSize}</td>
                                    <td className="px-4 py-3 text-right font-medium">{cont.fee.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button 
                                            onClick={() => handleRemoveContainer(cont.id)}
                                            className="text-red-400 hover:text-red-600 p-1"
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

             {/* Footer Actions */}
             <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
                 <div className="text-xs text-gray-500">
                     Tổng: <b className="text-gray-800">{containers.length}</b> container
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

        {/* MODAL ADD CONTAINER */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Thêm Container Trả Rỗng</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Hãng khai thác *</label>
                            <input 
                                type="text" 
                                placeholder="VD: MAERSK, SITC..."
                                className="w-full p-2 border rounded text-sm uppercase" 
                                value={newContainer.operator}
                                onChange={e => setNewContainer({...newContainer, operator: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Số Container *</label>
                            <input 
                                type="text" 
                                placeholder="VD: TCNU1234567"
                                className="w-full p-2 border rounded text-sm uppercase"
                                value={newContainer.containerNo}
                                onChange={e => setNewContainer({...newContainer, containerNo: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Kích cỡ (Size) *</label>
                            <select 
                                className="w-full p-2 border rounded text-sm"
                                value={newContainer.isoSize}
                                onChange={e => setNewContainer({...newContainer, isoSize: e.target.value})}
                            >
                                <option value="20DC">20DC</option>
                                <option value="40DC">40DC</option>
                                <option value="40HC">40HC</option>
                                <option value="45HC">45HC</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">Hủy</button>
                        <button 
                            onClick={handleAddContainer} 
                            className="px-6 py-2 bg-orange-600 text-white text-sm font-bold rounded hover:bg-orange-700 flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Thêm vào danh sách
                        </button>
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
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Xác nhận & Tính cước
                    </h3>
                 </div>

                 <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <h4 className="font-bold text-sm uppercase text-gray-500 border-b border-gray-100 pb-2">
                            Thông tin hóa đơn
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
                            Tổng hợp chi phí
                        </h4>
                        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Số lượng container</span><span className="font-bold">{containers.length}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Phí dịch vụ</span><span className="font-mono">{totalAmount.toLocaleString()} ₫</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">VAT (8%)</span><span className="font-mono">{(totalAmount * 0.08).toLocaleString()} ₫</span></div>
                            <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
                                <span className="text-blue-900 font-bold uppercase">Tổng thanh toán</span>
                                <span className="text-xl font-bold text-blue-700 font-mono">{(totalAmount * 1.08).toLocaleString()} ₫</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                             <div className="flex gap-3">
                                <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-bold border border-gray-200">Quay lại</button>
                                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg text-sm font-bold shadow-md flex items-center justify-center">
                                    <Save className="w-4 h-4 mr-2" /> Lưu (Chưa TT)
                                </button>
                             </div>
                             <button onClick={() => setCurrentStep(3)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold shadow-md uppercase">
                                 Xác nhận thanh toán
                             </button>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
      );
  }

  // --- VIEW 3: PAYMENT FORM & OTP ---
  if (currentStep === 3) {
      return (
        <div className="animate-fade-in max-w-2xl mx-auto">
             {renderProgressBar()}
             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="font-bold text-gray-800 text-lg flex items-center mb-6">
                    <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                    Thanh toán
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Số tiền:</span>
                    <span className="text-xl font-bold text-blue-700 font-mono">{(totalAmount * 1.08).toLocaleString()} ₫</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Số thẻ</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-lg font-mono text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Ngày hết hạn</label>
                            <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">CVV</label>
                            <input type="text" placeholder="123" maxLength={3} className="w-full p-3 border rounded-lg font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md mt-8 transition-colors text-sm uppercase tracking-wide"
                >
                    Thanh toán ngay
                </button>
             </div>

             {/* OTP MODAL */}
            {showOtpInput && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Smartphone className="w-8 h-8 text-blue-600" />
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
                                    className="w-10 h-12 border border-gray-300 rounded text-center text-xl font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            ))}
                        </div>

                        <button 
                            onClick={verifyOtp}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
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
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                  Lệnh hạ container rỗng đã được ghi nhận vào hệ thống.
                  <br/>Vui lòng mang theo lệnh điện tử khi đến cảng.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-left max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Loại lệnh</span>
                      <span className="font-bold text-gray-800">HẠ RỖNG (EMPTY RETURN)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Số lượng</span>
                      <span className="font-medium text-gray-800">{containers.length} Container</span>
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
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                      Tạo lệnh mới
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-colors">
                      Xem E-Ticket
                  </button>
              </div>
          </div>
      );
  }

  return null;
};

export default EmptyContainerInOrder;
