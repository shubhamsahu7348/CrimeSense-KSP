import React, { useState } from 'react';
import { X, Shield, Plus, Database, AlertCircle } from 'lucide-react';
import { FIRRecord, CrimeCategory, CaseStatus } from '../types';

interface NewFIRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFIR: (newFIR: FIRRecord) => void;
}

export const NewFIRModal: React.FC<NewFIRModalProps> = ({
  isOpen,
  onClose,
  onAddFIR,
}) => {
  const [firNumber, setFirNumber] = useState(`KA-BGR-2026-${Math.floor(10000 + Math.random() * 90000)}`);
  const [policeStation, setPoliceStation] = useState('Koramangala Police Station');
  const [district, setDistrict] = useState('Bengaluru City');
  const [crimeCategory, setCrimeCategory] = useState<CrimeCategory>('Cyber Fraud');
  const [subCategory, setSubCategory] = useState('');
  const [sectionsStr, setSectionsStr] = useState('BNS 318(4), IT Act 66D');
  const [incidentDate, setIncidentDate] = useState('2026-03-28');
  const [incidentTime, setIncidentTime] = useState('10:00 AM');
  const [filingDate, setFilingDate] = useState('2026-03-28');
  const [caseStatus, setCaseStatus] = useState<CaseStatus>('Under Investigation');

  const [complainantName, setComplainantName] = useState('');
  const [complainantAge, setComplainantAge] = useState(35);
  const [complainantContact, setComplainantContact] = useState('');
  const [complainantAddress, setComplainantAddress] = useState('');

  const [accusedName, setAccusedName] = useState('');
  const [accusedAlias, setAccusedAlias] = useState('');
  const [accusedStatus, setAccusedStatus] = useState<'Arrested' | 'Absconding' | 'Named in FIR' | 'Unknown'>('Named in FIR');

  const [officerName, setOfficerName] = useState('Insp. R. Venkatesh');
  const [officerRank, setOfficerRank] = useState('Police Inspector');
  const [officerBadge, setOfficerBadge] = useState('KA-BGR-1102');

  const [placeOfOccurrence, setPlaceOfOccurrence] = useState('');
  const [modusOperandi, setModusOperandi] = useState('');
  const [evidenceStr, setEvidenceStr] = useState('');
  const [incidentSummary, setIncidentSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sections = sectionsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const evidenceItems = evidenceStr.split(',').map((e) => e.trim()).filter(Boolean);

    const newRecord: FIRRecord = {
      id: `FIR-${Date.now()}`,
      firNumber,
      policeStation,
      district,
      crimeCategory,
      subCategory: subCategory || 'General Offense',
      sections: sections.length > 0 ? sections : ['BNS 303'],
      incidentDate,
      incidentTime,
      filingDate,
      complainant: {
        name: complainantName || 'Anonymous Complainant',
        age: Number(complainantAge) || 30,
        contact: complainantContact || '+91 99000 00000',
        address: complainantAddress || 'Bengaluru',
      },
      accused: accusedName
        ? [
            {
              name: accusedName,
              alias: accusedAlias,
              status: accusedStatus,
            },
          ]
        : [{ name: 'Unidentified Person', status: 'Unknown' }],
      victims: [
        {
          name: complainantName || 'Victim',
          age: Number(complainantAge) || 30,
          injuryOrLoss: 'Property/Financial Loss reported in FIR',
        },
      ],
      investigatingOfficer: {
        name: officerName,
        rank: officerRank,
        badgeNo: officerBadge,
      },
      placeOfOccurrence: placeOfOccurrence || policeStation,
      caseStatus,
      modusOperandi: modusOperandi || 'Modus Operandi recorded under preliminary investigation.',
      evidenceItems: evidenceItems.length > 0 ? evidenceItems : ['Physical Scene Inspection Report'],
      incidentSummary: incidentSummary || 'FIR logged into Karnataka State Police Database.',
    };

    onAddFIR(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Register New FIR Record
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* FIR & Station */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">FIR Number *</label>
              <input
                type="text"
                required
                value={firNumber}
                onChange={(e) => setFirNumber(e.target.value)}
                className="w-full bg-slate-950 text-blue-400 font-mono px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Police Station *</label>
              <input
                type="text"
                required
                value={policeStation}
                onChange={(e) => setPoliceStation(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* District & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="Bengaluru City">Bengaluru City</option>
                <option value="Mysuru City">Mysuru City</option>
                <option value="Mangaluru City">Mangaluru City</option>
                <option value="Hubballi-Dharwad">Hubballi-Dharwad</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Crime Category</label>
              <select
                value={crimeCategory}
                onChange={(e) => setCrimeCategory(e.target.value as CrimeCategory)}
                className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="Cyber Fraud">Cyber Fraud</option>
                <option value="House Theft">House Theft</option>
                <option value="Chain Snatching">Chain Snatching</option>
                <option value="Narcotics">Narcotics</option>
                <option value="Financial Fraud">Financial Fraud</option>
                <option value="Vehicle Theft">Vehicle Theft</option>
                <option value="Assault">Assault</option>
                <option value="Robbery">Robbery</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Case Status</label>
              <select
                value={caseStatus}
                onChange={(e) => setCaseStatus(e.target.value as CaseStatus)}
                className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="Under Investigation">Under Investigation</option>
                <option value="Chargesheet Filed">Chargesheet Filed</option>
                <option value="Pending Trial">Pending Trial</option>
                <option value="Solved">Solved</option>
              </select>
            </div>
          </div>

          {/* IPC / BNS Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">IPC / BNS Sections (Comma Separated)</label>
              <input
                type="text"
                value={sectionsStr}
                onChange={(e) => setSectionsStr(e.target.value)}
                placeholder="e.g. BNS 318(4), IT Act 66D"
                className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Sub Category</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Online Stock Trading Fraud"
                className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Complainant & Accused */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div>
              <h4 className="font-bold text-blue-400 mb-2 font-mono uppercase text-[11px]">Complainant Details</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Complainant Full Name *"
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  className="w-full bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Contact Mobile Number"
                  value={complainantContact}
                  onChange={(e) => setComplainantContact(e.target.value)}
                  className="w-full bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-blue-400 mb-2 font-mono uppercase text-[11px]">Accused Details</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Accused Name (or Unidentified)"
                  value={accusedName}
                  onChange={(e) => setAccusedName(e.target.value)}
                  className="w-full bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Alias (if any)"
                    value={accusedAlias}
                    onChange={(e) => setAccusedAlias(e.target.value)}
                    className="w-full bg-slate-900 text-slate-100 px-2.5 py-2 rounded-lg border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <select
                    value={accusedStatus}
                    onChange={(e) => setAccusedStatus(e.target.value as any)}
                    className="w-full bg-slate-900 text-slate-100 px-2.5 py-2 rounded-lg border border-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Named in FIR">Named in FIR</option>
                    <option value="Arrested">Arrested</option>
                    <option value="Absconding">Absconding</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Modus Operandi & Summary */}
          <div>
            <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Modus Operandi</label>
            <input
              type="text"
              value={modusOperandi}
              onChange={(e) => setModusOperandi(e.target.value)}
              placeholder="Describe execution method, tools used, vehicle, or online link pattern"
              className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Incident Summary *</label>
            <textarea
              required
              rows={3}
              value={incidentSummary}
              onChange={(e) => setIncidentSummary(e.target.value)}
              placeholder="Detailed description of the crime incident for law enforcement records"
              className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono uppercase text-[11px]">Evidence Seized (Comma Separated)</label>
            <input
              type="text"
              value={evidenceStr}
              onChange={(e) => setEvidenceStr(e.target.value)}
              placeholder="e.g. CCTV footage, Bank statement, Seized Mobile Phone"
              className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-colors cursor-pointer border border-slate-700/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 transition-all cursor-pointer active:scale-95"
            >
              Commit FIR Record to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

