import { FIRRecord, RepeatOffender, PoliceStationInfo } from '../types';

export function generateLocalCrimeAnalysis(
  query: string,
  firs: FIRRecord[],
  offenders: RepeatOffender[] = [],
  stations: PoliceStationInfo[] = []
): string {
  const q = query.trim().toLowerCase();
  
  if (!q) {
    return `Summary:\nPlease enter a search term or question regarding FIR records, repeat offenders, or police stations.\n\nEvidence:\n- FIR Number: N/A\n- Crime Type: N/A\n- Police Station: N/A\n- Case Status: N/A\n\nInsights:\nYou can query by FIR number (e.g. KA-BGR-2026-00101), accused name, crime category, or police station.\n\nConfidence:\nLow`;
  }

  // 1. Filter FIRs
  const matchedFIRs = firs.filter((fir) => {
    const fn = fir.firNumber.toLowerCase();
    const ps = fir.policeStation.toLowerCase();
    const dist = fir.district.toLowerCase();
    const cat = fir.crimeCategory.toLowerCase();
    const sub = fir.subCategory.toLowerCase();
    const secs = fir.sections.map(s => s.toLowerCase()).join(' ');
    const comp = fir.complainant.name.toLowerCase();
    const acc = fir.accused.map(a => `${a.name} ${a.alias || ''}`).join(' ').toLowerCase();
    const mo = fir.modusOperandi.toLowerCase();
    const sum = fir.incidentSummary.toLowerCase();
    const io = `${fir.investigatingOfficer.name} ${fir.investigatingOfficer.badgeNo}`.toLowerCase();
    const ev = fir.evidenceItems.map(e => e.toLowerCase()).join(' ');

    return (
      fn.includes(q) ||
      ps.includes(q) ||
      dist.includes(q) ||
      cat.includes(q) ||
      sub.includes(q) ||
      secs.includes(q) ||
      comp.includes(q) ||
      acc.includes(q) ||
      mo.includes(q) ||
      sum.includes(q) ||
      io.includes(q) ||
      ev.includes(q) ||
      // Word keyword matching
      q.split(/\s+/).some(term => term.length > 2 && (
        fn.includes(term) || ps.includes(term) || cat.includes(term) || acc.includes(term) || mo.includes(term)
      ))
    );
  });

  // 2. Filter Offenders
  const matchedOffenders = offenders.filter((off) => {
    const name = off.name.toLowerCase();
    const alias = off.alias.toLowerCase();
    const crs = off.primaryCrimeTypes.map(c => c.toLowerCase()).join(' ');
    const mo = off.modusOperandiPattern.toLowerCase();
    const loc = off.lastKnownLocation.toLowerCase();
    const firsLinked = off.linkedFIRs.map(f => f.toLowerCase()).join(' ');

    return (
      name.includes(q) ||
      alias.includes(q) ||
      crs.includes(q) ||
      mo.includes(q) ||
      loc.includes(q) ||
      firsLinked.includes(q) ||
      q.split(/\s+/).some(term => term.length > 2 && (
        name.includes(term) || alias.includes(term) || crs.includes(term)
      ))
    );
  });

  // 3. Filter Stations
  const matchedStations = stations.filter((st) => {
    const name = st.name.toLowerCase();
    const code = st.code.toLowerCase();
    const dist = st.district.toLowerCase();
    const sho = st.shoName.toLowerCase();

    return name.includes(q) || code.includes(q) || dist.includes(q) || sho.includes(q);
  });

  if (matchedFIRs.length === 0 && matchedOffenders.length === 0 && matchedStations.length === 0) {
    return `Summary:\nNo matching records found in the Karnataka State Police Database for query "${query}".\n\nEvidence:\n- FIR Number: N/A\n- Crime Type: N/A\n- Police Station: N/A\n- Case Status: N/A\n\nInsights:\nNo FIRs, repeat offender profiles, or police station jurisdictions matched the provided search parameters. Verify spellings or search using FIR numbers (e.g., KA-BGR-2026-00101) or crime types (e.g., Cyber Fraud).\n\nConfidence:\nLow`;
  }

  // Synthesize Summary
  let summaryParts: string[] = [];
  if (matchedFIRs.length > 0) {
    summaryParts.push(`Identified ${matchedFIRs.length} matching FIR record(s) in Karnataka Police database.`);
  }
  if (matchedOffenders.length > 0) {
    summaryParts.push(`Linked ${matchedOffenders.length} habitual offender profile(s): ${matchedOffenders.map(o => `${o.name} ("${o.alias}")`).join(', ')}.`);
  }
  if (matchedStations.length > 0) {
    summaryParts.push(`Jurisdiction matches ${matchedStations.length} police station(s): ${matchedStations.map(s => s.name).join(', ')}.`);
  }

  const summary = summaryParts.join(' ');

  // Synthesize Evidence Block
  let evidenceText = '';
  if (matchedFIRs.length > 0) {
    evidenceText = matchedFIRs.map((fir) => `
- FIR Number: ${fir.firNumber}
  Crime Type: ${fir.crimeCategory} (${fir.subCategory})
  Police Station: ${fir.policeStation}
  Case Status: ${fir.caseStatus}`).join('\n');
  } else {
    evidenceText = `- FIR Number: N/A\n- Crime Type: N/A\n- Police Station: N/A\n- Case Status: N/A`;
  }

  // Synthesize Insights
  let insightsList: string[] = [];

  matchedFIRs.forEach((fir) => {
    insightsList.push(`FIR ${fir.firNumber} (${fir.policeStation}): Modus Operandi — ${fir.modusOperandi}`);
    if (fir.accused.length > 0) {
      const accNames = fir.accused.map(a => `${a.name}${a.alias ? ` (${a.alias})` : ''} [${a.status}]`).join(', ');
      insightsList.push(`Accused involved: ${accNames}. Sections: ${fir.sections.join(', ')}.`);
    }
  });

  matchedOffenders.forEach((off) => {
    insightsList.push(`Repeat Offender Alert: ${off.name} (Alias: "${off.alias}", ${off.riskLevel} Risk, Status: ${off.status}). Linked FIRs: ${off.linkedFIRs.join(', ')}.`);
  });

  const insights = insightsList.join('\n\n') || `Query processed across Karnataka Police Database. Case status and evidence records loaded above.`;

  const confidence = matchedFIRs.length > 0 || matchedOffenders.length > 0 ? 'High' : 'Medium';

  return `Summary:\n${summary}\n\nEvidence:\n${evidenceText.trim()}\n\nInsights:\n${insights}\n\nConfidence:\n${confidence}`;
}
