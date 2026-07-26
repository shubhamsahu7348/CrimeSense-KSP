import { ParsedAIResponse, ParsedEvidence } from '../types';

export function parseAIResponse(text: string): ParsedAIResponse {
  let summary = '';
  let insights = '';
  let confidence: 'High' | 'Medium' | 'Low' = 'High';
  const evidenceList: ParsedEvidence[] = [];

  try {
    // Regex matches for key sections
    const summaryMatch = text.match(/Summary:?\s*([\s\S]*?)(?=Evidence:?|Insights:?|Confidence:?|$)/i);
    if (summaryMatch && summaryMatch[1]) {
      summary = summaryMatch[1].trim();
    }

    const insightsMatch = text.match(/Insights:?\s*([\s\S]*?)(?=Confidence:?|$)/i);
    if (insightsMatch && insightsMatch[1]) {
      insights = insightsMatch[1].trim();
    }

    const confidenceMatch = text.match(/Confidence:?\s*(High|Medium|Low)/i);
    if (confidenceMatch && confidenceMatch[1]) {
      const conf = confidenceMatch[1].toLowerCase();
      if (conf === 'medium') confidence = 'Medium';
      else if (conf === 'low') confidence = 'Low';
      else confidence = 'High';
    }

    // Extract Evidence section text
    const evidenceMatch = text.match(/Evidence:?\s*([\s\S]*?)(?=Insights:?|Confidence:?|$)/i);
    if (evidenceMatch && evidenceMatch[1]) {
      const evidenceText = evidenceMatch[1].trim();

      // Split by bullet point or FIR Number patterns
      const firBlocks = evidenceText.split(/(?=-?\s*FIR Number:)/i);

      for (const block of firBlocks) {
        if (!block.trim()) continue;

        const firNoMatch = block.match(/FIR Number:?\s*([A-Za-z0-9\-]+|N\/A)/i);
        const crimeTypeMatch = block.match(/Crime Type:?\s*([^\n\r]+)/i);
        const stationMatch = block.match(/Police Station:?\s*([^\n\r]+)/i);
        const statusMatch = block.match(/Case Status:?\s*([^\n\r]+)/i);

        if (firNoMatch || crimeTypeMatch || stationMatch) {
          evidenceList.push({
            firNumber: firNoMatch ? firNoMatch[1].trim() : 'N/A',
            crimeType: crimeTypeMatch ? crimeTypeMatch[1].trim() : 'N/A',
            policeStation: stationMatch ? stationMatch[1].trim() : 'N/A',
            caseStatus: statusMatch ? statusMatch[1].trim() : 'N/A',
          });
        }
      }
    }

    // Fallback if parsing didn't pick up summary
    if (!summary && !insights && evidenceList.length === 0) {
      summary = text;
    }
  } catch (err) {
    console.warn('Failed to parse response strictly:', err);
    summary = text;
  }

  return {
    summary: summary || 'No summary available.',
    evidence: evidenceList,
    insights: insights || 'No specific insights recorded.',
    confidence,
  };
}
