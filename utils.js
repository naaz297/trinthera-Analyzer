export function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    // fallback: extract JSON block
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) return null;
      return JSON.parse(match[0]);
    } catch (err) {
      return null;
    }
  }
}
