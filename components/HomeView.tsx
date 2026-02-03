
import React from 'react';
import { PlayCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { RentalSession } from '../types';

interface HomeViewProps {
  onRent: () => void;
  onReturn: () => void;
  activeRental: RentalSession | null;
}

export const HomeView: React.FC<HomeViewProps> = ({ onRent, onReturn, activeRental }) => {
  return (
    <div className="max-w-4xl w-full text-center space-y-12">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-orbitron font-bold tracking-tighter leading-tight">
          PLAY <span className="text-blue-500">HARDER.</span><br />
          RENT <span className="text-white/40">SMARTER.</span>
        </h1>
        <p className="text-xl text-white/50 max-w-2xl mx-auto">
          Instant sports equipment access. Smart tracking. Seamless returns.
          Choose your gear and hit the turf in seconds.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <button 
          onClick={onRent}
          className="group relative h-64 glass rounded-3xl overflow-hidden hover:bg-blue-600/10 transition-all duration-500 border-white/20 hover:border-blue-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative h-full flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
              <PlayCircle size={40} />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">New Rental</h2>
              <p className="text-white/40">Grab balls, bats, or rackets</p>
            </div>
            <ArrowRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
          </div>
        </button>

        <button 
          onClick={onReturn}
          className="group relative h-64 glass rounded-3xl overflow-hidden hover:bg-white/5 transition-all duration-500 border-white/20 hover:border-white/40"
        >
          <div className="relative h-full flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
              <RefreshCw size={40} />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">Quick Return</h2>
              <p className="text-white/40">Return gear & get refund</p>
            </div>
            {activeRental && (
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30 animate-pulse">
                Active Rental Found
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
