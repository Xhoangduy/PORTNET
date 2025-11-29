import React, { useState } from 'react';
import { 
  Plus, Upload, Trash2, Ship, Truck, User, FileText, 
  CreditCard, CheckCircle, ArrowRight, Save, X, Calendar, 
  RefreshCw, Sheet
} from 'lucide-react';
import { ExportContainer } from '../types';

const ExportContainerOrder: React.FC = () => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Info/List, 2: Billing, 3: Payment, 4: Success
  const [containers, setContainers] = useState<ExportContainer[]>([]);
  
  // Modal State for Manual Entry
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContainer, setNewContainer] = useState<Partial<ExportContainer>>({
    bookingNo: '', containerNo: '', size: '20DC', seal: '', weight: 0, pod: ''
  });

  // Step 2: Billing
  const [taxId, setTaxId] = useState('0312345678');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH LOGISTICS MẪU');
  const [isChangingTax, setIsChangingTax] = useState(false);

  // Helpers
  const totalAmount = containers.reduce((sum, c) => sum + (c.fee || 0), 0);

  const handleAddContainer = () => {
    if (!newContainer.containerNo || !newContainer.bookingNo) return;
    
    const container: ExportContainer = {
      id: Date.now().toString(),
      bookingNo: newContainer.bookingNo || '',
      containerNo: newContainer.containerNo || '',
      size: newContainer.size || '20DC',
      seal: newContainer.seal || '',
      weight: newContainer.weight || 0,
      pod: newContainer.pod || '',
      fee: newContainer.size?.includes('40') ? 2200000 : 1200000, // Mock fee calculation
    };

    setContainers([...containers, container]);
    setIsModalOpen(false);
    // Reset form
    setNewContainer({ bookingNo: '', containerNo: '', size: '20DC', seal: '', weight: 0, pod: '' });
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

  // --- RENDER SECTIONS ---

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

  // VIEW 1: INFO & LIST
  if (currentStep === 1) {
    return (
      <div className="animate-fade-in relative">
        {renderProgressBar()}

        <div className="flex flex-col xl:flex-row gap-6 items-start h-full">
          
          {/* LEFT SIDEBAR: ORDER INFO */}
          <div className="w-full xl:w-[400px] bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden flex-shrink-0">
             <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
                 <h3 className="font-bold text-sm uppercase">Thông tin lệnh hạ</h3>
                 <Ship className="w-4 h-4 text-white/80" />
             </div>
             
             <div className="p-5 space-y-6">
                
                {/* VESSEL INFO */}
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Chọn Tàu / Chuyến
                   </label>
                   <div className="relative">
                      <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none">
                        <option>-- Chọn tàu --</option>
                        <option>KOTA LIHAT / KLI01N</option>
                        <option>WAN HAI 305 / W305N</option>
                        <option>ST EVER / 088N</option>
                      </select>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div>
                         <span className="text-[10px] text-gray-400">ETB (Dự kiến cập)</span>
                         <input type="text" disabled value="16/11/2021" className="w-full p-2 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500" />
                      </div>
                      <div>
                         <span className="text-[10px] text-gray-400">ETD (Dự kiến rời)</span>
                         <input type="text" disabled value="17/11/2021" className="w-full p-2 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500" />
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
                   <input type="text" placeholder="Tên chủ hàng *" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                   <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Người đại diện" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                        <input type="text" placeholder="Số điện thoại" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                   </div>
                   <textarea placeholder="Ghi chú (nếu có)" rows={2} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none"></textarea>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* TRANSPORT METHOD */}
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                        Phương tiện vận chuyển
                   </label>
                   <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="transport_export" className="peer sr-only" defaultChecked />
                            <div className="p-3 border border-gray-200 rounded-lg text-center peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:bg-gray-50">
                                <Truck className="w-5 h-5 mx-auto mb-1 text-gray-600 peer-checked:text-teal-600" />
                                <span className="text-xs font-bold text-gray-600 peer-checked:text-teal-700">Xe chủ hàng</span>
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="transport_export" className="peer sr-only" />
                            <div className="p-3 border border-gray-200 rounded-lg text-center peer-checked:border-teal-500 peer-checked:bg-teal-50 transition-all hover:bg-gray-50">
                                <Ship className="w-5 h-5 mx-auto mb-1 text-gray-600 peer-checked:text-teal-600" />
                                <span className="text-xs font-bold text-gray-600 peer-checked:text-teal-700">Sà lan</span>
                            </div>
                        </label>
                    </div>
                </div>

             </div>
          </div>

          {/* RIGHT CONTENT: CONTAINER LIST */}
          <div className="flex-grow w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
             
             {/* Toolbar */}
             <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-600 text-xs font-bold">4</span>
                    <h3 className="font-bold text-gray-700 text-sm uppercase">Danh sách Container Hạ</h3>
                 </div>
                 
                 <div className="flex items-center gap-2">
                     <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors shadow-sm"
                     >
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Thêm Cont (Trực tiếp)
                     </button>
                     <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors">
                        <Sheet className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Excel
                     </button>
                 </div>
             </div>

             {/* Content: List or Excel Dropzone */}
             <div className="flex-grow p-0 overflow-auto bg-gray-50/50">
                {containers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 border-2 border-dashed border-gray-200 m-4 rounded-xl">
                        <Upload className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm font-medium text-gray-500">Chưa có container nào.</p>
                        <p className="text-xs text-gray-400 mt-1">Vui lòng thêm thủ công hoặc tải lên file Excel</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left bg-white">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">Booking No</th>
                                <th className="px-4 py-3">Số Container</th>
                                <th className="px-4 py-3">Size/Type</th>
                                <th className="px-4 py-3">Seal</th>
                                <th className="px-4 py-3">Trọng lượng (KG)</th>
                                <th className="px-4 py-3">Cảng đích (POD)</th>
                                <th className="px-4 py-3 text-right">Phí (VND)</th>
                                <th className="px-4 py-3 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((cont) => (
                                <tr key={cont.id} className="border-b hover:bg-teal-50 transition-colors">
                                    <td className="px-4 py-3 font-medium">{cont.bookingNo}</td>
                                    <td className="px-4 py-3 font-bold text-blue-900 font-mono">{cont.containerNo}</td>
                                    <td className="px-4 py-3">{cont.size}</td>
                                    <td className="px-4 py-3 font-mono">{cont.seal}</td>
                                    <td className="px-4 py-3">{cont.weight}</td>
                                    <td className="px-4 py-3">{cont.pod}</td>
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

        {/* MODAL ADD MANUAL */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-scale-in">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Thêm Container</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Số Booking *</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded text-sm uppercase" 
                                    value={newContainer.bookingNo}
                                    onChange={e => setNewContainer({...newContainer, bookingNo: e.target.value})}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Số Container *</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded text-sm uppercase"
                                    value={newContainer.containerNo}
                                    onChange={e => setNewContainer({...newContainer, containerNo: e.target.value})}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Kích cỡ (Size) *</label>
                                <select 
                                    className="w-full p-2 border rounded text-sm"
                                    value={newContainer.size}
                                    onChange={e => setNewContainer({...newContainer, size: e.target.value})}
                                >
                                    <option value="20DC">20DC</option>
                                    <option value="40DC">40DC</option>
                                    <option value="40HC">40HC</option>
                                    <option value="45HC">45HC</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Trọng lượng (KG)</label>
                                <input 
                                    type="number" 
                                    className="w-full p-2 border rounded text-sm"
                                    value={newContainer.weight || ''}
                                    onChange={e => setNewContainer({...newContainer, weight: Number(e.target.value)})}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Số Seal</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded text-sm uppercase"
                                    value={newContainer.seal}
                                    onChange={e => setNewContainer({...newContainer, seal: e.target.value})}
                                />
                            </div>
                             <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Cảng đích (POD)</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded text-sm uppercase"
                                    value={newContainer.pod}
                                    onChange={e => setNewContainer({...newContainer, pod: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">Hủy</button>
                        <button 
                            onClick={handleAddContainer} 
                            className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" /> Lưu & Đóng
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  }

  // VIEW 2: BILLING CONFIRMATION
  if (currentStep === 2) {
      return (
          <div className="animate-fade-in max-w-4xl mx-auto">
             {renderProgressBar()}
             
             <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
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
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Phí hạ bãi (Tạm tính)</span><span className="font-mono">{totalAmount.toLocaleString()} ₫</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">VAT (8%)</span><span className="font-mono">{(totalAmount * 0.08).toLocaleString()} ₫</span></div>
                            <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
                                <span className="text-blue-900 font-bold uppercase">Tổng cộng</span>
                                <span className="text-xl font-bold text-blue-700 font-mono">{(totalAmount * 1.08).toLocaleString()} ₫</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                             <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-bold border border-gray-200">Quay lại</button>
                             <button onClick={() => setCurrentStep(3)} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold shadow-md">Xác nhận & Thanh toán</button>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
      );
  }

  // VIEW 3: PAYMENT FORM (CARD)
  if (currentStep === 3) {
      return (
        <div className="animate-fade-in max-w-2xl mx-auto">
             {renderProgressBar()}
             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="font-bold text-gray-800 text-lg flex items-center mb-6">
                    <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                    Nhập thông tin thẻ thanh toán
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Số tiền thanh toán:</span>
                    <span className="text-xl font-bold text-blue-700 font-mono">{(totalAmount * 1.08).toLocaleString()} ₫</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Số thẻ</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-lg font-mono text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Ngày hết hạn (MM/YY)</label>
                            <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">CVV/CVC</label>
                            <input type="text" placeholder="123" maxLength={3} className="w-full p-3 border rounded-lg font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Tên chủ thẻ</label>
                        <input type="text" placeholder="NGUYEN VAN A" className="w-full p-3 border rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase" />
                    </div>
                </div>

                <button 
                    onClick={() => setCurrentStep(4)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-lg shadow-md mt-8 transition-colors text-sm uppercase tracking-wide"
                >
                    Thanh toán
                </button>
                 <button onClick={() => setCurrentStep(2)} className="w-full mt-3 text-center text-gray-500 text-sm hover:underline">Hủy bỏ</button>
             </div>
        </div>
      );
  }

  // VIEW 4: SUCCESS / PENDING APPROVAL
  if (currentStep === 4) {
      return (
          <div className="animate-fade-in max-w-2xl mx-auto text-center pt-10">
              <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-yellow-100">
                  <Calendar className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Giao dịch đã được ghi nhận</h2>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-bold px-4 py-1.5 rounded-full border border-yellow-200 mb-6">
                  TRẠNG THÁI: CHỜ DUYỆT
              </span>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                  Yêu cầu lệnh hạ container của quý khách đang được bộ phận thủ tục kiểm tra. 
                  Kết quả duyệt lệnh sẽ được thông báo qua email và tin nhắn trong vòng 15 phút.
              </p>
              
              <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                        setCurrentStep(1);
                        setContainers([]);
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                      Làm lệnh mới
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-colors">
                      Theo dõi trạng thái
                  </button>
              </div>
          </div>
      );
  }

  return null;
};

export default ExportContainerOrder;