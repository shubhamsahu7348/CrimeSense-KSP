import React from 'react';
import { Building2, Phone, UserCheck, Shield, CheckCircle2, Clock, Search } from 'lucide-react';
import { PoliceStationInfo } from '../types';

interface StationsDirectoryViewProps {
  stations: PoliceStationInfo[];
  onInvestigateStation: (stationName: string) => void;
}

export const StationsDirectoryView: React.FC<StationsDirectoryViewProps> = ({
  stations,
  onInvestigateStation,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-800" />
            <h2 className="text-lg font-bold text-blue-950 tracking-tight">
              Karnataka Police Stations Directory
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Station House Officer (SHO) Directory & Active Jurisdiction Caseloads
          </p>
        </div>

        <span className="px-3.5 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono font-bold text-blue-900">
          {stations.length} Registered Stations
        </span>
      </div>

      {/* Grid of Police Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((st) => (
          <div
            key={st.code}
            className="bg-white border border-slate-200 hover:border-blue-400/80 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Station Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                    {st.district} • {st.range}
                  </span>
                  <h3 className="text-base font-bold text-blue-950 tracking-tight mt-0.5">
                    {st.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-md font-bold">
                  {st.code}
                </span>
              </div>

              {/* SHO Info */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-3.5 h-3.5 text-blue-800" />
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-mono block">Station House Officer (SHO):</span>
                    <span className="font-bold text-slate-900">{st.shoName}</span>
                    <span className="text-[10px] text-slate-600 font-mono ml-1.5 font-medium">({st.shoRank})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1.5 border-t border-slate-200 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono text-[11px] font-medium">{st.contact}</span>
                </div>
              </div>

              {/* Active vs Solved Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs text-center font-mono">
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-800 block font-sans font-bold">Active Cases</span>
                  <span className="text-lg font-bold text-amber-900">{st.activeCases}</span>
                </div>

                <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 block font-sans font-bold">Solved Cases</span>
                  <span className="text-lg font-bold text-emerald-900">{st.solvedCases}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onInvestigateStation(`List all active FIRs registered at ${st.name}`)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm border border-emerald-700/20 active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Station FIRs</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

