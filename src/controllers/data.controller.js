import AccountSnapshot from "../models/AccountSnapshot.js";

/**
 * POST /api/data
 * Accepts raw AA-style JSON and returns it as-is
 */
export async function ingestRawData(req, res) {
  try {
    const payload = req.body;

    if (!payload || !payload.transactions) {
      return res.status(400).json({
        error: "Invalid raw transaction format"
      });
    }

    const doc = await AccountSnapshot.create(payload);

    res.status(201).json(doc);
  } catch (err) {
    console.error("Raw ingestion error:", err);
    res.status(500).json({ error: "Failed to ingest raw data" });
  }
}

/**
 * GET /api/data/latest
 */
export async function getLatestSnapshot(req, res) {
  try {
    const latest = await AccountSnapshot
      .findOne()
      .sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ error: "No data found" });
    }

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
