export function buildPrompt(transcript) {
  return `
You are an expert evaluator of employees.

Analyze the transcript and return ONLY valid JSON.

STRICT FORMAT:
{
  "score": {
    "value": number,
    "label": string,
    "band": string,
    "justification": string
  },
  "evidence": [
    {
      "quote": string,
      "signal": "positive|negative|neutral",
      "dimension": "execution|systems_building|kpi_impact|change_management",
      "interpretation": string
    }
  ],
  "kpiMapping": [
    {
      "kpi": string,
      "evidence": string
    }
  ],
  "gaps": [
    {
      "dimension": string,
      "reason": string
    }
  ],
  "followUpQuestions": [
    {
      "question": string,
      "targetDimension": string
    }
  ]
}

RULES:
- Return ONLY JSON
- No explanation text
- Base only on evidence

Transcript:
"""${transcript}"""
`;
}
