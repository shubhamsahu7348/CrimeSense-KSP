import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { 
  INITIAL_FIR_RECORDS, 
  INITIAL_REPEAT_OFFENDERS, 
  INITIAL_POLICE_STATIONS, 
  getSystemAnalyticsFromRecords 
} from './src/data/mockCrimeData';
import { FIRRecord, RepeatOffender } from './src/types';

dotenv.config();

// In-memory data store
let firDatabase: FIRRecord[] = [...INITIAL_FIR_RECORDS];
let repeatOffendersStore: RepeatOffender[] = [...INITIAL_REPEAT_OFFENDERS];

// Helper to sanitize & format database dump for Gemini system instruction
function formatDatabaseContext(): string {
  const firSummaryText = firDatabase.map((fir, idx) => `
[RECORD #${idx + 1}]
FIR Number: ${fir.firNumber}
Police Station: ${fir.policeStation}
District: ${fir.district}
Crime Category: ${fir.crimeCategory} (${fir.subCategory})
IPC / BNS Sections: ${fir.sections.join(', ')}
Incident Date & Time: ${fir.incidentDate} at ${fir.incidentTime}
Filing Date: ${fir.filingDate}
Case Status: ${fir.caseStatus}
Place of Occurrence: ${fir.placeOfOccurrence}
Complainant: ${fir.complainant.name} (Age: ${fir.complainant.age}, Contact: ${fir.complainant.contact}, Addr: ${fir.complainant.address})
Accused Persons: ${fir.accused.map(a => `${a.name}${a.alias ? ` (Alias: ${a.alias})` : ''} [Status: ${a.status}, Prior Offenses: ${a.priorOffensesCount || 0}]`).join('; ') || 'None named'}
Victims: ${fir.victims.map(v => `${v.name} (Loss/Injury: ${v.injuryOrLoss})`).join('; ') || 'None listed'}
Investigating Officer: ${fir.investigatingOfficer.name} (${fir.investigatingOfficer.rank}, Badge: ${fir.investigatingOfficer.badgeNo})
Modus Operandi: ${fir.modusOperandi}
Evidence Items: ${fir.evidenceItems.join(' | ')}
Incident Summary: ${fir.incidentSummary}
--------------------------------------------------
`).join('\n');

  const offenderSummaryText = repeatOffendersStore.map((ro) => `
Offender ID: ${ro.id} | Name: ${ro.name} | Alias: ${ro.alias} | Age: ${ro.age} | Risk Level: ${ro.riskLevel} | Status: ${ro.status}
Linked FIRs: ${ro.linkedFIRs.join(', ')}
Primary Crime Types: ${ro.primaryCrimeTypes.join(', ')}
Last Known Location: ${ro.lastKnownLocation}
MO Pattern: ${ro.modusOperandiPattern}
`).join('\n');

  const stationSummaryText = INITIAL_POLICE_STATIONS.map((ps) => `
Station Code: ${ps.code} | Name: ${ps.name} | District: ${ps.district} | Range: ${ps.range} | SHO: ${ps.shoName} (${ps.shoRank}) | Contact: ${ps.contact} | Active Cases: ${ps.activeCases} | Solved Cases: ${ps.solvedCases}
`).join('\n');

  return `
==================================================
OFFICIAL KARNATAKA STATE POLICE CRIME DATABASE (CONFIDENTIAL)
==================================================

1. POLICE STATIONS DIRECTORY:
${stationSummaryText}

2. KNOWN REPEAT OFFENDERS PROFILES:
${offenderSummaryText}

3. FIR RECORDS DATABASE (${firDatabase.length} Total Records):
${firSummaryText}

==================================================
END OF DATABASE DUMP
==================================================
`;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini AI Client
  const getGenAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing from environment variables.");
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // REST APIs
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'CrimeSense AI Server' });
  });

  // GET /api/firs - Search & filter FIRs
  app.get('/api/firs', (req, res) => {
    let result = [...firDatabase];
    const { query, station, category, status, district, accused } = req.query;

    if (station && typeof station === 'string') {
      result = result.filter(r => r.policeStation.toLowerCase().includes(station.toLowerCase()));
    }
    if (category && typeof category === 'string') {
      result = result.filter(r => r.crimeCategory.toLowerCase() === category.toLowerCase());
    }
    if (status && typeof status === 'string') {
      result = result.filter(r => r.caseStatus.toLowerCase() === status.toLowerCase());
    }
    if (district && typeof district === 'string') {
      result = result.filter(r => r.district.toLowerCase().includes(district.toLowerCase()));
    }
    if (accused && typeof accused === 'string') {
      result = result.filter(r => r.accused.some(a => 
        a.name.toLowerCase().includes(accused.toLowerCase()) || 
        (a.alias && a.alias.toLowerCase().includes(accused.toLowerCase()))
      ));
    }
    if (query && typeof query === 'string') {
      const q = query.toLowerCase();
      result = result.filter(r => 
        r.firNumber.toLowerCase().includes(q) ||
        r.policeStation.toLowerCase().includes(q) ||
        r.crimeCategory.toLowerCase().includes(q) ||
        r.subCategory.toLowerCase().includes(q) ||
        r.sections.some(s => s.toLowerCase().includes(q)) ||
        r.incidentSummary.toLowerCase().includes(q) ||
        r.modusOperandi.toLowerCase().includes(q) ||
        r.accused.some(a => a.name.toLowerCase().includes(q) || (a.alias && a.alias.toLowerCase().includes(q))) ||
        r.complainant.name.toLowerCase().includes(q) ||
        r.evidenceItems.some(e => e.toLowerCase().includes(q))
      );
    }

    res.json(result);
  });

  // GET /api/firs/:id
  app.get('/api/firs/:id', (req, res) => {
    const record = firDatabase.find(f => f.id === req.params.id || f.firNumber === req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'FIR Record not found' });
    }
    res.json(record);
  });

  // POST /api/firs - Add new FIR
  app.post('/api/firs', (req, res) => {
    try {
      const newFIR: FIRRecord = req.body;
      if (!newFIR.firNumber || !newFIR.policeStation || !newFIR.crimeCategory) {
        return res.status(400).json({ error: 'Missing mandatory fields: firNumber, policeStation, crimeCategory' });
      }

      newFIR.id = `FIR-${Date.now().toString().slice(-6)}`;
      firDatabase.unshift(newFIR);

      res.status(201).json(newFIR);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create FIR record' });
    }
  });

  // DELETE /api/firs/:id
  app.delete('/api/firs/:id', (req, res) => {
    const idx = firDatabase.findIndex(f => f.id === req.params.id || f.firNumber === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: 'FIR Record not found' });
    }
    const removed = firDatabase.splice(idx, 1)[0];
    res.json({ message: 'FIR Record deleted', removed });
  });

  // GET /api/accused - Repeat offenders list & search
  app.get('/api/accused', (req, res) => {
    res.json(repeatOffendersStore);
  });

  // GET /api/stations
  app.get('/api/stations', (req, res) => {
    res.json(INITIAL_POLICE_STATIONS);
  });

  // GET /api/analytics
  app.get('/api/analytics', (req, res) => {
    const analytics = getSystemAnalyticsFromRecords(firDatabase);
    res.json(analytics);
  });

  // POST /api/investigate - AI Chat & FIR Intelligence endpoint
  app.post('/api/investigate', async (req, res) => {
    try {
      const { query, history = [] } = req.body;

      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in server environment.' });
      }

      const ai = getGenAIClient();
      const dbContext = formatDatabaseContext();

      const systemInstruction = `
You are CrimeSense AI, an intelligent assistant built for the Karnataka State Police Datathon 2026.
Your job is to answer questions about crime records using ONLY the provided database records.

STRICT OPERATIONAL DIRECTIVES:
1. Answer professionally in a clear, concise tone suitable for Karnataka State Police investigators and senior officers.
2. Rely ONLY on the database records provided below. Do NOT make up or hallucinate any FIR numbers, dates, accused names, police stations, or evidence that do not exist in the dataset.
3. If data is unavailable, query is unrelated to the dataset, or no matching records are found in the database, respond ONLY with: "No matching records found." (or include "No matching records found." in the Summary/Evidence sections).
4. Support follow-up questions using previous conversation context.

CRITICAL FORMAT REQUIREMENT:
You MUST ALWAYS structure every single response in this EXACT format (do not omit or alter section headers):

Summary:
[Write a concise summary of the findings, matches, or case details based ONLY on the records]

Evidence:
- FIR Number: [FIR Number or "N/A" if none]
- Crime Type: [Crime Type / Category or "N/A" if none]
- Police Station: [Police Station or "N/A" if none]
- Case Status: [Case Status or "N/A" if none]

(Note: If multiple FIRs match the query, list each block of evidence under Evidence with bullet points like:
- FIR Number: KA-BGR-2026-00101
  Crime Type: Cyber Fraud
  Police Station: Cybercrime CID PS
  Case Status: Chargesheet Filed

- FIR Number: KA-BGR-2026-00105
  Crime Type: Financial Fraud
  Police Station: Cybercrime CID PS
  Case Status: Under Investigation
)

Insights:
[Provide investigative insights, repeat offender associations, modus operandi connections, IPC/BNS section applicability, or recommended police next steps]

Confidence:
[High / Medium / Low]

Current Database State:
${dbContext}
`;

      // Build context history for chat
      const formattedContents: any[] = [];
      
      // Push history
      if (Array.isArray(history)) {
        history.slice(-6).forEach((h: { role: 'user' | 'assistant'; content: string }) => {
          formattedContents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }]
          });
        });
      }

      // Add current user prompt
      formattedContents.push({
        role: 'user',
        parts: [{ text: query }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.1, // Low temperature for high factual precision
        },
      });

      const outputText = response.text || 'No response generated.';

      res.json({ text: outputText });
    } catch (err: any) {
      console.error('Error in /api/investigate:', err);
      res.status(500).json({ error: err.message || 'Failed to process AI investigation request' });
    }
  });

  // Vite development middleware vs Static Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CrimeSense AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
