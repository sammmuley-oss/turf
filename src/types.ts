
export enum RentalStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  pricePerHour: number;
  deposit: number;
  image: string;
  status: RentalStatus;
  lockerId: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  balance: number;
}

export interface RentalSession {
  id: string;
  userId: string;
  equipmentId: string;
  startTime: number;
  endTime?: number;
  expectedReturn: number;
  paidDeposit: number;
  status: 'ACTIVE' | 'COMPLETED' | 'OVERDUE';
}

export type AppStep = 
  | 'HOME' 
  | 'AUTH' 
  | 'SELECTION' 
  | 'PAYMENT' 
  | 'ACTIVE_RENTAL' 
  | 'RETURN_SCAN' 
  | 'ADMIN' 
  | 'DOCS';
