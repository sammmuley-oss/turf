import React, { useState } from 'react';

import {
  User as UserIcon,
  ChevronLeft,
  Smartphone,
  LogOut,
  FileText,
  BarChart,
} from 'lucide-react';

import { AppStep, Equipment, User, RentalSession } from './types';
import { EQUIPMENT_CATALOG } from './constants';

import { HomeView } from './components/HomeView';
import { AuthView } from './components/AuthView';
import { SelectionView } from './components/SelectionView';
import { PaymentView } from './components/PaymentView';
import { ActiveRentalView } from './components/ActiveRentalView';
import { ReturnScanView } from './components/ReturnScanView';
import { AdminDashboard } from './components/AdminDashboard';
import { DocsView } from './components/DocsView';

/* 🔥 FIREBASE */
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<Equipment | null>(null);
  const [activeRental, setActiveRental] = useState<RentalSession | null>(null);

  /* =======================
     LOGIN → FIRESTORE
     ======================= */
  const handleLogin = async (phone: string) => {
    const userId = phone;
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);

    let userData: User;

    if (!snap.exists()) {
      userData = {
        id: userId,
        phone,
        name: 'Pro Athlete',
        balance: 100,
      };

      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
      });
    } else {
      userData = snap.data() as User;
    }

    setUser(userData);
    setCurrentStep('SELECTION');
  };

  /* =======================
     LOGOUT
     ======================= */
  const handleLogout = () => {
    setUser(null);
    setActiveRental(null);
    setSelectedEquip(null);
    setCurrentStep('HOME');
  };

  /* =======================
     START PAYMENT
     ======================= */
  const startPayment = (equip: Equipment) => {
    setSelectedEquip(equip);
    setCurrentStep('PAYMENT');
  };

  /* =======================
     COMPLETE RENTAL → FIRESTORE
     ======================= */
  const completeRental = async () => {
    if (!user || !selectedEquip) return;

    // Save rental to Firestore
    const rentalRef = await addDoc(collection(db, 'rentals'), {
      userId: user.id,
      equipmentId: selectedEquip.id,
      startTime: serverTimestamp(),
      expectedReturn: Date.now() + 60 * 60 * 1000, // 1 hour
      paidDeposit: selectedEquip.deposit * 2,
      status: 'ACTIVE',
    });

    // Keep local copy for UI
    const rental: RentalSession = {
      id: rentalRef.id,
      userId: user.id,
      equipmentId: selectedEquip.id,
      startTime: Date.now(),
      expectedReturn: Date.now() + 60 * 60 * 1000,
      paidDeposit: selectedEquip.deposit * 2,
      status: 'ACTIVE',
    };

    setActiveRental(rental);
    setCurrentStep('ACTIVE_RENTAL');
  };

  /* =======================
     RETURN EQUIPMENT
     ======================= */
  const handleReturn = () => {
    setActiveRental(null);
    setSelectedEquip(null);
    setCurrentStep('HOME');
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0a0c] text-white overflow-hidden">

      {/* HEADER */}
      <header className="h-20 glass flex items-center justify-between px-8 border-b border-white/10">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setCurrentStep('HOME')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Smartphone size={24} />
          </div>
          <span className="text-xl font-bold tracking-wider text-blue-400">
            SWIFTPLAY
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentStep('DOCS')}
            className="flex items-center gap-2 text-white/60"
          >
            <FileText size={20} />
            Docs
          </button>

          <button
            onClick={() => setCurrentStep('ADMIN')}
            className="flex items-center gap-2 text-white/60"
          >
            <BarChart size={20} />
            Admin
          </button>

          {user && (
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full">
              <UserIcon size={18} className="text-blue-400" />
              <span className="text-sm">{user.phone}</span>
              <button onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center p-8 relative">

        {currentStep !== 'HOME' && (
          <button
            onClick={() => setCurrentStep('HOME')}
            className="absolute top-4 left-8 flex items-center gap-2 text-white/60"
          >
            <ChevronLeft size={24} />
            Go Back
          </button>
        )}

        {currentStep === 'HOME' && (
          <HomeView
            onRent={() => setCurrentStep('AUTH')}
            onReturn={() => setCurrentStep('RETURN_SCAN')}
            activeRental={activeRental}
          />
        )}

        {currentStep === 'AUTH' && <AuthView onLogin={handleLogin} />}
        {currentStep === 'SELECTION' && <SelectionView onSelect={startPayment} />}
        {currentStep === 'PAYMENT' && (
          <PaymentView equipment={selectedEquip!} onComplete={completeRental} />
        )}
        {currentStep === 'ACTIVE_RENTAL' && (
          <ActiveRentalView rental={activeRental!} />
        )}
        {currentStep === 'RETURN_SCAN' && (
          <ReturnScanView rental={activeRental} onReturn={handleReturn} />
        )}
        {currentStep === 'ADMIN' && <AdminDashboard />}
        {currentStep === 'DOCS' && <DocsView />}
      </main>

      {/* FOOTER */}
      <footer className="h-12 flex items-center justify-center text-white/20 text-xs">
        IOT VENDING SYSTEM • SWIFTPLAY CLOUD
      </footer>
    </div>
  );
};

export default App;
