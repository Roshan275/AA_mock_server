import AccountSnapshot from "../models/AccountSnapshot.js";
import EarnerSnapshot from "../models/EarnerSnapshot.js";

/**
 * POST /api/aa/ingest/student
 */
export async function ingestStudent(req, res) {
  try {
    const { email, data } = req.body;

    if (!email || !data?.transactions) {
      return res.status(400).json({
        error: "Invalid student transaction payload"
      });
    }

    const doc = await AccountSnapshot.create({
      email,
      ...data
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("Student ingest error:", err);
    res.status(500).json({ error: "Failed to ingest student data" });
  }
}

/**
 * POST /api/aa/ingest/earner
 */
export async function ingestEarner(req, res) {
  try {
    const { email, fiType, data } = req.body;

    if (!email || !fiType || !data) {
      return res.status(400).json({
        error: "Invalid earner payload"
      });
    }

    const doc = await EarnerSnapshot.create({
      email,
      fiType,
      payload: data
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("Earner ingest error:", err);
    res.status(500).json({ error: "Failed to ingest earner data" });
  }
}

/**
 * GET /api/aa/data/student
 */
export async function getStudentData(req, res) {
  try {
    const { email } = req.query;

    const latest = await AccountSnapshot
      .findOne({ email })
      .sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        error: "No student data found"
      });
    }

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student data" });
  }
}

async function getEarnerByType(req, res, fiType) {
  const { email } = req.query;

  const doc = await EarnerSnapshot
    .findOne({ email, fiType })
    .sort({ createdAt: -1 });

  if (!doc) {
    return res.status(404).json({
      error: `No ${fiType} data found`
    });
  }

  res.json(doc.payload);
}

export const getEarnerDeposit = (req, res) =>
  getEarnerByType(req, res, "deposit");

export const getEarnerRD = (req, res) =>
  getEarnerByType(req, res, "recurring_deposit");

export const getEarnerFD = (req, res) =>
  getEarnerByType(req, res, "term_deposit");

export const getEarnerMF = (req, res) =>
  getEarnerByType(req, res, "mutual_funds");
