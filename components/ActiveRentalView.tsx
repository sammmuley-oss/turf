
import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Smartphone } from 'lucide-react';
import { RentalSession } from '../types';
import { EQUIPMENT_CATALOG } from '../constants';

interface ActiveRentalViewProps {
  rental: RentalSession;
}

export const ActiveRentalView: React.FC<ActiveRentalViewProps> = ({ rental }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour mock
  const equip = EQUIPMENT_CATALOG.find(e => e.id === rental.equipmentId);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center space-y-12">
      <div className="text-center space-y-4">
        <div className="bg-blue-500/10 text-blue-400 px-6 py-2 rounded-full border border-blue-500/30 text-sm font-bold uppercase tracking-widest inline-block">
          Rental in Progress
        </div>
        <h2 className="text-6xl font-orbitron font-bold">GOOD LUCK!</h2>
        <p className="text-white/40">Take your gear and enjoy the turf. Don't forget to return it!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="glass p-10 rounded-[3rem] border-white/10 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="w-56 h-56 rounded-full border-8 border-white/5 flex flex-col items-center justify-center">
              <span className="text-5xl font-orbitron font-bold text-blue-500">{formatTime(timeLeft)}</span>
              <span className="text-xs uppercase tracking-widest font-bold text-white/30">Remaining</span>
            </div>
            <svg className="absolute top-0 left-0 w-56 h-56 -rotate-90">
              <circle 
                cx="112" cy="112" r="104" 
                fill="none" stroke="currentColor" 
                strokeWidth="8" 
                className="text-blue-500"
                strokeDasharray="653"
                strokeDashoffset={653 - (653 * timeLeft) / 3600}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-xl text-sm border border-yellow-500/20">
            <AlertCircle size={18} />
            <span>Late returns incur $0.10/min penalty</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border-white/10 flex items-center gap-6">
            <img src={equip?.image} className="w-24 h-24 rounded-2xl object-cover" alt="" />
            <div>
              <h3 className="text-2xl font-bold">{equip?.name}</h3>
              <p className="text-white/40">Assigned Locker: {equip?.lockerId}</p>
              <div className="mt-2 text-xs font-bold text-green-500 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                RFID TRACKING ACTIVE
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <Smartphone className="text-blue-400" />
              <div>
                <p className="font-bold">Keep tracking on your phone</p>
                <p className="text-xs text-white/40">We've sent a tracking link to your mobile number.</p>
              </div>
            </div>
            <button className="w-full py-4 bg-white/5 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10">
              Request Extension
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
