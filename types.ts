
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface TrackingOption {
  id: string;
  label: string;
}

export interface ContainerData {
  operator: string;
  isoSize: string;
  fullEmpty: string;
  direction: string;
  status: string;
  location: string;
  weight: string;
  commodity: string;
  seal: string;
  type: string;
  customsClearance: string;
  vessel: string;
  etbEtd: string;
  bookingNo: string;
  entryDate: string;
  planIn: string;
  planOut: string;
  pod: string;
  fpod: string;
}

export interface ScheduleData {
  id: number;
  vessel: string;
  inVoyage: string;
  outVoyage: string;
  etb: string;
  etd: string;
  terminal: string;
  status: string;
}

export interface BolData {
  id: number;
  containerNo: string;
  size: string;
  seal: string;
  weight: string;
  status: string;
}

export interface PinData {
  id: number;
  containerNo: string;
  pinCode: string;
  expiry: string;
  invoiceNo: string;
  status: string;
}

export interface ManifestData {
  id: number;
  containerNo: string;
  size: string;
  pol: string;
  pod: string;
  weight: string;
}

export interface OrderData {
  orderNo: string;
  type: string;
  expiry: string;
  quantity: number;
  amount: string;
  status: string;
  paymentStatus: string;
  customer: string;
}

export interface ImportContainer {
  id: string;
  containerNo: string;
  size: string;
  seal: string;
  weight: number;
  vessel: string;
  status: string;
  fee: number;
}

export interface ExportContainer {
  id: string;
  bookingNo: string;
  containerNo: string;
  size: string;
  seal: string;
  weight: number;
  pod: string; // Port of Discharge
  fee: number;
}

export interface EmptyPickupData {
  id: string;
  bookingNo: string;
  type: 'Designated' | 'Non-designated';
  isoSize: string;
  quantity: number;
  fee: number;
}

export interface EmptyReturnContainer {
  id: string;
  operator: string;
  containerNo: string;
  isoSize: string;
  fee: number;
}

export interface ServiceContainer {
  id: string;
  containerNo: string;
  isoSize: string;
  location: string;
  serviceName: string;
  fee: number;
}

export interface UnstuffingContainer {
  id: string;
  containerNo: string;
  isoSize: string;
  commodity: string;
  unstuffingPlan: string;
  fee: number;
}

export interface StuffingContainer {
  id: string;
  containerNo: string;
  isoSize: string;
  condition: string;
  commodity: string;
  stuffingPlan: string;
  fee: number;
}
