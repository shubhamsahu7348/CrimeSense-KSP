import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, Shield, FileText, CheckCircle2, AlertTriangle, 
  HelpCircle, Copy, Check, RefreshCw, Layers, ArrowRight, UserCheck, 
  ExternalLink, Building2, Tag, Scale, Clock, Search
} from 'lucide-react';
import { ChatMessage, FIRRecord } from '../types';
import { parseAIResponse } from '../utils/parser';
import { generateLocalCrimeAnalysis } from '../utils/localSearchEngine';
import { INITIAL_REPEAT_OFFENDERS, INITIAL_POLICE_STATIONS } from '../data/mockCrimeData';

interface AIChatViewProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onInspectFIR: (firNumber: string) => void;
  allFIRs: FIRRecord[];
}

const PRESET_PROMPTS = [
  {
    title: "Search FIRs",
    desc: "Cyber Fraud in Koramangala & CID PS",
    prompt: "List all Cyber Fraud and Financial Fraud FIRs registered under Cybercrime CID PS and Koramangala Police Station."
  },
  {
    title: "Repeat Offenders",
    desc: "Habitual criminals & chain snatchers",
    prompt: "Who are the repeat offenders involved in chain snatching and house thefts across Bengaluru and Mysuru?"
  },
  {
    title: "Case Summary",
    desc: "Summary of FIR KA-BGR-2026-00101",
    prompt: "Provide a complete case summary and evidence breakdown for FIR KA-BGR-2026-00101."
  },
  {
    title: "Modus Operandi",
    desc: "APK Electricity Bill Scam patterns",
    prompt: "Explain the modus operandi used in electricity bill scams and investment group frauds in Karnataka."
  },
  {
    title: "BNS / IPC Sections",
    desc: "Cases filed under BNS 318 and BNS 304",
    prompt: "Show all cases filed under BNS 318 (Financial Fraud) and BNS 304 (Chain Snatching) with their case status."
  }
];

