import React, { useState, useEffect } from 'react';
import { Search, Map, FileText, Lock, List, LayoutDashboard, ChevronRight, Container, Ship, FileCheck, Anchor, ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { MOCK_CONTAINER_DB, TRACKING_OPTIONS } from '../constants';
import { ContainerData, ScheduleData, BolData, PinData, ManifestData, OrderData } from '../types';

interface TrackingSystemProps {
  initialTool?: string;
  onNavigate: (toolId: string) => void;
}

const TrackingSystem: React.FC<TrackingSystemProps> = ({ initialTool = 'container', onNavigate }) => {
  const [activeTool, setActiveTool] = useState(initialTool);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Sync internal state if prop changes
  useEffect(() => {
    setActiveTool(initialTool);
    setSearchResult(null);
    setHasSearched(false);
    setSearchInput('');
    
    // Auto-fill mock data for container demo
    if (initialTool === 'container') {
      setSearchInput('TCNU5802853');
    }
  }, [initialTool]);

  const handleSearch = () => {
    setHasSearched(true);
    
    // Mock data generation based on tool
    if (activeTool === 'container') {
      if (MOCK_CONTAINER_DB[searchInput as keyof typeof MOCK_CONTAINER_DB]) {
        setSearchResult(MOCK_CONTAINER_DB[searchInput as keyof typeof MOCK_CONTAINER_DB]);
      } else {
        setSearchResult(null);
      }
    } else if (activeTool === 'schedule') {
        // Mock Schedule Data
        setSearchResult([
            { id: 1, vessel: 'ST EVER', inVoyage: '088N', outVoyage: '089S', etb: '14/11/2021 15:00', etd: '15/11/2021 08:00', terminal: 'Cát Lái', status: 'Đã cập' },
            { id: 2, vessel: 'KOTA LIHAT', inVoyage: 'KLI01N', outVoyage: 'KLI01S', etb: '16/11/2021 10:30', etd: '17/11/2021 04:00', terminal: 'Cát Lái', status: 'Dự kiến' },
            { id: 3, vessel: 'WAN HAI 305', inVoyage: 'W305N', outVoyage: 'W305S', etb: '18/11/2021 06:00', etd: '18/11/2021 22:00', terminal: 'Cát Lái', status: 'Dự kiến' },
        ]);
    } else if (activeTool === 'bol') {
        // Mock BOL Data (List of containers)
        setSearchResult([
            { id: 1, containerNo: 'TCNU5802853', size: '22G0', seal: 'VN324889', weight: '18.00', status: 'Đã khai báo' },
            { id: 2, containerNo: 'TCNU1234567', size: '40HC', seal: 'VN324890', weight: '22.50', status: 'Đã khai báo' },
            { id: 3, containerNo: 'TCNU9876543', size: '40HC', seal: 'VN324891', weight: '22.50', status: 'Chưa khai báo' },
        ]);
    } else if (activeTool === 'pin') {
         // Mock PIN Data
         setSearchResult([
            { id: 1, containerNo: 'TCNU5802853', pinCode: '****889', expiry: '15/11/2021', invoiceNo: 'INV-2021-001', status: 'Đã thanh toán' },
            { id: 2, containerNo: 'TCNU1234567', pinCode: '****123', expiry: '15/11/2021', invoiceNo: 'INV-2021-002', status: 'Đã thanh toán' },
         ]);
    } else if (activeTool === 'manifest') {
        // Mock Manifest Data
        setSearchResult([
            { id: 1, containerNo: 'TCNU5802853', size: '22G0', pol: 'SGN', pod: 'USLAX', weight: '18000' },
            { id: 2, containerNo: 'MSKU123456', size: '40DC', pol: 'SGN', pod: 'USLGB', weight: '24000' },
            { id: 3, containerNo: 'PONU998877', size: '45HC', pol: 'SGN', pod: 'USOAK', weight: '26000' },
        ]);
    } else if (activeTool === 'order') {
        // Mock Order Data
        setSearchResult({
            orderNo: searchInput || 'ORD-2021-9988',
            type: 'Hạ bãi chờ xuất',
            expiry: '20/11/2021',
            quantity: 5,
            amount: '2,500,000 VND',
            status: 'Hoàn thành',
            paymentStatus: 'Đã thanh toán',
            customer: 'CÔNG TY TNHH LOGISTICS ABC'
        });
    } else {
        setSearchResult(null);
    }
  };

  const getToolIcon = (id: string) => {
    switch(id) {
      case 'container': return <Container className="w-5 h-5" />;
      case 'schedule': return <Ship className="w-5 h-5" />;
      case 'bol': return <FileText className="w-5 h-5" />;
      case 'pin': return <Lock className="w-5 h-5" />;
      case 'manifest': return <List className="w-5 h-5" />;
      case 'order': return <ClipboardList className="w-5 h-5" />;
      default: return <Search className="w-5 h-5" />;
    }
  };

  const renderSearchForm = () => {
    let placeholder = "Nhập số container...";
    let label = "Nhập thông tin";

    switch(activeTool) {
      case 'container': 
        placeholder = "Nhập số container (VD: TCNU5802853)"; 
        label = "Số Container";
        break;
      case 'schedule': 
        placeholder = "Nhập tên tàu, số chuyến..."; 
        label = "Tên tàu / Số chuyến";
        break;
      case 'bol': 
        placeholder = "Nhập số vận đơn..."; 
        label = "Số Vận Đơn (Bill No)";
        break;
      case 'pin': 
        placeholder = "Nhập số container để tra cứu PIN..."; 
        label = "Số Container";
        break;
      case 'manifest': 
        placeholder = "Nhập số Bill hoặc Booking..."; 
        label = "Số Bill / Booking";
        break;
      case 'order': 
        placeholder = "Nhập số lệnh..."; 
        label = "Số Lệnh";
        break;
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
          Nhập thông tin
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-lg font-mono text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase shadow-sm"
                placeholder={placeholder}
              />
              {searchInput && activeTool === 'container' && (
                 <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">Hợp lệ</span>
              )}
            </div>
          </div>
          <button 
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded shadow-md flex items-center font-bold transition-colors h-[46px]"
          >
            <span className="mr-2">Tra cứu</span>
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderContainerResult = (data: ContainerData) => (
    <div className="p-6">
        <h4 className="text-xl font-bold text-blue-900 mb-6 border-b border-gray-100 pb-2">
            Số Container: <span className="text-red-600">{searchInput}</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="space-y-4">
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Hãng khai thác</span>
                <span className="font-bold text-gray-800">{data.operator}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Kích cỡ ISO</span>
                <span className="font-bold text-gray-800">{data.isoSize}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Full/Empty</span>
                <span className="font-bold text-gray-800">{data.fullEmpty}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Hướng</span>
                <span className="font-bold text-gray-800">{data.direction}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Vị trí</span>
                <span className="font-bold text-red-600">{data.location}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Thanh lý hải quan</span>
                <span className="font-bold text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                {data.customsClearance}
                </span>
            </div>
            </div>

            <div className="space-y-4">
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Tàu / Chuyến</span>
                <span className="font-bold text-gray-800">{data.vessel}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">ETB/ETD</span>
                <span className="font-bold text-gray-800 text-xs">{data.etbEtd}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Booking No</span>
                <span className="font-bold text-gray-800">{data.bookingNo}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Ngày vào bãi</span>
                <span className="font-bold text-gray-800">{data.entryDate}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Phương án ra</span>
                <span className="font-bold text-gray-800">{data.planOut}</span>
            </div>
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                <span className="text-gray-500 text-sm">Cảng dỡ (POD)</span>
                <span className="font-bold text-gray-800">{data.pod}</span>
            </div>
            </div>
        </div>
    </div>
  );

  const renderScheduleResult = (data: ScheduleData[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                <th className="px-6 py-3">Tàu (Vessel)</th>
                <th className="px-6 py-3">Chuyến Nhập</th>
                <th className="px-6 py-3">Chuyến Xuất</th>
                <th className="px-6 py-3">ETB</th>
                <th className="px-6 py-3">ETD</th>
                <th className="px-6 py-3">Cảng</th>
                <th className="px-6 py-3">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-blue-50">
                    <td className="px-6 py-4 font-bold text-blue-900">{item.vessel}</td>
                    <td className="px-6 py-4">{item.inVoyage}</td>
                    <td className="px-6 py-4">{item.outVoyage}</td>
                    <td className="px-6 py-4">{item.etb}</td>
                    <td className="px-6 py-4">{item.etd}</td>
                    <td className="px-6 py-4">{item.terminal}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Đã cập' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {item.status}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderBolResult = (data: BolData[]) => (
    <div className="overflow-x-auto">
       <div className="p-4 bg-blue-50 border-b border-blue-100 mb-2">
            <span className="font-bold text-blue-800">DANH SÁCH CONTAINER THEO VẬN ĐƠN</span>
       </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                <th className="px-6 py-3">STT</th>
                <th className="px-6 py-3">Số Container</th>
                <th className="px-6 py-3">Kích cỡ</th>
                <th className="px-6 py-3">Số Seal</th>
                <th className="px-6 py-3">Trọng lượng (Tấn)</th>
                <th className="px-6 py-3">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={item.id} className="bg-white border-b hover:bg-blue-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-blue-900">{item.containerNo}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.seal}</td>
                    <td className="px-6 py-4">{item.weight}</td>
                    <td className="px-6 py-4">
                         <span className="text-green-600 font-medium flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {item.status}
                         </span>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderPinResult = (data: PinData[]) => (
     <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                <th className="px-6 py-3">Số Container</th>
                <th className="px-6 py-3">Số PIN</th>
                <th className="px-6 py-3">Hạn lệnh</th>
                <th className="px-6 py-3">Số hóa đơn</th>
                <th className="px-6 py-3">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-blue-50">
                    <td className="px-6 py-4 font-bold text-blue-900">{item.containerNo}</td>
                    <td className="px-6 py-4 font-mono text-red-600 font-bold">{item.pinCode}</td>
                    <td className="px-6 py-4">{item.expiry}</td>
                    <td className="px-6 py-4">{item.invoiceNo}</td>
                     <td className="px-6 py-4">
                         <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                            {item.status}
                         </span>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderManifestResult = (data: ManifestData[]) => (
     <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                <th className="px-6 py-3">STT</th>
                <th className="px-6 py-3">Số Container</th>
                <th className="px-6 py-3">Kích cỡ</th>
                <th className="px-6 py-3">Cảng xếp (POL)</th>
                <th className="px-6 py-3">Cảng dỡ (POD)</th>
                <th className="px-6 py-3">Trọng lượng (kg)</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={item.id} className="bg-white border-b hover:bg-blue-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-blue-900">{item.containerNo}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.pol}</td>
                    <td className="px-6 py-4">{item.pod}</td>
                    <td className="px-6 py-4 text-right">{item.weight}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrderResult = (data: OrderData) => (
     <div className="p-6">
        <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-blue-900">
                Thông tin lệnh: <span className="text-red-600">{data.orderNo}</span>
            </h4>
            <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full border border-green-200">
                {data.status}
            </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Loại lệnh</p>
                    <p className="font-bold text-gray-800">{data.type}</p>
                </div>
            </div>
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Clock className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Hạn lệnh</p>
                    <p className="font-bold text-gray-800">{data.expiry}</p>
                </div>
            </div>
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Container className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Số lượng Container</p>
                    <p className="font-bold text-gray-800">{data.quantity} Cont</p>
                </div>
            </div>
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <FileCheck className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Thanh toán</p>
                    <p className="font-bold text-gray-800">{data.paymentStatus} ({data.amount})</p>
                </div>
            </div>
             <div className="col-span-1 md:col-span-2 flex items-center space-x-3 border-t border-gray-200 pt-4 mt-2">
                <div className="p-2 bg-gray-200 rounded-lg text-gray-600">
                    <Anchor className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Khách hàng</p>
                    <p className="font-bold text-blue-900">{data.customer}</p>
                </div>
            </div>
        </div>
    </div>
  );

  const renderResultTable = () => {
    if (!searchResult) return null;

    switch (activeTool) {
        case 'container': return renderContainerResult(searchResult);
        case 'schedule': return renderScheduleResult(searchResult);
        case 'bol': return renderBolResult(searchResult);
        case 'pin': return renderPinResult(searchResult);
        case 'manifest': return renderManifestResult(searchResult);
        case 'order': return renderOrderResult(searchResult);
        default: return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
         <div className="bg-white rounded-lg shadow-md border-t-4 border-blue-600 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
               <h3 className="font-bold text-blue-900 flex items-center">
                 <Search className="w-5 h-5 mr-2" />
                 TRA CỨU THÔNG TIN
               </h3>
            </div>
            <div className="flex flex-col">
              {TRACKING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onNavigate(opt.id)}
                  className={`flex items-center p-4 text-sm font-medium transition-all border-l-4 hover:bg-blue-50 ${
                    activeTool === opt.id 
                      ? 'border-red-500 text-blue-800 bg-blue-50/80 shadow-inner' 
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <span className={`mr-3 ${activeTool === opt.id ? 'text-red-500' : 'text-gray-400'}`}>
                    {getToolIcon(opt.id)}
                  </span>
                  {opt.label}
                  {activeTool === opt.id && <ChevronRight className="ml-auto w-4 h-4 text-red-500" />}
                </button>
              ))}
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow">
         
         {/* Breadcrumb / Title */}
         <div className="mb-6 flex items-center text-sm text-gray-500">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => onNavigate('home')}>Trang chủ</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-bold text-blue-800 uppercase">
              {TRACKING_OPTIONS.find(t => t.id === activeTool)?.label}
            </span>
         </div>

         {/* Search Box */}
         {renderSearchForm()}

         {/* Results Area */}
         {hasSearched ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="font-bold text-gray-700 flex items-center">
                   <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">BƯỚC 3</span>
                   Kết quả tra cứu
                 </h3>
                 {searchResult && <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded border border-green-200">
                    {Array.isArray(searchResult) ? `Tìm thấy ${searchResult.length} kết quả` : 'Tìm thấy 1 kết quả'}
                 </span>}
              </div>

              {searchResult ? (
                 renderResultTable()
              ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
                    <Search className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Không tìm thấy dữ liệu cho <span className="font-bold text-gray-600">"{searchInput}"</span></p>
                    <p className="text-sm mt-2">Vui lòng kiểm tra lại thông tin và thử lại.</p>
                </div>
              )}
            </div>
         ) : (
            <div className="bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-100 p-12 text-center text-blue-300">
               <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                 <Search className="w-8 h-8 text-blue-400" />
               </div>
               <p>Vui lòng nhập thông tin để bắt đầu tra cứu</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default TrackingSystem;
