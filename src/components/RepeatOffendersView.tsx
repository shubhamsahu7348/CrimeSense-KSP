import React from 'react';
import { 
  Users, AlertTriangle, Shield, Search, MapPin, Tag, ChevronRight, CheckCircle2, UserX
} from 'lucide-react';
import { RepeatOffender } from '../types';

interface RepeatOffendersViewProps {
  offenders: RepeatOffender[];
  onInvestigateOffender: (offenderName: string) => void;
  onInspectFIR: (firNumber: string) => void;
}

export const RepeatOffendersView: React.FC<RepeatOffendersViewProps> = ({
  offenders,
  onInvestigateOffender,
  onInspectFIR,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-800" />
            <h2 className="text-lg font-bold text-blue-950 tracking-tight">
              Habitual Offender Index & Gang Profiler
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            State Crime Records Bureau (SCRB) Habitual Criminal Database • Karnataka State Police
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono">
          <span className="text-slate-600 font-medium">Tracked Repeat Offenders:</span>
          <span className="text-emerald-700 font-bold text-sm">{offenders.length}</span>
        </div>
      </div>

      {/* Offender Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offenders.map((offender) => (
          <div
            key={offender.id}
            className="bg-white border border-slate-200 hover:border-blue-400/80 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
          >
            {/* Top Risk Indicator */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                  Profile ID: {offender.id}
                </span>
                <h3 className="text-base font-bold text-blue-950 tracking-tight">
                  {offender.name}
                </h3>
                {offender.alias && (
                  <p className="text-xs text-blue-700 font-mono font-semibold">
                    Alias: "{offender.alias}"
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    offender.riskLevel === 'Critical'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {offender.riskLevel} Risk
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    offender.status === 'Absconding'
                      ? 'bg-rose-100 text-rose-800'
                      : offender.status === 'In Custody'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {offender.status}
                </span>
              </div>
            </div>

            {/* Offender Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Age:</span>
                <span className="font-semibold text-slate-800">{offender.age} Years</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Primary Offenses:</span>
                <span className="font-bold text-blue-900">
                  {offender.primaryCrimeTypes.join(', ')}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 flex items-center space-x-1 text-[10px] uppercase font-mono">
                  <MapPin className="w-3 h-3 text-blue-700" />
                  <span>Last Known Location / Area:</span>
                </span>
                <span className="font-semibold text-slate-800 block mt-0.5">
                  {offender.lastKnownLocation}
                </span>
              </div>
            </div>

            {/* Modus Operandi Pattern */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-900 uppercase font-mono tracking-wider">
                Modus Operandi Pattern:
              </span>
              <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-sans">
                {offender.modusOperandiPattern}
              </p>
            </div>

            {/* Linked FIRs */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase font-mono tracking-wider">
                Linked FIRs ({offender.linkedFIRs.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {offender.linkedFIRs.map((firNo, idx) => (
                  <button
                    key={idx}
                    onClick={() => onInspectFIR(firNo)}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-400 rounded-lg font-mono text-xs font-bold text-blue-900 flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <span>{firNo}</span>
                    <ChevronRight className="w-3 h-3 text-blue-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onInvestigateOffender(`Tell me all details and linked FIRs for repeat offender ${offender.name}`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md active:scale-95 border border-emerald-700/20"
              >
                <Search className="w-3.5 h-3.5" />
                <span>AI Deep Profile Search</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

