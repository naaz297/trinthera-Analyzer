import express from "express";
import cors from "cors";
import { generateAnalysis } from "./ollamaClient.js";
import { safeJsonParse } from "./utils.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.post("/analyze", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const rawResponse = await generateAnalysis(transcript);

    const parsed = safeJsonParse(rawResponse);

    if (!parsed) {
      return res.status(500).json({
        error: "Failed to parse AI response",
        raw: rawResponse
      });
    }

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
