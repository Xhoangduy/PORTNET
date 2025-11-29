import React, { useState } from 'react';
import Header from './components/Header';
import LoginSidebar from './components/LoginSidebar';
import ServiceCard from './components/ServiceCard';
import Footer from './components/Footer';
import TrackingSystem from './components/TrackingSystem';
import { SERVICES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTrackingView = currentView !== 'home';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Conditional Rendering based on View */}
        {isTrackingView ? (
           <TrackingSystem initialTool={currentView} onNavigate={handleNavigate} />
        ) : (
          /* ================= HOME VIEW ================= */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content Area (Left/Center) */}
            <div className="lg:w-3/4">
              {/* Hero/Intro */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-800 to-cyan-700 rounded-2xl shadow-lg text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Chào mừng đến với Portnet</h2>
                <p className="text-blue-100 opacity-90">
                  Nền tảng công nghệ số hàng đầu kết nối cộng đồng Logistics Việt Nam.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {SERVICES.map((service) => (
                  <ServiceCard key={service.id} item={service} />
                ))}
              </div>
            </div>

            {/* Sidebar Area (Right) */}
            <div className="lg:w-1/4 min-w-[320px]">
              <LoginSidebar onNavigate={handleNavigate} />
              
              {/* Additional info box */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 shadow-sm">
                <span className="font-bold block mb-1">📢 Thông báo:</span>
                Hệ thống bảo trì định kỳ từ 00:00 - 02:00 ngày Chủ Nhật hàng tuần. Xin lỗi vì sự bất tiện này.
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