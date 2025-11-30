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
        setSearchResult([
            { id: 1, vessel: 'ST EVER', inVoyage: '088N', outVoyage: '089S', etb: '14/11/2021 15:00', etd: '15/11/2021 08:00', terminal: 'Cát Lái', status: 'Đã cập' },
            { id: 2, vessel: 'KOTA LIHAT', inVoyage: 'KLI01N', outVoyage: 'KLI01S', etb: '16/11/2021 10:30', etd: '17/11/2021 04:00', terminal: 'Cát Lái', status: 'Dự kiến' },
            { id: 3, vessel: 'WAN HAI 305', inVoyage: 'W305N', outVoyage: 'W305S', etb: '18/11/2021 06:00', etd: '18/11/2021 22:00', terminal: 'Cát Lái', status: 'Dự kiến' },
        ]);
    } else if (activeTool === 'bol') {
        setSearchResult([
            { id: 1, containerNo: 'TCNU5802853', size: '22G0', seal: 'VN324889', weight: '18.00', status: 'Đã khai báo' },
            { id: 2, containerNo: 'TCNU1234567', size: '40HC', seal: 'VN324890', weight: '22.50', status: 'Đã khai báo' },
            { id: 3, containerNo: 'TCNU9876543', size: '40HC', seal: 'VN324891', weight: '22.50', status: 'Chưa khai báo' },
        ]);
    } else if (activeTool === 'pin') {
         setSearchResult([
            { id: 1, containerNo: 'TCNU5802853', pinCode: '****889', expiry: '15/11/2021', invoiceNo: 'INV-2021-001', status: 'Đã thanh toán' },
            { id: 2, containerNo: 'TCNU1234567', pinCode: '****123', expiry: '15/11/2021', invoiceNo: 'INV-2021-002', status: 'Đã thanh toán' },
         ]);
    } else if (activeTool === 'manifest') {
        setSearchResult([
            { id: 1, containerNo: 'TCNU5802853', size: '22G0', pol: 'SGN', pod: 'USLAX', weight: '18000' },
            { id: 2, containerNo: 'MSKU123456', size: '40DC', pol: 'SGN', pod: 'USLGB', weight: '24000' },
            { id: 3, containerNo: 'PONU998877', size: '45HC', pol: 'SGN', pod: 'USOAK', weight: '26000' },
        ]);
    } else if (activeTool === 'order') {
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
      case 'container': placeholder = "Nhập số container (VD: TCNU5802853)"; label = "Số Container"; break;
      case 'schedule': placeholder = "Nhập tên tàu, số chuyến..."; label = "Tên tàu / Số chuyến"; break;
      case 'bol': placeholder = "Nhập số vận đơn..."; label = "Số Vận Đơn (Bill No)"; break;
      case 'pin': placeholder = "Nhập số container để tra cứu PIN..."; label = "Số Container"; break;
      case 'manifest': placeholder = "Nhập số Bill hoặc Booking..."; label = "Số Bill / Booking"; break;
      case 'order': placeholder = "Nhập số lệnh..."; label = "Số Lệnh"; break;
    }

    return (
      <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          Nhập thông tin tra cứu
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">{label}</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-mono text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase shadow-sm"
                placeholder={placeholder}
              />
              {searchInput && activeTool === 'container' && (
                 <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center">
                   <CheckCircle className="w-3 h-3 mr-1" /> Hợp lệ
                 </span>
              )}
            </div>
          </div>
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center font-bold text-sm transition-all h-[52px] hover:shadow-lg active:transform active:scale-95 whitespace-nowrap min-w-[110px]"
          >
            <span className="mr-2">Tra cứu</span>
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderContainerResult = (data: ContainerData) => (
    <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-100">
            <div>
                 <h4 className="text-2xl font-bold text-gray-800">
                    Container <span className="text-blue-600 font-mono">{searchInput}</span>
                </h4>
                <p className="text-sm text-gray-500 mt-1">Thông tin chi tiết và trạng thái hiện tại</p>
            </div>
            <div className="mt-2 md:mt-0">
                <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200 shadow-sm">
                    {data.status}
                </span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-gray-700 mb-4 flex items-center text-sm uppercase tracking-wider">
                    <Container className="w-4 h-4 mr-2 text-blue-500" /> Thông tin chung
                </h5>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Hãng khai thác</span>
                        <span className="font-semibold text-gray-900">{data.operator}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Kích cỡ / Loại</span>
                        <span className="font-semibold text-gray-900">{data.isoSize} / {data.type}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Trạng thái rỗng/đầy</span>
                        <span className="font-semibold text-gray-900">{data.fullEmpty}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Trọng lượng</span>
                        <span className="font-semibold text-gray-900">{data.weight} Tấn</span>
                    </div>
                     <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                        <span className="text-gray-500 text-sm">Seal</span>
                        <span className="font-mono font-bold text-red-600 bg-red-50 px-2 rounded">{data.seal}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h5 className="font-bold text-gray-700 mb-4 flex items-center text-sm uppercase tracking-wider">
                    <Map className="w-4 h-4 mr-2 text-green-500" /> Vận chuyển & Vị trí
                </h5>
                 <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Vị trí bãi</span>
                        <span className="font-mono font-bold text-blue-600 text-lg">{data.location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Tàu / Chuyến</span>
                        <span className="font-semibold text-gray-900">{data.vessel}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Booking / Bill</span>
                        <span className="font-semibold text-gray-900">{data.bookingNo}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Cảng dỡ (POD)</span>
                        <span className="font-semibold text-gray-900">{data.pod}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
                        <span className="text-gray-500 text-sm">Thanh lý HQ</span>
                        <span className="font-bold text-emerald-600 flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> {data.customsClearance}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderScheduleResult = (data: ScheduleData[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
                <th className="px-6 py-4 font-semibold">Tàu (Vessel)</th>
                <th className="px-6 py-4 font-semibold">Chuyến Nhập/Xuất</th>
                <th className="px-6 py-4 font-semibold">ETB / ETD</th>
                <th className="px-6 py-4 font-semibold">Cảng</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="font-bold text-blue-800">{item.vessel}</div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">In: <b className="text-gray-700">{item.inVoyage}</b></span>
                            <span className="text-xs text-gray-500">Out: <b className="text-gray-700">{item.outVoyage}</b></span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                             <span className="text-green-700 bg-green-50 px-1 rounded w-fit mb-1">{item.etb}</span>
                             <span className="text-red-700 bg-red-50 px-1 rounded w-fit">{item.etd}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">{item.terminal}</td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.status === 'Đã cập' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                            {item.status}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  // ... (Other render functions similarly styled, simplified for brevity but following the pattern)
  // Reusing the table styles from renderScheduleResult for others
  const renderBolResult = (data: BolData[]) => (
    <div className="overflow-x-auto">
      <div className="p-4 bg-blue-50/50 border-b border-blue-100 flex items-center">
         <FileText className="w-4 h-4 text-blue-600 mr-2" />
         <span className="font-bold text-blue-800 text-sm">DANH SÁCH CONTAINER</span>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
                <th className="px-6 py-4">Số Container</th>
                <th className="px-6 py-4">Kích cỡ</th>
                <th className="px-6 py-4">Số Seal</th>
                <th className="px-6 py-4">Trọng lượng (Tấn)</th>
                <th className="px-6 py-4">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-blue-900 font-mono">{item.containerNo}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4 font-mono">{item.seal}</td>
                    <td className="px-6 py-4">{item.weight}</td>
                    <td className="px-6 py-4">
                         <span className="text-emerald-600 font-bold text-xs flex items-center bg-emerald-50 px-2 py-1 rounded-full w-fit">
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
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
                <th className="px-6 py-4">Container</th>
                <th className="px-6 py-4">Số PIN</th>
                <th className="px-6 py-4">Hạn lệnh</th>
                <th className="px-6 py-4">Số hóa đơn</th>
                <th className="px-6 py-4">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-blue-900 font-mono">{item.containerNo}</td>
                    <td className="px-6 py-4">
                        <span className="font-mono text-white bg-red-500 px-2 py-1 rounded shadow-sm">{item.pinCode}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.expiry}</td>
                    <td className="px-6 py-4 text-gray-600">{item.invoiceNo}</td>
                     <td className="px-6 py-4">
                         <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-200">
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
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
                <th className="px-6 py-4">STT</th>
                <th className="px-6 py-4">Container</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">POL</th>
                <th className="px-6 py-4">POD</th>
                <th className="px-6 py-4 text-right">Weight (KG)</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-blue-900 font-mono">{item.containerNo}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.pol}</td>
                    <td className="px-6 py-4">{item.pod}</td>
                    <td className="px-6 py-4 text-right font-mono">{item.weight}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrderResult = (data: OrderData) => (
     <div className="p-8">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <div>
                 <h4 className="text-2xl font-bold text-gray-800 flex items-center">
                    <ClipboardList className="w-6 h-6 mr-3 text-blue-600" />
                    Thông tin lệnh <span className="text-blue-600 ml-2">{data.orderNo}</span>
                </h4>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-200">
                {data.status}
            </span>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden">
            <div className="p-6 hover:bg-gray-50 transition-colors">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Loại lệnh</p>
                <p className="font-bold text-gray-800 text-lg">{data.type}</p>
            </div>
             <div className="p-6 hover:bg-gray-50 transition-colors">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Hạn lệnh</p>
                <p className="font-bold text-orange-600 text-lg">{data.expiry}</p>
            </div>
             <div className="p-6 hover:bg-gray-50 transition-colors">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Số lượng</p>
                <p className="font-bold text-gray-800 text-lg">{data.quantity} Container</p>
            </div>
             <div className="p-6 hover:bg-gray-50 transition-colors">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Thanh toán</p>
                <p className="font-bold text-emerald-600 text-lg">{data.amount}</p>
            </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center">
             <div className="p-2 bg-white rounded-md border border-gray-200 mr-4 shadow-sm">
                <Anchor className="w-5 h-5 text-gray-500" />
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Khách hàng</p>
                <p className="font-bold text-blue-900">{data.customer}</p>
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
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 flex-shrink-0">
         <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden sticky top-32">
            <div className="p-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
               <h3 className="font-bold text-gray-800 flex items-center text-sm uppercase tracking-wider">
                 <List className="w-4 h-4 mr-2 text-blue-600" />
                 Danh mục tra cứu
               </h3>
            </div>
            <div className="flex flex-col p-2 space-y-1">
              {TRACKING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onNavigate(opt.id)}
                  className={`flex items-center p-3 text-sm font-medium transition-all rounded-lg ${
                    activeTool === opt.id 
                      ? 'bg-blue-50 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <span className={`mr-3 p-1.5 rounded-md ${activeTool === opt.id ? 'bg-white text-blue-600 shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                    {getToolIcon(opt.id)}
                  </span>
                  {opt.label}
                  {activeTool === opt.id && <ChevronRight className="ml-auto w-4 h-4 text-blue-400" />}
                </button>
              ))}
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow">
         
         {/* Search Box */}
         {renderSearchForm()}

         {/* Results Area */}
         {hasSearched ? (
            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden min-h-[400px]">
              <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-gray-700 flex items-center">
                   <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                   Kết quả tra cứu
                 </h3>
                 {searchResult && <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                    {Array.isArray(searchResult) ? `${searchResult.length} kết quả` : 'Đã tìm thấy'}
                 </span>}
              </div>

              {searchResult ? (
                 renderResultTable()
              ) : (
                <div className="p-16 text-center flex flex-col items-center justify-center text-gray-400">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="text-lg text-gray-500 mb-2">Không tìm thấy dữ liệu cho <span className="font-bold text-gray-800">"{searchInput}"</span></p>
                    <p className="text-sm">Vui lòng kiểm tra lại thông tin và thử lại.</p>
                </div>
              )}
            </div>
         ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-16 text-center">
               <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 <LayoutDashboard className="w-10 h-10 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-2">Hệ thống Tra cứu Portnet</h3>
               <p className="text-gray-500 max-w-md mx-auto">Chọn một chức năng từ menu bên trái và nhập thông tin để bắt đầu tra cứu dữ liệu thời gian thực.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default TrackingSystem;