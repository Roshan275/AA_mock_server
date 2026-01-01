import express from "express";
import {
  ingestStudent,
  ingestEarner,
  getStudentData,
  getEarnerDeposit,
  getEarnerRD,
  getEarnerFD,
  getEarnerMF
} from "../controllers/aa.controller.js";

const router = express.Router();

/* INGEST */
router.post("/ingest/student", ingestStudent);
router.post("/ingest/earner", ingestEarner);

/* PULL */
router.get("/data/student", getStudentData);

router.get("/data/earner/deposit", getEarnerDeposit);
router.get("/data/earner/recurring-deposit", getEarnerRD);
router.get("/data/earner/term-deposit", getEarnerFD);
router.get("/data/earner/mutual-funds", getEarnerMF);

export default router;
