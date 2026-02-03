
import React from 'react';
import { BarChart3, Package, Users, Activity, Settings, Power, HardDrive } from 'lucide-react';
import { EQUIPMENT_CATALOG } from '../constants';
import { RentalStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Rentals', value: '1,284', change: '+12%', icon: BarChart3 },
    { label: 'Revenue', value: '$4,102.50', change: '+$240 today', icon: Activity },
    { label: 'Avg Session', value: '48 min', change: '-5%', icon: Power },
  ];

  return (
    <div className="w-full max-w-6xl space-y-10">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-orbitron font-bold">CORE CONTROL</h2>
          <p className="text-white/40">Machine ID: SWP-K402 • Status: <span className="text-green-500">Online</span></p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings size={18} />
            Diagnostic Run
          </button>
          <button className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-500 transition-all flex items-center gap-2">
            <Power size={18} />
            Emergency Lock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="glass p-8 rounded-3xl border-white/10 space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-green-500">{stat.change}</span>
            </div>
            <div>
              <p className="text-sm text-white/40 uppercase tracking-widest font-bold">{stat.label}</p>
              <h3 className="text-4xl font-orbitron font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 glass rounded-3xl border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <Package size={20} className="text-blue-400" />
              Hardware Inventory Status
            </h3>
            <button className="text-xs font-bold text-blue-400 hover:underline">Update Manifest</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-4">Locker</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">RFID Status</th>
                  <th className="px-6 py-4">Sensors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {EQUIPMENT_CATALOG.map(item => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-orbitron text-sm">{item.lockerId}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm">{item.name}</div>
                      <div className="text-[10px] text-white/30">{item.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.status === RentalStatus.AVAILABLE ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-400'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border-white/10 space-y-8">
          <h3 className="font-bold flex items-center gap-2">
            <HardDrive size={20} className="text-blue-400" />
            System Health
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>CPU Load</span>
                <span>24%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[24%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>Memory</span>
                <span>1.2 GB / 4 GB</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[30%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>Disk Storage</span>
                <span>82% Free</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[18%]"></div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <h4 className="text-xs font-bold uppercase text-white/20">Network Mesh</h4>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="text-sm font-bold">5G Primary Uplink</span>
            </div>
            <div className="flex items-center gap-3 opacity-30">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <span className="text-sm">Satellite Backup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
