import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AIChatView } from './components/AIChatView';
import { FIRExplorerView } from './components/FIRExplorerView';
import { RepeatOffendersView } from './components/RepeatOffendersView';
import { AnalyticsView } from './components/AnalyticsView';
import { StationsDirectoryView } from './components/StationsDirectoryView';
import { NewFIRModal } from './components/NewFIRModal';
import { FIRDetailModal } from './components/FIRDetailModal';
import { 
  FIRRecord, RepeatOffender, PoliceStationInfo, SystemAnalytics, ChatMessage 
} from './types';
import { INITIAL_FIR_RECORDS, INITIAL_REPEAT_OFFENDERS, INITIAL_POLICE_STATIONS, getSystemAnalyticsFromRecords } from './data/mockCrimeData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'firs' | 'offenders' | 'analytics' | 'stations'>('chat');

  // App Data State
  const [firs, setFirs] = useState<FIRRecord[]>(INITIAL_FIR_RECORDS);
  const [offenders, setOffenders] = useState<RepeatOffender[]>(INITIAL_REPEAT_OFFENDERS);
  const [stations, setStations] = useState<PoliceStationInfo[]>(INITIAL_POLICE_STATIONS);
  const [analytics, setAnalytics] = useState<SystemAnalytics>(getSystemAnalyticsFromRecords(INITIAL_FIR_RECORDS));

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Modal State
  const [isNewFIRModalOpen, setIsNewFIRModalOpen] = useState(false);
  const [selectedFIR, setSelectedFIR] = useState<FIRRecord | null>(null);

  // Fetch initial data from server API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [firsRes, accusedRes, stationsRes, analyticsRes] = await Promise.all([
          fetch('/api/firs'),
          fetch('/api/accused'),
          fetch('/api/stations'),
          fetch('/api/analytics'),
        ]);

        if (firsRes.ok) {
          const firsData = await firsRes.json();
          setFirs(firsData);
        }
        if (accusedRes.ok) {
          const accusedData = await accusedRes.json();
          setOffenders(accusedData);
        }
        if (stationsRes.ok) {
          const stationsData = await stationsRes.json();
          setStations(stationsData);
        }
        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setAnalytics(analyticsData);
        }
      } catch (err) {
        console.warn('Using client-side state fallbacks for database records:', err);
      }
    };

    fetchData();
  }, []);

  // Handler: Add new FIR
  const handleAddFIR = async (newFIR: FIRRecord) => {
    try {
      const res = await fetch('/api/firs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFIR),
      });

      if (res.ok) {
        const created = await res.json();
        setFirs((prev) => [created, ...prev]);
        setAnalytics(getSystemAnalyticsFromRecords([created, ...firs]));
      } else {
        setFirs((prev) => [newFIR, ...prev]);
        setAnalytics(getSystemAnalyticsFromRecords([newFIR, ...firs]));
      }
    } catch (err) {
      console.error('Error posting new FIR:', err);
      setFirs((prev) => [newFIR, ...prev]);
      setAnalytics(getSystemAnalyticsFromRecords([newFIR, ...firs]));
    }
  };

  // Handler: Inspect FIR by Number
  const handleInspectFIRByNumber = (firNumber: string) => {
    const record = firs.find(f => f.firNumber.toLowerCase() === firNumber.toLowerCase() || f.id === firNumber);
    if (record) {
      setSelectedFIR(record);
    } else {
      // Direct user to AI chat query for FIR
      setActiveTab('chat');
    }
  };

  // Handler: Trigger AI query from card
  const handleInvestigateFIR = (firNumber: string) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Official Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        analytics={analytics}
        onNewFIRClick={() => setIsNewFIRModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-12">
        {activeTab === 'chat' && (
          <AIChatView
            messages={chatMessages}
            setMessages={setChatMessages}
            onInspectFIR={handleInspectFIRByNumber}
            allFIRs={firs}
          />
        )}

        {activeTab === 'firs' && (
          <FIRExplorerView
            firs={firs}
            onSelectFIR={(fir) => setSelectedFIR(fir)}
            onNewFIRClick={() => setIsNewFIRModalOpen(true)}
            onInvestigateFIR={handleInvestigateFIR}
          />
        )}

        {activeTab === 'offenders' && (
          <RepeatOffendersView
            offenders={offenders}
            onInvestigateOffender={() => setActiveTab('chat')}
            onInspectFIR={handleInspectFIRByNumber}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView analytics={analytics} firs={firs} />
        )}

        {activeTab === 'stations' && (
          <StationsDirectoryView
            stations={stations}
            onInvestigateStation={() => setActiveTab('chat')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-blue-900 py-4 px-6 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-slate-300 font-semibold">
              Karnataka State Police Datathon 2026 • CrimeSense AI
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Official Law Enforcement & Intelligence Portal • Governed by Govt. of Karnataka
          </p>
        </div>
      </footer>

      {/* Modals */}
      <NewFIRModal
        isOpen={isNewFIRModalOpen}
        onClose={() => setIsNewFIRModalOpen(false)}
        onAddFIR={handleAddFIR}
      />

      <FIRDetailModal
        fir={selectedFIR}
        onClose={() => setSelectedFIR(null)}
        onInvestigate={(firNo) => {
          setSelectedFIR(null);
          handleInvestigateFIR(firNo);
        }}
      />
    </div>
  );
}
