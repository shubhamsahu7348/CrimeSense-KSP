import React, { useState } from 'react';
import { 
  Search, Filter, Database, Calendar, Building2, Tag, Shield, 
  ChevronRight, Plus, CheckCircle2, Clock, AlertTriangle, User, FileText
} from 'lucide-react';
import { FIRRecord, CrimeCategory, CaseStatus } from '../types';

interface FIRExplorerViewProps {
  firs: FIRRecord[];
  onSelectFIR: (fir: FIRRecord) => void;
  onNewFIRClick: () => void;
  onInvestigateFIR: (firNumber: string) => void;
}

export const FIRExplorerView: React.FC<FIRExplorerViewProps> = ({
  firs,
  onSelectFIR,
  onNewFIRClick,
  onInvestigateFIR,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Filter FIRs
  const filteredFIRs = firs.filter((fir) => {
    const matchesSearch =
      fir.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.policeStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.crimeCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.complainant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.sections.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      fir.accused.some((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDistrict = selectedDistrict === 'All' || fir.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || fir.crimeCategory === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || fir.caseStatus === selectedStatus;

    return matchesSearch && matchesDistrict && matchesCategory && matchesStatus;
  });

  const districts = ['All', 'Bengaluru City', 'Mysuru City', 'Mangaluru City', 'Hubballi-Dharwad'];
  const categories = [
    'All',
    'Cyber Fraud',
    'House Theft',
    'Chain Snatching',
    'Narcotics',
    'Financial Fraud',
    'Vehicle Theft',
    'Assault',
    'Robbery',
  ];
  const statuses = [
    'All',
    'Under Investigation',
    'Chargesheet Filed',
    'Pending Trial',
    'Solved',
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Filter & Search Control Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-blue-950 flex items-center space-x-2 tracking-tight">
              <Database className="w-5 h-5 text-blue-700" />
              <span>Karnataka Police FIR Records Database</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Showing <span className="text-emerald-700 font-mono font-bold">{filteredFIRs.length}</span> of {firs.length} total registered crime records
            </p>
          </div>

          <button
            onClick={onNewFIRClick}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md active:scale-95 border border-emerald-700/20"
          >
            <Plus className="w-4 h-4" />
            <span>Register New FIR</span>
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search FIR No, Section, Accused..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
            />
          </div>

          {/* District Filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 cursor-pointer"
            >
              <option value="All">All Districts</option>
              {districts.filter((d) => d !== 'All').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 cursor-pointer"
            >
              <option value="All">All Crime Types</option>
              {categories.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 cursor-pointer"
            >
              <option value="All">All Case Statuses</option>
              {statuses.filter((s) => s !== 'All').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FIR Cards Grid */}
      {filteredFIRs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No matching FIR records found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search keywords or filter dropdowns.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFIRs.map((fir) => (
            <div
              key={fir.id}
              className="bg-white border border-slate-200 hover:border-blue-400/80 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Card Header */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold tracking-wider block uppercase">
                      {fir.district}
                    </span>
                    <h3 className="text-sm font-bold font-mono text-blue-950 group-hover:text-blue-700 transition-colors">
                      {fir.firNumber}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-md ${
                      fir.caseStatus === 'Solved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                        : fir.caseStatus === 'Chargesheet Filed'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300 font-bold'
                        : 'bg-amber-100 text-amber-800 border border-amber-300 font-bold'
                    }`}
                  >
                    {fir.caseStatus}
                  </span>
                </div>

                {/* Sub details */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-medium">{fir.policeStation}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-700">
                    <Tag className="w-3.5 h-3.5 text-blue-700" />
                    <span className="font-bold text-blue-900">{fir.crimeCategory}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 text-[11px] truncate">{fir.subCategory}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Filed: {fir.filingDate}</span>
                  </div>
                </div>

                {/* IPC / BNS Sections */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {fir.sections.map((sec, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-md font-semibold"
                    >
                      {sec}
                    </span>
                  ))}
                </div>

                {/* Incident Brief */}
                <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {fir.incidentSummary}
                </p>

                {/* Accused & Complainant snippet */}
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p>
                    <strong className="text-slate-900">Complainant:</strong> {fir.complainant.name}
                  </p>
                  <p>
                    <strong className="text-slate-900">Accused:</strong>{' '}
                    {fir.accused.map((a) => a.name).join(', ') || 'Unidentified'}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <button
                  onClick={() => onSelectFIR(fir)}
                  className="text-blue-700 hover:text-blue-900 font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Record</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onInvestigateFIR(fir.firNumber)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-[11px] font-semibold flex items-center space-x-1 cursor-pointer transition-colors border border-blue-200"
                >
                  <Search className="w-3 h-3 text-blue-700" />
                  <span>Investigate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
