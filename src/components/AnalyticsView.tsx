import React from 'react';
import { BarChart3, PieChart, Shield, TrendingUp, CheckCircle2, Clock, FileText, Building2 } from 'lucide-react';
import { SystemAnalytics, FIRRecord } from '../types';

interface AnalyticsViewProps {
  analytics: SystemAnalytics;
  firs: FIRRecord[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics, firs }) => {
  // Compute crime category breakdown
  const categoryEntries = Object.entries(analytics.crimeByCategory).sort((a, b) => Number(b[1]) - Number(a[1]));
  const districtEntries = Object.entries(analytics.crimeByDistrict).sort((a, b) => Number(b[1]) - Number(a[1]));

  const maxCategoryCount = Math.max(...categoryEntries.map((c) => Number(c[1])), 1);
  const maxDistrictCount = Math.max(...districtEntries.map((d) => Number(d[1])), 1);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Analytics Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-800" />
            <h2 className="text-lg font-bold text-blue-950 tracking-tight">
              Karnataka Crime Trends & Intelligence Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Real-time aggregate insights computed across all registered FIR records
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3.5 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-mono font-semibold">
            Dataset Size: <strong className="text-blue-900">{analytics.totalFIRs} FIRs</strong>
          </span>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500 font-medium uppercase font-mono tracking-wider">Total Registered FIRs</span>
            <FileText className="w-4 h-4 text-blue-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-blue-950">{analytics.totalFIRs}</p>
          <span className="text-[10px] text-slate-500 mt-1 block">Karnataka Police Network</span>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-amber-800 font-medium uppercase font-mono tracking-wider">Under Investigation</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-amber-900">{analytics.underInvestigation}</p>
          <span className="text-[10px] text-amber-700 mt-1 block font-semibold">Active Investigation Pending</span>
        </div>

        <div className="bg-blue-50/60 border border-blue-200 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-blue-800 font-medium uppercase font-mono tracking-wider">Chargesheets Filed</span>
            <Shield className="w-4 h-4 text-blue-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-blue-900">{analytics.chargesheetFiled}</p>
          <span className="text-[10px] text-blue-700 mt-1 block font-semibold">Submitted to Judicial Court</span>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-emerald-800 font-medium uppercase font-mono tracking-wider">Solved Cases</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-900">{analytics.solved}</p>
          <span className="text-[10px] text-emerald-700 mt-1 block font-semibold">Property Recovered & Closed</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crime Type Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-blue-950 flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-blue-700" />
              <span>Crime Breakdown by Category</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500 font-semibold">Cases Count</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {categoryEntries.map(([category, count]) => {
              const numCount = Number(count);
              const percentage = Math.round((numCount / maxCategoryCount) * 100);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-800 font-semibold">{category}</span>
                    <span className="text-blue-900 font-mono font-bold">{numCount} Cases</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-blue-700 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-blue-950 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Crime Distribution by District Jurisdiction</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500 font-semibold">Total FIRs</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {districtEntries.map(([district, count]) => {
              const numCount = Number(count);
              const percentage = Math.round((numCount / maxDistrictCount) * 100);
              return (
                <div key={district} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-800 font-semibold">{district}</span>
                    <span className="text-emerald-800 font-mono font-bold">{numCount} FIRs</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

