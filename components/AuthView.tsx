
import React, { useState } from 'react';
import { Smartphone, QrCode, ArrowRight } from 'lucide-react';

interface AuthViewProps {
  onLogin: (phone: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      onLogin(phone);
    }
  };

  return (
    <div className="max-w-md w-full glass p-10 rounded-3xl space-y-10 border-white/10 shadow-2xl">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-orbitron font-bold">Identify Yourself</h2>
        <p className="text-white/50">Login to start your sports session</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 p-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-4 hover:bg-blue-500/5 cursor-pointer transition-colors group">
          <QrCode size={48} className="mx-auto text-blue-400 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium">Scan QR Code</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#121214] text-white/40 uppercase tracking-widest font-bold">Or use phone</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Mobile Number</label>
          <div className="relative">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-xl focus:border-blue-500 focus:bg-blue-500/5 outline-none transition-all placeholder:text-white/10"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-blue-600 rounded-2xl font-bold text-xl glow-blue hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          Continue
          <ArrowRight size={24} />
        </button>
      </form>
    </div>
  );
};
