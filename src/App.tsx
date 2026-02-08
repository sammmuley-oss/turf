import React, { useState, useEffect } from "react";
import {
  Smartphone,
  User as UserIcon,
  ChevronLeft,
  LogOut,
  FileText,
  BarChart,
} from "lucide-react";

import { AppStep, Equipment, User, RentalSession } from "./types";

// Components
import { HomeView } from "./components/HomeView";
import { AuthView } from "./components/AuthView";
import { SelectionView } from "./components/SelectionView";
import { PaymentView } from "./components/PaymentView";
import { ActiveRentalView } from "./components/ActiveRentalView";
import { ReturnScanView } from "./components/ReturnScanView";
import { AdminDashboard } from "./components/AdminDashboard";
import { DocsView } from "./components/DocsView";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("HOME");
  const [user, setUser] = useState<User | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<Equipment | null>(null);
  const [activeRental, setActiveRental] = useState<RentalSession | null>(null);

  // Restore session
  useEffect(() => {
    const savedUser = localStorage.getItem("swiftplay_user");
    const savedRental = localStorage.getItem("swiftplay_rental");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentStep("SELECTION");
    }

    if (savedRental) {
      setActiveRental(JSON.parse(savedRental));
      setCurrentStep("ACTIVE_RENTAL");
    }
  }, []);

  const handleLogin = (phone: string) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      phone,
      name: "SwiftPlay User",
      balance: 100,
    };

    setUser(newUser);
    localStorage.setItem("swiftplay_user", JSON.stringify(newUser));
    setCurrentStep("SELECTION");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveRental(null);
    localStorage.removeItem("swiftplay_user");
    localStorage.removeItem("swiftplay_rental");
    setCurrentStep("HOME");
  };

  const startPayment = (equip: Equipment) => {
    setSelectedEquip(equip);
    setCurrentStep("PAYMENT");
  };

  const completeRental = () => {
    if (!selectedEquip || !user) return;

    const newRental: RentalSession = {
      id: `r-${Date.now()}`,
      userId: user.id,
      equipmentId: selectedEquip.id,
      startTime: Date.now(),
      expectedReturn: Date.now() + 60 * 60 * 1000,
      paidDeposit: selectedEquip.deposit,
      status: "ACTIVE",
    };

    setActiveRental(newRental);
    localStorage.setItem("swiftplay_rental", JSON.stringify(newRental));
    setCurrentStep("ACTIVE_RENTAL");
  };

  const handleReturn = () => {
    setActiveRental(null);
    localStorage.removeItem("swiftplay_rental");
    setCurrentStep("HOME");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0a0c] text-white">
      {/* Header */}
      <header className="h-20 glass flex items-center justify-between px-8 border-b border-white/10">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setCurrentStep("HOME")}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Smartphone size={22} />
          </div>
          <span className="text-xl font-bold text-blue-400">SWIFTPLAY</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentStep("DOCS")}
            className="flex items-center gap-2 text-white/60 hover:text-white"
          >
            <FileText size={18} />
            Docs
          </button>

          <button
            onClick={() => setCurrentStep("ADMIN")}
            className="flex items-center gap-2 text-white/60 hover:text-white"
          >
            <BarChart size={18} />
            Admin
          </button>

          {user && (
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <UserIcon size={16} className="text-blue-400" />
              <span className="text-sm">{user.phone}</span>
              <button
                onClick={handleLogout}
                className="text-white/40 hover:text-red-400"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-8 relative">
        {currentStep !== "HOME" && (
          <button
            onClick={() => setCurrentStep("HOME")}
            className="absolute top-4 left-8 flex items-center gap-2 text-white/60 hover:text-blue-400"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>
        )}

        {currentStep === "HOME" && (
          <HomeView
            onRent={() => setCurrentStep("AUTH")}
            onReturn={() => setCurrentStep("RETURN_SCAN")}
            activeRental={activeRental}
          />
        )}

        {currentStep === "AUTH" && <AuthView onLogin={handleLogin} />}

        {currentStep === "SELECTION" && (
          <SelectionView onSelect={startPayment} />
        )}

        {currentStep === "PAYMENT" && selectedEquip && (
          <PaymentView
            equipment={selectedEquip}
            onComplete={completeRental}
          />
        )}

        {currentStep === "ACTIVE_RENTAL" && activeRental && (
          <ActiveRentalView rental={activeRental} />
        )}

        {currentStep === "RETURN_SCAN" && (
          <ReturnScanView rental={activeRental} onReturn={handleReturn} />
        )}

        {currentStep === "ADMIN" && <AdminDashboard />}
        {currentStep === "DOCS" && <DocsView />}
      </main>

      {/* Footer */}
      <footer className="h-12 flex items-center justify-center text-xs text-white/20">
        IOT VENDING SYSTEM • SWIFTPLAY
      </footer>
    </div>
  );
};

export default App;
