export type CaseStatus = 
  | 'Under Investigation' 
  | 'Chargesheet Filed' 
  | 'Pending Trial' 
  | 'Solved' 
  | 'Closed - Unverified';

export type CrimeCategory = 
  | 'Cyber Fraud' 
  | 'House Theft' 
  | 'Chain Snatching' 
  | 'Narcotics' 
  | 'Financial Fraud' 
  | 'Vehicle Theft' 
  | 'Assault' 
  | 'Homicide' 
  | 'Robbery' 
  | 'Extortion';

export interface AccusedPerson {
  name: string;
  alias?: string;
  age?: number;
  status: 'Arrested' | 'Absconding' | 'Named in FIR' | 'Unknown';
  address?: string;
  priorOffensesCount?: number;
  nationalId?: string;
}

export interface VictimPerson {
  name: string;
  age: number;
  injuryOrLoss: string;
}

export interface InvestigatingOfficer {
  name: string;
  rank: string;
  badgeNo: string;
}

export interface FIRRecord {
  id: string;
  firNumber: string; // e.g. "KA-BGR-2026-00101"
  policeStation: string; // e.g. "Koramangala PS"
  district: string; // e.g. "Bengaluru City"
  crimeCategory: CrimeCategory;
  subCategory: string;
  sections: string[]; // e.g. ["BNS 318(4)", "BNS 303(2)"]
  incidentDate: string; // YYYY-MM-DD
  incidentTime: string;
  filingDate: string; // YYYY-MM-DD
  complainant: {
    name: string;
    age: number;
    contact: string;
    address: string;
  };
  accused: AccusedPerson[];
  victims: VictimPerson[];
  investigatingOfficer: InvestigatingOfficer;
  placeOfOccurrence: string;
  caseStatus: CaseStatus;
  modusOperandi: string;
  evidenceItems: string[];
  incidentSummary: string;
}

export interface RepeatOffender {
  id: string;
  name: string;
  alias: string;
  age: number;
  riskLevel: 'High' | 'Medium' | 'Critical';
  linkedFIRs: string[]; // List of FIR numbers
  primaryCrimeTypes: string[];
  lastKnownLocation: string;
  status: 'Absconding' | 'In Custody' | 'On Bail';
  modusOperandiPattern: string;
}

export interface PoliceStationInfo {
  code: string;
  name: string;
  district: string;
  range: string;
  shoName: string;
  shoRank: string;
  contact: string;
  activeCases: number;
  solvedCases: number;
}

export interface ParsedEvidence {
  firNumber: string;
  crimeType: string;
  policeStation: string;
  caseStatus: string;
}

export interface ParsedAIResponse {
  summary: string;
  evidence: ParsedEvidence[];
  insights: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  parsedResponse?: ParsedAIResponse;
}

export interface SystemAnalytics {
  totalFIRs: number;
  underInvestigation: number;
  solved: number;
  chargesheetFiled: number;
  repeatOffendersCount: number;
  crimeByCategory: Record<string, number>;
  crimeByDistrict: Record<string, number>;
}
