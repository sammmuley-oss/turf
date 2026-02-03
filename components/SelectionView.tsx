
import React, { useState } from 'react';
import { Search, Filter, ShieldCheck } from 'lucide-react';
import { Equipment, RentalStatus } from '../types';
import { EQUIPMENT_CATALOG } from '../constants';

interface SelectionViewProps {
  onSelect: (equip: Equipment) => void;
}

export const SelectionView: React.FC<SelectionViewProps> = ({ onSelect }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Ball', 'Racket', 'Bat'];

  const filteredItems = EQUIPMENT_CATALOG.filter(item => 
    filter === 'All' || item.type === filter
  );

  return (
    <div className="w-full max-w-6xl space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-orbitron font-bold">SELECT GEAR</h2>
          <p className="text-white/50">Current inventory at Kiosk #402 (Central Park Turf)</p>
        </div>

        <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className={`group glass rounded-3xl overflow-hidden border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col ${item.status === RentalStatus.RENTED ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="relative h-48 bg-white/5 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {item.status === RentalStatus.RENTED && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full border border-red-500/30 text-xs font-bold uppercase tracking-widest">Unavailable</span>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium">
                Locker {item.lockerId}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold line-clamp-1">{item.name}</h3>
                <span className="text-blue-400 font-bold">${item.pricePerHour}<span className="text-xs font-normal text-white/40">/hr</span></span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span>Includes ${item.deposit} refundable deposit</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>High quality tournament grade</span>
                </div>
              </div>

              <button 
                disabled={item.status === RentalStatus.RENTED}
                onClick={() => onSelect(item)}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold group-hover:bg-blue-600 group-hover:border-blue-500 transition-all disabled:cursor-not-allowed"
              >
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
