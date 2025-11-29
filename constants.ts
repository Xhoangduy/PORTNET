import { ServiceItem, TrackingOption } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'DỊCH VỤ CẢNG BIỂN',
    description: 'Tra cứu thông tin hàng hóa, đăng ký lệnh dịch vụ, thanh toán, nhận chứng từ điện tử...',
    imageUrl: 'https://png.pngtree.com/thumb_back/fh260/png-vector/20200530/ourmid/pngtree-port-transportation-png-image_2214450.jpg', // Updated specific image
  },
  {
    id: '2',
    title: 'DỊCH VỤ HÀNG KHÔNG',
    description: 'Truy vấn thông tin hàng hoá, chuyến bay. Thủ tục hàng hoá - kho hàng không - chuyển phát nhanh.',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800', // Air Cargo
  },
  {
    id: '3',
    title: 'DỊCH VỤ VẬN TẢI - HÃNG TÀU',
    description: 'Ứng dụng đặt xe đầu kéo/salan, quản lý hành trình, thanh toán dịch vụ vận tải, ...',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800', // Truck Transport
  },
  {
    id: '4',
    title: 'DỊCH VỤ CÔNG',
    description: 'Thông quan Hải quan, đăng ký thủ tục Tàu-Bến, dịch vụ Hàng hải, truy vấn và thanh toán phí.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800', // Customs / Documents
  },
  {
    id: '5',
    title: 'TÀI CHÍNH - BẢO HIỂM',
    description: 'Bảo hiểm chi các rủi ro từ bên ngoài gây mất mát, tổn thất vật chất đối với hàng hóa, ...',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800', // Finance / Insurance
  },
  {
    id: '6',
    title: 'DỊCH VỤ KHO',
    description: 'Đăng ký, giám sát, quản lý hàng hóa kho CFS, Kho Ngoại Quan',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', // Warehouse
  },
];

export const TRACKING_OPTIONS: TrackingOption[] = [
  { id: 'container', label: 'Tra cứu thông tin container' },
  { id: 'schedule', label: 'Tra cứu lịch trình tàu' },
  { id: 'bol', label: 'Tra cứu số bill of loading' },
  { id: 'pin', label: 'Tra cứu số pin' },
  { id: 'manifest', label: 'Tra cứu danh sách container' },
  { id: 'order', label: 'Truy vấn thông tin lệnh' },
];

// Mock Data for Container Tracking
export const MOCK_CONTAINER_DB = {
  'TCNU5802853': {
    operator: 'EMC',
    isoSize: '22G0',
    fullEmpty: 'Full',
    direction: 'Export',
    status: 'Stacking',
    location: 'M3-07-06-1',
    weight: '18',
    commodity: 'General',
    seal: 'VN324889',
    type: 'Ngoại',
    customsClearance: 'Đã thanh lý',
    vessel: 'ST EVER/088N/089S',
    etbEtd: '10/11/2021 15:06 / 14/11/2021 15:07',
    bookingNo: 'A00123420',
    entryDate: '10/11/2021 18:22:52',
    planIn: 'Hạ bãi',
    planOut: 'Xuất tàu',
    pod: 'MYTPP',
    fpod: 'MYTPP'
  }
};