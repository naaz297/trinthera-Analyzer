import axios from "axios";
import { buildPrompt } from "./prompt.js";

export async function generateAnalysis(transcript) {
  const prompt = buildPrompt(transcript);

  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3.2",
    prompt: prompt,
    stream: false
  });

  return response.data.response;
}
