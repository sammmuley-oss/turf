
import React from 'react';
import { Database, Code2, Server, Globe, Cpu } from 'lucide-react';
import { SYSTEM_SPECS } from '../constants';

export const DocsView: React.FC = () => {
  return (
    <div className="w-full max-w-5xl space-y-12 overflow-y-auto max-h-[80vh] pr-4 custom-scrollbar">
      <div className="space-y-4 border-l-4 border-blue-600 pl-8">
        <h2 className="text-5xl font-orbitron font-bold">SYSTEM ARCHITECTURE</h2>
        <p className="text-xl text-white/40 leading-relaxed max-w-3xl">
          Comprehensive breakdown of the SwiftPlay Vending Logic, Hardware Interface, and Cloud Backend.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[2.5rem] border-white/10 space-y-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Server className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold">Core Infrastructure</h3>
          <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
            {SYSTEM_SPECS.architecture}
          </p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/10 space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <Database className="text-blue-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold">Data Schema</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs font-bold text-blue-400 uppercase mb-1">Users Table</p>
              <code className="text-[10px] text-white/40">id, phone_hash, payment_token, loyalty_pts</code>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs font-bold text-blue-400 uppercase mb-1">Rental Sessions</p>
              <code className="text-[10px] text-white/40">id, user_id, rfid_tag, start_ts, expected_end_ts, actual_end_ts, total_fee, deposit_status</code>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <Code2 size={24} className="text-blue-500" />
          API Specification
        </h3>
        <div className="grid gap-4">
          {SYSTEM_SPECS.apiEndpoints.map(api => (
            <div key={api.path} className="glass p-6 rounded-2xl border-white/10 flex items-center justify-between hover:bg-white/5 transition-all">
              <div className="flex items-center gap-6">
                <span className="px-4 py-1 bg-blue-600 text-xs font-bold rounded-lg uppercase">{api.method}</span>
                <span className="font-mono text-sm text-blue-400">{api.path}</span>
              </div>
              <span className="text-sm text-white/40">{api.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {SYSTEM_SPECS.techStack.map(stack => (
          <div key={stack.name} className="glass p-6 rounded-2xl border-white/10 text-center space-y-2">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stack.name}</p>
            <p className="font-bold text-sm text-blue-400">{stack.tech}</p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-blue-600/10 rounded-3xl border border-blue-500/20 space-y-4">
        <h4 className="font-bold flex items-center gap-2">
          <Cpu size={18} className="text-blue-500" />
          Error Handling Protocols
        </h4>
        <ul className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Power Failure: Battery backup lasts 4 hours. All solenoids default to LOCKED.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Network Out: Local cache stores rental logs. Batch syncs on reconnect.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Hardware Jam: Weight sensors trigger alert to admin dashboard if item is not removed/returned.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>RFID Collision: System ignores duplicate tags within 5 seconds of verify.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
