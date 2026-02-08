
import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { Equipment } from '../types';

interface PaymentViewProps {
  equipment: Equipment;
  onComplete: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({ equipment, onComplete }) => {
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const totalAmount = equipment.pricePerHour + (equipment.deposit * 1); // Mock: 1hr + deposit

  const handlePay = () => {
    setStatus('PROCESSING');
    setTimeout(() => {
      setStatus('SUCCESS');
      setTimeout(onComplete, 2000);
    }, 2500);
  };

  return (
    <div className="max-w-2xl w-full grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h2 className="text-4xl font-orbitron font-bold">CHECKOUT</h2>
        
        <div className="glass p-6 rounded-3xl border-white/10 space-y-6">
          <div className="flex gap-4">
            <img src={equipment.image} alt={equipment.name} className="w-20 h-20 rounded-2xl object-cover" />
            <div>
              <h3 className="font-bold">{equipment.name}</h3>
              <p className="text-sm text-white/40">Rental Duration: 1 Hour</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Rental Fee (1hr)</span>
              <span>${equipment.pricePerHour}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Refundable Deposit</span>
              <span>${equipment.deposit}.00</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-2 text-blue-400">
              <span>Total Payable</span>
              <span>${totalAmount}.00</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
          <ShieldCheck className="text-green-500 mt-1" size={20} />
          <p className="text-xs text-green-500/80 leading-relaxed">
            Security deposit is automatically refunded within 5 minutes of verified return. 
            Late returns are charged $5 per additional hour.
          </p>
        </div>
      </div>

      <div className="glass p-10 rounded-3xl border-white/10 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
        {status === 'IDLE' && (
          <>
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border-4 border-white/10 relative">
               <CreditCard size={48} className="text-blue-400" />
               <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Awaiting Payment</h3>
              <p className="text-sm text-white/40">Scan QR or tap card on terminal below</p>
            </div>
            <button 
              onClick={handlePay}
              className="w-full py-4 bg-blue-600 rounded-2xl font-bold shadow-lg hover:bg-blue-500 transition-all"
            >
              Simulate Payment
            </button>
          </>
        )}

        {status === 'PROCESSING' && (
          <>
            <Loader2 size={64} className="text-blue-500 animate-spin" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Processing...</h3>
              <p className="text-sm text-white/40">Securing your equipment locker</p>
            </div>
          </>
        )}

        {status === 'SUCCESS' && (
          <>
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle2 size={64} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Payment Verified!</h3>
              <p className="text-sm text-white/40 font-orbitron text-green-500">OPENING LOCKER {equipment.lockerId}...</p>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-green-500"></div>
          </>
        )}
      </div>
    </div>
  );
};
