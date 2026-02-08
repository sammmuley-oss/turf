
import { Equipment, RentalStatus } from './types';

export const EQUIPMENT_CATALOG: Equipment[] = [
  {
    id: 'e1',
    name: 'Cricket Bat',
    type: 'Bat',
    pricePerHour: 5,
    deposit: 10,
    image: 'https://www.anglarsports.com/wp-content/uploads/2024/03/Anglar-Killer-Edition-Explore.webp',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-101'
  },
  {
    id: 'e2',
    name: 'Adidas FIFA Football',
    type: 'Ball',
    pricePerHour: 5,
    deposit: 10,
    image: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/glbl_football_FW_25_WC_26_OMB_Launch_Combined_PLP_Banner_Snippet_d_07c3ff87f0.jpg',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-102'
  },
  {
    id: 'e3',
    name: 'Yonex Badminton Racket',
    type: 'Racket',
    pricePerHour: 8,
    deposit: 16,
    image: 'https://media.istockphoto.com/id/1761333789/photo/badminton-shuttlecocks-and-racket-placed-in-the-corner-of-a-synthetic-field.jpg?s=612x612&w=0&k=20&c=3rr4BZqe1rDWsCe6LF_YPCXZe6Um5jizc6d6n96U1Q4=',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-103'
  },
  {
    id: 'e4',
    name: 'Cricket Bat (Premium)',
    type: 'Bat',
    pricePerHour: 10,
    deposit: 20,
    image: 'https://tiimg.tistatic.com/fp/1/007/806/premium-wood-heavy-duty-high-strength-light-weight-willow-cricket-bat--356.jpg',
    status: RentalStatus.AVAILABLE,
    lockerId: 'L-104'
  },
  {
    id: 'e5',
    name: 'Tennis Ball',
    type: 'Ball',
    pricePerHour: 12,
    deposit: 24,
    image: 'https://a.storyblok.com/f/320069/1048x476/4e7215cfb3/difference-between-padel-and-tennis-balls.jpg/m/3840x0/filters:quality(80)',
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
