
import React, { useState } from 'react';
import { Scan, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { RentalSession } from '../types';
import { EQUIPMENT_CATALOG } from '../constants';

interface ReturnScanViewProps {
  rental: RentalSession | null;
  onReturn: () => void;
}

export const ReturnScanView: React.FC<ReturnScanViewProps> = ({ rental, onReturn }) => {
  const [status, setStatus] = useState<'SCANNING' | 'VERIFYING' | 'SUCCESS'>('SCANNING');
  const equip = rental ? EQUIPMENT_CATALOG.find(e => e.id === rental.equipmentId) : null;

  const handleSimulateScan = () => {
    setStatus('VERIFYING');
    setTimeout(() => {
      setStatus('SUCCESS');
    }, 3000);
  };

  return (
    <div className="max-w-2xl w-full glass p-12 rounded-[3rem] border-white/10 flex flex-col items-center space-y-10 relative overflow-hidden">
      {status === 'SCANNING' && (
        <>
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-orbitron font-bold uppercase">Return Station</h2>
            <p className="text-white/40">Place the equipment in the scan zone below</p>
          </div>

          <div className="w-full h-80 bg-white/5 rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-all"></div>
            <div className="relative flex flex-col items-center space-y-6">
              <Scan size={80} className="text-blue-400 animate-pulse" />
              <button 
                onClick={handleSimulateScan}
                className="px-8 py-4 bg-blue-600 rounded-2xl font-bold glow-blue hover:scale-105 transition-all"
              >
                Simulate RFID Scan
              </button>
            </div>
            
            {/* Corner Scan Markers */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500"></div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1 glass p-4 rounded-2xl border-white/10 flex items-center gap-3">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="text-xs text-white/50">Locker door will unlock after verification</span>
            </div>
          </div>
        </>
      )}

      {status === 'VERIFYING' && (
        <>
          <div className="w-32 h-32 flex items-center justify-center bg-blue-500/10 rounded-full border border-blue-500/30">
            <Loader2 size={48} className="text-blue-400 animate-spin" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Verifying Equipment ID</h3>
            <p className="text-white/40">Cross-checking RFID tag #RU-9102-X with active sessions...</p>
          </div>
          <div className="w-full space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-[loading_3s_ease-in-out]"></div>
            </div>
            <style>{`
              @keyframes loading {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>
          </div>
        </>
      )}

      {status === 'SUCCESS' && (
        <>
          <div className="w-32 h-32 flex items-center justify-center bg-green-500/20 rounded-full border border-green-500/30 text-green-500">
            <ShieldCheck size={64} />
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold">Verification Complete</h3>
            <div className="glass p-6 rounded-2xl border-white/10 inline-block">
              <p className="text-sm text-white/50 mb-1">Equipment Returned</p>
              <p className="font-bold text-xl">{equip?.name || 'Wilson Basketball'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-green-500 font-bold uppercase tracking-widest animate-pulse">Locker {equip?.lockerId || 'L-101'} Open</p>
              <p className="text-sm text-white/40">Please place the item inside and close the door firmly.</p>
            </div>
          </div>
          <button 
            onClick={onReturn}
            className="w-full py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
          >
            Finish & Get Refund
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};
