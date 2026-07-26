import React from 'react';
import { Shield, Database, Search, Users, BarChart3, Building2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { SystemAnalytics } from '../types';

interface HeaderProps {
  activeTab: 'chat' | 'firs' | 'offenders' | 'analytics' | 'stations';
  setActiveTab: (tab: 'chat' | 'firs' | 'offenders' | 'analytics' | 'stations') => void;
  analytics: SystemAnalytics | null;
  onNewFIRClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  analytics,
  onNewFIRClick,
}) => {
  return (
    <header className="bg-blue-950 text-white border-b border-blue-900 shadow-xl sticky top-0 z-40">
      {/* Top Police Banner */}
      <div className="bg-slate-950 px-4 py-2 border-b border-blue-900/80 text-xs flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-emerald-300">SYSTEM ONLINE</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="font-semibold tracking-wider text-amber-300 uppercase text-[10px] font-mono">
            GOVERNMENT OF KARNATAKA • KARNATAKA STATE POLICE
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">CrimeSense AI Engine v2.6</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-300">
          <span className="hidden sm:inline text-[11px]">Law Enforcement Portal</span>
          <span className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-300 font-mono text-[10px] uppercase tracking-widest border border-emerald-500/40 font-bold">
            KSP-SECURED
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand & Crest */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-blue-950/50 border border-amber-400/40">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
                Karnataka Police <span className="text-emerald-400 font-extrabold">CrimeSense AI</span>
              </h1>
              <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-widest">
                KSP Portal
              </span>
            </div>
            <p className="text-xs text-blue-200">
              Official Crime Records Search, Intelligence Analysis & Repeat Offender Profiler
            </p>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        {analytics && (
          <div className="hidden lg:flex items-center space-x-3 text-xs bg-blue-900/60 p-1.5 rounded-xl border border-blue-800">
            <div className="px-3 py-1 bg-blue-950/80 rounded-lg flex items-center space-x-2 border border-blue-800">
              <Database className="w-3.5 h-3.5 text-blue-300" />
              <div>
                <p className="text-blue-300 text-[9px] uppercase tracking-wider font-mono leading-none">Total FIRs</p>
                <p className="font-bold text-white font-mono mt-0.5">{analytics.totalFIRs}</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-950/80 rounded-lg flex items-center space-x-2 border border-blue-800">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <div>
                <p className="text-blue-300 text-[9px] uppercase tracking-wider font-mono leading-none">Active Cases</p>
                <p className="font-bold text-amber-300 font-mono mt-0.5">{analytics.underInvestigation}</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-950/80 rounded-lg flex items-center space-x-2 border border-blue-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <p className="text-blue-300 text-[9px] uppercase tracking-wider font-mono leading-none">Solved Rate</p>
                <p className="font-bold text-emerald-400 font-mono mt-0.5">
                  {Math.round(((analytics.solved + analytics.chargesheetFiled) / (analytics.totalFIRs || 1)) * 100)}%
                </p>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-950/80 rounded-lg flex items-center space-x-2 border border-blue-800">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
              <div>
                <p className="text-blue-300 text-[9px] uppercase tracking-wider font-mono leading-none">Offenders</p>
                <p className="font-bold text-rose-300 font-mono mt-0.5">{analytics.repeatOffendersCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onNewFIRClick}
          className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40 border border-emerald-400/30 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
        >
          <Database className="w-4 h-4" />
          <span>Register New FIR</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-blue-900/80 px-4 border-t border-blue-800/80">
        <nav className="max-w-7xl mx-auto flex space-x-1.5 overflow-x-auto py-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/80'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>AI Crime Intelligence</span>
          </button>

          <button
            onClick={() => setActiveTab('firs')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'firs'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/80'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>FIR Records Explorer</span>
            {analytics && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                activeTab === 'firs' ? 'bg-emerald-800 text-white' : 'bg-blue-950 text-blue-200'
              }`}>
                {analytics.totalFIRs}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('offenders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'offenders'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/80'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Repeat Offenders Profiler</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/80'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Crime Trends & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('stations')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stations'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/80'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Police Stations Directory</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