export const AIChatView: React.FC<AIChatViewProps> = ({
  messages,
  setMessages,
  onInspectFIR,
  allFIRs,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      // Build history for backend
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let rawText = '';

      try {
        const res = await fetch('/api/investigate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: textToSend,
            history: historyPayload,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.text) {
            rawText = data.text;
          }
        }
      } catch (networkErr) {
        console.warn('Backend API endpoint unreachable, falling back to client search engine:', networkErr);
      }

      // If backend was unreachable or returned empty/error text, synthesize answer using local search engine
      if (!rawText) {
        rawText = generateLocalCrimeAnalysis(textToSend, allFIRs, INITIAL_REPEAT_OFFENDERS, INITIAL_POLICE_STATIONS);
      }

      const parsed = parseAIResponse(rawText);

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parsedResponse: parsed,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('Fallback processing exception:', err);
      const fallbackText = generateLocalCrimeAnalysis(textToSend, allFIRs, INITIAL_REPEAT_OFFENDERS, INITIAL_POLICE_STATIONS);
      const parsedFallback = parseAIResponse(fallbackText);

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parsedResponse: parsedFallback,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar: Prompts & Database Quick Shortcuts */}
      <div className="lg:col-span-1 space-y-4">
        {/* Preset Investigation Queries */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider font-mono">Suggested Queries</h2>
          </div>
          <div className="space-y-2">
            {PRESET_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                disabled={loading}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-400 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-blue-900 group-hover:text-blue-700">
                    {item.title}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Database Quick Index */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-700" />
              <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider font-mono">Database Index</h3>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 font-mono font-bold">
              {allFIRs.length} FIRs
            </span>
          </div>
          <p className="text-slate-600 text-[11px] mb-3 leading-relaxed">
            Real-time cross-jurisdictional AI indexing over Karnataka Police crime databases.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-700">
              <span className="text-slate-500 text-[11px]">Jurisdictions:</span>
              <span className="font-semibold text-slate-900 text-[11px]">BLR, MYS, MNG, HBL</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="text-slate-500 text-[11px]">Framework:</span>
              <span className="font-bold text-blue-900 font-mono text-[11px]">BNS / IPC / IT Act</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="text-slate-500 text-[11px]">Grounding:</span>
              <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                100% Grounded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat / Query Interface */}
      <div className="lg:col-span-3 flex flex-col h-[780px] bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
        {/* Chat Top Banner */}
        <div className="bg-blue-950 text-white px-5 py-3.5 border-b border-blue-900 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-900 border border-amber-400/30">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Karnataka Police Investigative AI Workspace</h2>
              <p className="text-[11px] text-blue-200">
                Structure: <span className="text-amber-300 font-mono font-bold">Summary</span> • <span className="text-amber-300 font-mono font-bold">Evidence</span> • <span className="text-amber-300 font-mono font-bold">Insights</span> • <span className="text-amber-300 font-mono font-bold">Confidence</span>
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-3 py-1.5 text-xs text-blue-200 hover:text-white hover:bg-blue-900 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer border border-blue-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Session</span>
            </button>
          )}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-slate-50/80">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 shadow-sm">
                <Shield className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans tracking-tight">
                CrimeSense AI Assistant
              </h3>
              <p className="text-xs text-slate-600 max-w-md mb-6 leading-relaxed">
                Query crime records, investigate repeat offender profiles, analyze modus operandi patterns, and generate official FIR summaries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl text-left text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-blue-900 block mb-1 uppercase tracking-wider text-[10px] font-mono">🔍 FIR & Crime Search</span>
                  Search by FIR number, station jurisdiction, offense type, or suspect name.
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-emerald-800 block mb-1 uppercase tracking-wider text-[10px] font-mono">👤 Habitual Offender Analysis</span>
                  Trace cross-district linkages, aliases, modus operandi, and active gang networks.
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Role Header */}
                <div className="flex items-center space-x-2 mb-1.5 px-1">
                  <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                  <span className="text-xs font-bold text-slate-700">
                    {msg.role === 'user' ? 'Investigating Officer' : 'CrimeSense AI Engine'}
                  </span>
                </div>

                {/* User Message Bubble */}
                {msg.role === 'user' ? (
                  <div className="max-w-2xl bg-blue-900 text-white p-3.5 rounded-2xl rounded-tr-none text-xs leading-relaxed shadow-md font-sans">
                    {msg.content}
                  </div>
                ) : (
                  /* Assistant Structured Response Card */
                  <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-5 shadow-md space-y-5">
                    {/* Card Actions Bar */}
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 font-mono text-[10px] font-bold border border-blue-300 uppercase tracking-wider">
                          OFFICIAL POLICE REPORT
                        </span>
                        {msg.parsedResponse && (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              msg.parsedResponse.confidence === 'High'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : msg.parsedResponse.confidence === 'Medium'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                          >
                            Confidence: {msg.parsedResponse.confidence}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => copyToClipboard(msg.id, msg.content)}
                        className="px-2.5 py-1 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 border border-slate-200"
                        title="Copy Official Report Text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="text-[10px] text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-[10px]">Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Section 1: Summary */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest flex items-center space-x-1.5 font-mono">
                        <FileText className="w-3.5 h-3.5 text-blue-700" />
                        <span>Summary</span>
                      </h4>
                      <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-600 text-xs text-slate-800 leading-relaxed font-sans shadow-inner">
                        {msg.parsedResponse?.summary || msg.content}
                      </div>
                    </div>

                    {/* Section 2: Evidence */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest flex items-center space-x-1.5 font-mono">
                        <Shield className="w-3.5 h-3.5 text-blue-700" />
                        <span>Evidence</span>
                      </h4>

                      {msg.parsedResponse?.evidence && msg.parsedResponse.evidence.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {msg.parsedResponse.evidence.map((ev, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400 transition-all"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-1.5">
                                  <Tag className="w-3.5 h-3.5 text-blue-700" />
                                  <span className="text-xs font-bold font-mono text-blue-900">
                                    {ev.firNumber}
                                  </span>
                                </div>
                                {ev.firNumber !== 'N/A' && (
                                  <button
                                    onClick={() => onInspectFIR(ev.firNumber)}
                                    className="text-[10px] text-blue-700 hover:text-blue-900 underline font-bold flex items-center space-x-1 cursor-pointer font-mono"
                                  >
                                    <span>Inspect</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </button>
                                )}
                              </div>

                              <div className="space-y-1 text-[11px] text-slate-700">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Crime Type:</span>
                                  <span className="font-semibold text-slate-900">{ev.crimeType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Police Station:</span>
                                  <span className="text-slate-800">{ev.policeStation}</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                  <span className="text-slate-500">Case Status:</span>
                                  <span
                                    className={`font-semibold font-mono text-[9px] px-1.5 py-0.5 rounded border ${
                                      ev.caseStatus.includes('Solved')
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                                        : ev.caseStatus.includes('Chargesheet')
                                        ? 'bg-blue-100 text-blue-800 border-blue-300 font-bold'
                                        : 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
                                    }`}
                                  >
                                    {ev.caseStatus}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          - No specific FIR record evidence attached.
                        </div>
                      )}
                    </div>

                    {/* Section 3: Insights */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest flex items-center space-x-1.5 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Insights</span>
                      </h4>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
                        {msg.parsedResponse?.insights ? (
                          <ul className="space-y-2">
                            {msg.parsedResponse.insights.split('\n').filter(Boolean).map((line, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0"></span>
                                <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          'No specific insights recorded.'
                        )}
                      </div>
                    </div>

                    {/* Section 4: Confidence */}
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium uppercase text-[10px] font-mono tracking-wider">Confidence Level:</span>
                        <span className="text-emerald-700 font-bold">{msg.parsedResponse?.confidence || 'High'}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono font-semibold">Verified Grounded Dataset</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-center space-x-3 p-4 bg-white border border-blue-200 rounded-2xl text-xs text-blue-900 max-w-md shadow-sm animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span className="font-semibold">Querying Karnataka Police Crime Engine & Analyzing Patterns...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask CrimeSense AI about crime records, FIRs, or accused persons..."
                disabled={loading}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-11 pr-4 text-slate-900 text-xs md:text-sm placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md active:scale-95 border border-emerald-700/20"
            >
              <span>Query AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
