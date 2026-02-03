
import { Equipment, RentalStatus } from './types';

export const EQUIPMENT_CATALOG: Equipment[] = [
  {
    id: 'e1',
    name: 'Wilson NBA Basketball',
    type: 'Ball',
    pricePerHour: 5,
    deposit: 10,
    image: 'https://picsum.photos/seed/bball/400/300',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-101'
  },
  {
    id: 'e2',
    name: 'Adidas FIFA Football',
    type: 'Ball',
    pricePerHour: 5,
    deposit: 10,
    image: 'https://picsum.photos/seed/footy/400/300',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-102'
  },
  {
    id: 'e3',
    name: 'Yonex Badminton Racket',
    type: 'Racket',
    pricePerHour: 8,
    deposit: 16,
    image: 'https://picsum.photos/seed/badm/400/300',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-103'
  },
  {
    id: 'e4',
    name: 'Cricket Bat (Premium)',
    type: 'Bat',
    pricePerHour: 10,
    deposit: 20,
    image: 'https://picsum.photos/seed/bat/400/300',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-104'
  },
  {
    id: 'e5',
    name: 'Tennis Racket Pro',
    type: 'Racket',
    pricePerHour: 12,
    deposit: 24,
    image: 'https://picsum.photos/seed/tennis/400/300',
    status: RentalStatus.RENTED,
    lockerId: 'L-105'
  }
];

export const SYSTEM_SPECS = {
  architecture: `SwiftPlay uses a 3-tier IoT architecture.
1. Edge Node (Kiosk): React-based UI communicating with local GPIO controllers for locker solenoids and RFID readers.
2. Backend API: Node.js/TypeScript microservices handling logic, payments, and inventory sync.
3. Persistence: PostgreSQL for transactional data (rentals, payments) and Redis for real-time session tracking.`,
  techStack: [
    { name: 'Frontend', tech: 'React, Tailwind, Framer Motion' },
    { name: 'IoT Control', tech: 'Node-RED / Python Bridge (Local GPIO)' },
    { name: 'Backend', tech: 'NestJS, GraphQL' },
    { name: 'Database', tech: 'PostgreSQL, Prisma' }
  ],
  apiEndpoints: [
    { method: 'POST', path: '/api/v1/rent/init', desc: 'Initialize rental & locker lock' },
    { method: 'POST', path: '/api/v1/rent/return', desc: 'Verify RFID & process refund' },
    { method: 'GET', path: '/api/v1/inventory/status', desc: 'Health check of locker sensors' }
  ]
};
