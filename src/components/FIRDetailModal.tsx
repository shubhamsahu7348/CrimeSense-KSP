import React from 'react';
import { X, Shield, Tag, Calendar, Building2, UserCheck, AlertTriangle, FileText, Search, ExternalLink } from 'lucide-react';
import { FIRRecord } from '../types';

interface FIRDetailModalProps {
  fir: FIRRecord | null;
  onClose: () => void;
  onInvestigate: (firNumber: string) => void;
}

export const FIRDetailModal: React.FC<FIRDetailModalProps> = ({
  fir,
  onClose,
  onInvestigate,
}) => {
  if (!fir) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 text-slate-900">
        {/* Modal Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-mono text-blue-900 font-bold uppercase tracking-wide">
                {fir.district} • {fir.policeStation}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  fir.caseStatus === 'Solved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {fir.caseStatus}
              </span>
            </div>
            <h2 className="text-xl font-bold font-mono text-blue-950 tracking-tight">
              {fir.firNumber}
            </h2>
            <p className="text-xs text-blue-800 font-bold mt-0.5">{fir.crimeCategory} — {fir.subCategory}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BNS/IPC Sections & Filing Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-600 block text-[11px] mb-1.5 font-mono uppercase font-bold">Applicable Sections:</span>
            <div className="flex flex-wrap gap-1">
              {fir.sections.map((sec, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-md font-mono border border-blue-200 font-bold"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-600 block text-[11px] mb-1.5 font-mono uppercase font-bold">Incident & Filing Timestamps:</span>
            <div className="space-y-0.5 font-mono text-slate-800 font-medium">
              <p>Incident: {fir.incidentDate} at {fir.incidentTime}</p>
              <p>FIR Filed: {fir.filingDate}</p>
            </div>
          </div>
        </div>

        {/* Complainant vs Accused */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Complainant */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 space-y-1.5">
            <h4 className="font-bold text-blue-900 uppercase font-mono tracking-wider flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-blue-800" />
              <span>Complainant</span>
            </h4>
            <p className="text-slate-900 font-bold text-sm">{fir.complainant.name}</p>
            <p className="text-slate-700">Age: {fir.complainant.age} Years</p>
            <p className="text-slate-700 font-mono">Contact: {fir.complainant.contact}</p>
            <p className="text-slate-700">Address: {fir.complainant.address}</p>
          </div>

          {/* Accused */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-1.5">
            <h4 className="font-bold text-rose-800 uppercase font-mono tracking-wider flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>Accused ({fir.accused.length})</span>
            </h4>
            <div className="space-y-2">
              {fir.accused.map((a, idx) => (
                <div key={idx} className="pb-1 border-b border-rose-200 last:border-0">
                  <p className="text-slate-900 font-bold text-sm">
                    {a.name} {a.alias && <span className="text-blue-900 font-mono text-xs">("{a.alias}")</span>}
                  </p>
                  <div className="flex justify-between items-center text-[11px] mt-0.5">
                    <span className="text-slate-700">Status: <strong className="text-rose-800 font-bold">{a.status}</strong></span>
                    {a.priorOffensesCount ? (
                      <span className="text-blue-900 font-mono font-bold">{a.priorOffensesCount} Priors</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modus Operandi */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-blue-950 uppercase font-mono tracking-wider">
            Modus Operandi:
          </h4>
          <p className="text-xs text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed font-sans">
            {fir.modusOperandi}
          </p>
        </div>

        {/* Evidence List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
            Physical & Digital Evidence Seized ({fir.evidenceItems.length}):
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {fir.evidenceItems.map((item, idx) => (
              <li key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 flex items-start space-x-2 font-medium">
                <span className="text-blue-800 font-bold font-mono text-[10px]">#{idx + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Case Incident Summary */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
            Official Case Incident Summary:
          </h4>
          <p className="text-xs text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed font-sans">
            {fir.incidentSummary}
          </p>
        </div>

        {/* Officer in Charge */}
        <div className="text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-slate-700 font-medium">
          <div>
            <span>Investigating Officer: </span>
            <strong className="text-slate-900 font-bold">{fir.investigatingOfficer.name}</strong> ({fir.investigatingOfficer.rank})
          </div>
          <span className="font-mono text-[11px] text-blue-900 font-bold">Badge: {fir.investigatingOfficer.badgeNo}</span>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer transition-colors border border-slate-300"
          >
            Close
          </button>

          <button
            onClick={() => {
              onInvestigate(fir.firNumber);
              onClose();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 cursor-pointer transition-all active:scale-95 border border-emerald-700/20"
          >
            <Search className="w-4 h-4" />
            <span>Investigate this FIR with AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

