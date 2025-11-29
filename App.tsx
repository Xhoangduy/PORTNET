
import React, { useState } from 'react';
import Header from './components/Header';
import LoginSidebar from './components/LoginSidebar';
import ServiceCard from './components/ServiceCard';
import Footer from './components/Footer';
import TrackingSystem from './components/TrackingSystem';
import SeaportOperations from './components/SeaportOperations';
import { SERVICES } from './constants';
import { Home, ChevronRight, Clock, Anchor } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    // Navigate to a specific service view. 
    // Currently only '1' (Seaport) is implemented.
    if (serviceId === '1') {
      setCurrentView('service-1');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Placeholder for others
       alert(`Chức năng cho dịch vụ ${serviceId} đang phát triển`);
    }
  };

  const isTrackingView = currentView !== 'home' && !currentView.startsWith('service-');
  const isServiceView = currentView.startsWith('service-');
  
  let currentLabel = 'Tổng quan';
  if (isTrackingView) {
      currentLabel = (currentView === 'container' ? 'Tra cứu Container' 
      : currentView === 'schedule' ? 'Lịch trình tàu' 
      : currentView === 'bol' ? 'Vận đơn' : 'Tra cứu');
  } else if (isServiceView) {
      currentLabel = currentView === 'service-1' ? 'Dịch vụ Cảng biển' : 'Dịch vụ';
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f3f4f6]">
      <Header onNavigate={handleNavigate} />
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-[70px] z-40">
        <div className="container mx-auto px-4 h-10 flex items-center text-sm text-gray-500">
          <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors" onClick={() => handleNavigate('home')}>
             <Home className="w-4 h-4 mr-2" />
             <span className="font-medium">PORTNET</span>
          </div>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
          <div className={`flex items-center font-medium px-3 py-1 rounded-md ${isServiceView || isTrackingView ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}>
             {currentView === 'service-1' ? <Anchor className="w-3 h-3 mr-2" /> : <Clock className="w-3 h-3 mr-2" />}
             {currentLabel}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        
        {/* VIEW 1: TRACKING SYSTEM */}
        {isTrackingView && (
           <TrackingSystem initialTool={currentView} onNavigate={handleNavigate} />
        )}

        {/* VIEW 2: SEAPORT SERVICE */}
        {currentView === 'service-1' && (
           <SeaportOperations />
        )}

        {/* VIEW 3: HOME DASHBOARD */}
        {!isTrackingView && !isServiceView && (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Main Content Area (Left/Center) */}
            <div className="lg:w-3/4">
              
              {/* Dashboard Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Danh sách dịch vụ</h2>
                <p className="text-gray-500 text-sm mt-1">Truy cập nhanh các dịch vụ cảng và logistics</p>
              </div>

              {/* Services Grid - Styled like Dashboard Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {SERVICES.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    item={service} 
                    onClick={handleServiceClick}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar Area (Right) */}
            <div className="lg:w-1/4 min-w-[320px] space-y-6">
              <LoginSidebar onNavigate={handleNavigate} />
              
              {/* Info/Ads Box */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                 <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-4 text-white text-center">
                    <h3 className="font-bold text-lg mb-2">CSKH 24/7</h3>
                    <p className="text-sm opacity-90 mb-3">Hỗ trợ mọi vấn đề về kỹ thuật và nghiệp vụ</p>
                    <button className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow hover:bg-gray-50 transition-colors w-full">
                      1900 1234
                    </button>
                 </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
