import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  Activity,
  Settings,
  Power,
  HardDrive,
  Image as ImageIcon
} from 'lucide-react';
import { EQUIPMENT_CATALOG } from '../constants';
import { RentalStatus } from '../types';
import { uploadToCloudinary } from '../src/utils/cloudinary';

export const AdminDashboard: React.FC = () => {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // 🔒 Service state (PRE-LAUNCH)
  const SERVICE_STARTED = false;

  const stats = SERVICE_STARTED
    ? [
        { label: 'Total Rentals', value: '1,284', change: '+12%', icon: BarChart3 },
        { label: 'Revenue', value: '$4,102.50', change: '+$240 today', icon: Activity },
        { label: 'Avg Session', value: '48 min', change: '-5%', icon: Power },
      ]
    : [
        { label: 'Total Rentals', value: '0', change: '—', icon: BarChart3 },
        { label: 'Revenue', value: '$0.00', change: '—', icon: Activity },
        { label: 'Avg Session', value: '0 min', change: '—', icon: Power },
      ];

  return (
    <div className="w-full max-w-6xl space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-orbitron font-bold">CORE CONTROL</h2>
          <p className="text-white/40">
            Machine ID: SWP-K402 • Status:{' '}
            <span className={SERVICE_STARTED ? 'text-green-500' : 'text-yellow-500'}>
              {SERVICE_STARTED ? 'Online' : 'Service Not Started'}
            </span>
          </p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings size={18} />
            Diagnostic Run
          </button>

          <button
            disabled={!SERVICE_STARTED}
            className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
              SERVICE_STARTED
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <Power size={18} />
            Emergency Lock
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="glass p-8 rounded-3xl border-white/10 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-white/30">
                {stat.change}
              </span>
            </div>

            <div>
              <p className="text-sm text-white/40 uppercase tracking-widest font-bold">
                {stat.label}
              </p>
              <h3 className="text-4xl font-orbitron font-bold">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory + System Health */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Inventory */}
        <div className="md:col-span-2 glass rounded-3xl border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <Package size={20} className="text-blue-400" />
              Hardware Inventory Status
            </h3>
            <button className="text-xs font-bold text-blue-400 hover:underline">
              Update Manifest
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-4">Locker</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">RFID Status</th>
                  <th className="px-6 py-4">Sensors</th>
                  <th className="px-6 py-4">Image</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {EQUIPMENT_CATALOG.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-orbitron text-sm">
                      {item.lockerId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-sm">{item.name}</div>
                      <div className="text-[10px] text-white/30">{item.type}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          item.status === RentalStatus.AVAILABLE
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </td>

                    {/* Image Upload */}
                    <td className="px-6 py-4">
                      <label className="cursor-pointer text-blue-400 text-xs font-bold flex items-center gap-2">
                        <ImageIcon size={14} />
                        {uploadingId === item.id ? 'Uploading…' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={async e => {
                            if (!e.target.files?.[0]) return;
                            try {
                              setUploadingId(item.id);
                              const res = await uploadToCloudinary(
                                e.target.files[0]
                              );
                              console.log(`Image for ${item.name}:`, res.secure_url);
                              alert('Image uploaded successfully!');
                            } catch {
                              alert('Upload failed');
                            } finally {
                              setUploadingId(null);
                            }
                          }}
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="glass p-8 rounded-3xl border-white/10 space-y-8">
          <h3 className="font-bold flex items-center gap-2">
            <HardDrive size={20} className="text-blue-400" />
            System Health
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>CPU Load</span>
                <span>24%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full">
                <div className="h-full bg-green-500 w-[24%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>Memory</span>
                <span>1.2 GB / 4 GB</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full">
                <div className="h-full bg-blue-500 w-[30%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>Disk Storage</span>
                <span>82% Free</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full">
                <div className="h-full bg-blue-400 w-[18%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
